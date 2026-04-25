import { prisma } from '@/lib/prisma';

export class HospitalsRepository {
  async findAllHospitals() {
    return prisma.hospital.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });
  }

  async findHospitalById(id: string) {
    return prisma.hospital.findUnique({
      where: { id }
    });
  }

  async findHospitalByEmail(email: string) {
    return prisma.hospital.findUnique({
      where: { email }
    });
  }

  async createHospital(data: {
    name: string;
    city: string;
    region: string;
    address?: string;
    latitude?: number;
    longitude?: number;
    phone?: string;
    email?: string;
    bloodBankEnabled?: boolean;
  }) {
    return prisma.hospital.create({
      data: {
        ...data,
        approvalStatus: 'PENDING',
        status: 'PENDING_APPROVAL'
      }
    });
  }

  async updateHospital(
    id: string,
    data: {
      name?: string;
      city?: string;
      region?: string;
      address?: string;
      latitude?: number;
      longitude?: number;
      phone?: string;
      email?: string | null;
      bloodBankEnabled?: boolean;
      status?: 'ACTIVE' | 'INACTIVE' | 'SUSPENDED' | 'PENDING_APPROVAL';
      approvalStatus?: 'PENDING' | 'APPROVED' | 'REJECTED' | 'RETURNED';
    }
  ) {
    return prisma.hospital.update({
      where: { id },
      data
    });
  }
}