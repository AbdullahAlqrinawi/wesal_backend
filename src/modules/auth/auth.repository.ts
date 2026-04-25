import { prisma } from '@/lib/prisma';

export class AuthRepository {
  async findUserByEmail(email: string) {
    return prisma.user.findUnique({
      where: { email },
      include: {
        role: true
      }
    });
  }

  async findUserByPhone(phone: string) {
    return prisma.user.findFirst({
      where: { phone },
      include: {
        role: true
      }
    });
  }

  async findDonorByEmail(email: string) {
    return prisma.donor.findUnique({
      where: { email }
    });
  }

  async findDonorByPhone(phone: string) {
    return prisma.donor.findUnique({
      where: { phone }
    });
  }

  async findDonorByNationalId(nationalId: string) {
    return prisma.donor.findUnique({
      where: { nationalId }
    });
  }

  async createDonor(data: {
    fullName: string;
    nationalId: string;
    phone: string;
    email?: string;
    passwordHash: string;
    bloodType: 'A_POS' | 'A_NEG' | 'B_POS' | 'B_NEG' | 'AB_POS' | 'AB_NEG' | 'O_POS' | 'O_NEG';
    gender: string;
    birthDate: Date;
    city: string;
    region: string;
    address?: string;
    weightKg?: number;
  }) {
    return prisma.donor.create({
      data
    });
  }
}