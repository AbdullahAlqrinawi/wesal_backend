import { AppError } from '@/common/errors/app-error';
import { compareValue, hashValue } from '@/lib/bcrypt';
import {
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken
} from '@/lib/jwt';

import { AuthRepository } from './auth.repository';
import {
  AuthResponse,
  AuthTokenPayload,
  LoginAccountType
} from './auth.types';

type RegisterDonorInput = {
  fullName: string;
  nationalId: string;
  phone: string;
  email?: string;
  password: string;
  bloodType: 'A_POS' | 'A_NEG' | 'B_POS' | 'B_NEG' | 'AB_POS' | 'AB_NEG' | 'O_POS' | 'O_NEG';
  gender: string;
  birthDate: string;
  city: string;
  region: string;
  address?: string;
  weightKg?: number;
};

type LoginInput = {
  accountType: LoginAccountType;
  email?: string;
  phone?: string;
  password: string;
};

export class AuthService {
  constructor(private readonly authRepository: AuthRepository) {}

  async registerDonor(input: RegisterDonorInput): Promise<AuthResponse> {
    const existingByNationalId = await this.authRepository.findDonorByNationalId(
      input.nationalId
    );

    if (existingByNationalId) {
      throw new AppError('National ID already exists', 409);
    }

    const existingByPhone = await this.authRepository.findDonorByPhone(input.phone);

    if (existingByPhone) {
      throw new AppError('Phone already exists', 409);
    }

    if (input.email) {
      const existingByEmail = await this.authRepository.findDonorByEmail(input.email);

      if (existingByEmail) {
        throw new AppError('Email already exists', 409);
      }
    }

    const passwordHash = await hashValue(input.password);

    const donor = await this.authRepository.createDonor({
      fullName: input.fullName,
      nationalId: input.nationalId,
      phone: input.phone,
      email: input.email,
      passwordHash,
      bloodType: input.bloodType,
      gender: input.gender,
      birthDate: new Date(input.birthDate),
      city: input.city,
      region: input.region,
      address: input.address,
      weightKg: input.weightKg
    });

    const payload: AuthTokenPayload = {
      sub: donor.id,
      accountType: 'DONOR'
    };

    const tokens = {
      accessToken: signAccessToken(payload),
      refreshToken: signRefreshToken(payload)
    };

    return {
      user: {
        id: donor.id,
        fullName: donor.fullName,
        email: donor.email,
        phone: donor.phone,
        accountType: 'DONOR'
      },
      tokens
    };
  }

  async login(input: LoginInput): Promise<AuthResponse> {
    if (input.accountType === 'USER') {
      const user = input.email
        ? await this.authRepository.findUserByEmail(input.email)
        : await this.authRepository.findUserByPhone(input.phone as string);

      if (!user) {
        throw new AppError('Invalid credentials', 401);
      }

      const isPasswordValid = await compareValue(input.password, user.passwordHash);

      if (!isPasswordValid) {
        throw new AppError('Invalid credentials', 401);
      }

      const payload: AuthTokenPayload = {
        sub: user.id,
        role: user.role.name,
        accountType: 'USER',
        hospitalId: user.hospitalId ?? null
      };

      const tokens = {
        accessToken: signAccessToken(payload),
        refreshToken: signRefreshToken(payload)
      };

      return {
        user: {
          id: user.id,
          fullName: user.fullName,
          email: user.email,
          phone: user.phone,
          role: user.role.name,
          accountType: 'USER',
          hospitalId: user.hospitalId ?? null
        },
        tokens
      };
    }

    const donor = input.email
      ? await this.authRepository.findDonorByEmail(input.email)
      : await this.authRepository.findDonorByPhone(input.phone as string);

    if (!donor) {
      throw new AppError('Invalid credentials', 401);
    }

    const isPasswordValid = await compareValue(input.password, donor.passwordHash);

    if (!isPasswordValid) {
      throw new AppError('Invalid credentials', 401);
    }

    const payload: AuthTokenPayload = {
      sub: donor.id,
      accountType: 'DONOR'
    };

    const tokens = {
      accessToken: signAccessToken(payload),
      refreshToken: signRefreshToken(payload)
    };

    return {
      user: {
        id: donor.id,
        fullName: donor.fullName,
        email: donor.email,
        phone: donor.phone,
        accountType: 'DONOR'
      },
      tokens
    };
  }

  async refreshToken(token: string): Promise<{ accessToken: string }> {
    try {
      const payload = verifyRefreshToken(token);

      const newAccessToken = signAccessToken({
        sub: payload.sub,
        role: payload.role,
        accountType: payload.accountType,
        hospitalId: payload.hospitalId ?? null
      });

      return {
        accessToken: newAccessToken
      };
    } catch {
      throw new AppError('Invalid refresh token', 401);
    }
  }
}