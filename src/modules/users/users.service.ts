import { AppError } from '@/common/errors/app-error';
import { hashValue } from '@/lib/bcrypt';

import { UsersRepository } from './users.repository';

type CreateUserInput = {
  fullName: string;
  email: string;
  phone?: string;
  password: string;
  roleId: string;
  hospitalId?: string;
};

type UpdateUserInput = {
  fullName?: string;
  phone?: string;
  roleId?: string;
  hospitalId?: string | null;
  status?: 'ACTIVE' | 'INACTIVE' | 'SUSPENDED' | 'PENDING';
};

export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async getUsers() {
    return this.usersRepository.findAllUsers();
  }

  async getUserById(id: string) {
    const user = await this.usersRepository.findUserById(id);

    if (!user) {
      throw new AppError('User not found', 404);
    }

    return user;
  }

  async createUser(input: CreateUserInput) {
    const existingUser = await this.usersRepository.findUserByEmail(input.email);

    if (existingUser) {
      throw new AppError('Email already exists', 409);
    }

    const role = await this.usersRepository.findRoleById(input.roleId);

    if (!role) {
      throw new AppError('Role not found', 404);
    }

    if (input.hospitalId) {
      const hospital = await this.usersRepository.findHospitalById(input.hospitalId);

      if (!hospital) {
        throw new AppError('Hospital not found', 404);
      }
    }

    const passwordHash = await hashValue(input.password);

    return this.usersRepository.createUser({
      fullName: input.fullName,
      email: input.email,
      phone: input.phone,
      passwordHash,
      roleId: input.roleId,
      hospitalId: input.hospitalId
    });
  }

  async updateUser(id: string, input: UpdateUserInput) {
    const existingUser = await this.usersRepository.findUserById(id);

    if (!existingUser) {
      throw new AppError('User not found', 404);
    }

    if (input.roleId) {
      const role = await this.usersRepository.findRoleById(input.roleId);

      if (!role) {
        throw new AppError('Role not found', 404);
      }
    }

    if (input.hospitalId) {
      const hospital = await this.usersRepository.findHospitalById(input.hospitalId);

      if (!hospital) {
        throw new AppError('Hospital not found', 404);
      }
    }

    return this.usersRepository.updateUser(id, input);
  }

  async activateUser(id: string) {
    const existingUser = await this.usersRepository.findUserById(id);

    if (!existingUser) {
      throw new AppError('User not found', 404);
    }

    return this.usersRepository.updateUser(id, {
      status: 'ACTIVE'
    });
  }

  async deactivateUser(id: string) {
    const existingUser = await this.usersRepository.findUserById(id);

    if (!existingUser) {
      throw new AppError('User not found', 404);
    }

    return this.usersRepository.updateUser(id, {
      status: 'INACTIVE'
    });
  }
}