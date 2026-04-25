import { prisma } from '@/lib/prisma';

export class UsersRepository {
  async findAllUsers() {
    return prisma.user.findMany({
      include: {
        role: true,
        hospital: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
  }

  async findUserById(id: string) {
    return prisma.user.findUnique({
      where: { id },
      include: {
        role: true,
        hospital: true
      }
    });
  }

  async findUserByEmail(email: string) {
    return prisma.user.findUnique({
      where: { email }
    });
  }

  async findRoleById(roleId: string) {
  return prisma.role.findUnique({
    where: { id: roleId }
  });
}

  async findHospitalById(hospitalId: string) {
    return prisma.hospital.findUnique({
      where: { id: hospitalId }
    });
  }

  async createUser(data: {
    fullName: string;
    email: string;
    phone?: string;
    passwordHash: string;
    roleId: string;
    hospitalId?: string;
  }) {
    return prisma.user.create({
      data,
      include: {
        role: true,
        hospital: true
      }
    });
  }

  async updateUser(
    id: string,
    data: {
      fullName?: string;
      phone?: string;
      roleId?: string;
      hospitalId?: string | null;
      status?: 'ACTIVE' | 'INACTIVE' | 'SUSPENDED' | 'PENDING';
    }
  ) {
    return prisma.user.update({
      where: { id },
      data,
      include: {
        role: true,
        hospital: true
      }
    });
  }
}