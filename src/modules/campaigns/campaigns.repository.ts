import { prisma } from '@/lib/prisma';

export class CampaignsRepository {
  async findAllCampaigns() {
    return prisma.campaign.findMany({
      include: {
        organizerHospital: true,
        createdBy: true
      },
      orderBy: {
        startDate: 'desc'
      }
    });
  }

  async findCampaignById(id: string) {
    return prisma.campaign.findUnique({
      where: { id },
      include: {
        organizerHospital: true,
        createdBy: true
      }
    });
  }

  async findHospitalById(hospitalId: string) {
    return prisma.hospital.findUnique({
      where: { id: hospitalId }
    });
  }

  async findUserById(userId: string) {
    return prisma.user.findUnique({
      where: { id: userId }
    });
  }

  async createCampaign(data: {
    title: string;
    description?: string;
    organizerType: 'MOH' | 'HOSPITAL';
    organizerHospitalId?: string;
    city: string;
    region: string;
    targetBloodTypes?: string[];
    targetUnits?: number;
    startDate: Date;
    endDate: Date;
    createdByUserId?: string;
  }) {
    return prisma.campaign.create({
      data: {
        ...data,
        targetBloodTypes: data.targetBloodTypes ?? [],
        status: 'DRAFT'
      },
      include: {
        organizerHospital: true,
        createdBy: true
      }
    });
  }

  async updateCampaign(
    id: string,
    data: {
      title?: string;
      description?: string;
      city?: string;
      region?: string;
      targetBloodTypes?: string[];
      targetUnits?: number;
      collectedUnits?: number;
      participantsCount?: number;
      startDate?: Date;
      endDate?: Date;
      status?: 'DRAFT' | 'ACTIVE' | 'COMPLETED' | 'CANCELLED';
    }
  ) {
    return prisma.campaign.update({
      where: { id },
      data,
      include: {
        organizerHospital: true,
        createdBy: true
      }
    });
  }
}