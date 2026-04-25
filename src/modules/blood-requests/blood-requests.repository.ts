import { prisma } from '@/lib/prisma';

export class BloodRequestsRepository {
  async findAllBloodRequests() {
    return prisma.bloodRequest.findMany({
      include: {
        hospital: true,
        createdBy: true
      },
      orderBy: {
        requestedAt: 'desc'
      }
    });
  }

  async findBloodRequestById(id: string) {
    return prisma.bloodRequest.findUnique({
      where: { id },
      include: {
        hospital: true,
        createdBy: true
      }
    });
  }

  async findHospitalById(hospitalId: string) {
    return prisma.hospital.findUnique({
      where: { id: hospitalId }
    });
  }

  async createBloodRequest(data: {
    requestNumber: string;
    hospitalId: string;
    bloodType: 'A_POS' | 'A_NEG' | 'B_POS' | 'B_NEG' | 'AB_POS' | 'AB_NEG' | 'O_POS' | 'O_NEG';
    unitsRequested: number;
    priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL' | 'EMERGENCY';
    caseType?: string;
    patientAge?: number;
    notes?: string;
    neededBy?: Date;
    createdByUserId?: string;
  }) {
    return prisma.bloodRequest.create({
      data,
      include: {
        hospital: true,
        createdBy: true
      }
    });
  }

  async updateBloodRequest(
    id: string,
    data: {
      unitsRequested?: number;
      unitsFulfilled?: number;
      priority?: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL' | 'EMERGENCY';
      status?: 'PENDING' | 'IN_PROGRESS' | 'PARTIALLY_FULFILLED' | 'FULFILLED' | 'CANCELLED' | 'REJECTED';
      caseType?: string;
      patientAge?: number;
      notes?: string;
      neededBy?: Date;
    }
  ) {
    return prisma.bloodRequest.update({
      where: { id },
      data,
      include: {
        hospital: true,
        createdBy: true
      }
    });
  }
}