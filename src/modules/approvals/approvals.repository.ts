import { prisma } from '@/lib/prisma';

export class ApprovalsRepository {
  async findAllApprovals() {
    return prisma.approval.findMany({
      include: {
        submittedBy: true,
        submittedByHospital: true,
        reviewedBy: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
  }

  async findApprovalById(id: string) {
    return prisma.approval.findUnique({
      where: { id },
      include: {
        submittedBy: true,
        submittedByHospital: true,
        reviewedBy: true
      }
    });
  }

  async findUserById(userId: string) {
    return prisma.user.findUnique({
      where: { id: userId }
    });
  }

  async findHospitalById(hospitalId: string) {
    return prisma.hospital.findUnique({
      where: { id: hospitalId }
    });
  }

  async createApproval(data: {
    type:
      | 'HOSPITAL_REGISTRATION'
      | 'CAMPAIGN'
      | 'USER_ACCESS'
      | 'DONOR_VERIFICATION'
      | 'SETTINGS_CHANGE'
      | 'OTHER';
    entityType: string;
    entityId: string;
    priority?: string;
    notes?: string;
    submittedByUserId?: string;
    submittedByHospitalId?: string;
  }) {
    return prisma.approval.create({
      data,
      include: {
        submittedBy: true,
        submittedByHospital: true,
        reviewedBy: true
      }
    });
  }

  async updateApproval(
    id: string,
    data: {
      priority?: string;
      notes?: string;
      status?: 'PENDING' | 'APPROVED' | 'REJECTED' | 'RETURNED';
      reviewedByUserId?: string;
      reviewedAt?: Date;
    }
  ) {
    return prisma.approval.update({
      where: { id },
      data,
      include: {
        submittedBy: true,
        submittedByHospital: true,
        reviewedBy: true
      }
    });
  }
}