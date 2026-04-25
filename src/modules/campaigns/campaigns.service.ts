import { AppError } from '@/common/errors/app-error';
import { CampaignsRepository } from './campaigns.repository';

type CreateCampaignInput = {
  title: string;
  description?: string;
  organizerType: 'MOH' | 'HOSPITAL';
  organizerHospitalId?: string;
  city: string;
  region: string;
  targetBloodTypes?: string[];
  targetUnits?: number;
  startDate: string;
  endDate: string;
  createdByUserId?: string;
};

type UpdateCampaignInput = {
  title?: string;
  description?: string;
  city?: string;
  region?: string;
  targetBloodTypes?: string[];
  targetUnits?: number;
  collectedUnits?: number;
  participantsCount?: number;
  startDate?: string;
  endDate?: string;
  status?: 'DRAFT' | 'ACTIVE' | 'COMPLETED' | 'CANCELLED';
};

export class CampaignsService {
  constructor(private readonly campaignsRepository: CampaignsRepository) {}

  async getCampaigns() {
    return this.campaignsRepository.findAllCampaigns();
  }

  async getCampaignById(id: string) {
    const campaign = await this.campaignsRepository.findCampaignById(id);

    if (!campaign) {
      throw new AppError('Campaign not found', 404);
    }

    return campaign;
  }

  async createCampaign(input: CreateCampaignInput) {
    if (input.organizerType === 'HOSPITAL') {
      if (!input.organizerHospitalId) {
        throw new AppError('organizerHospitalId is required for hospital campaigns', 400);
      }

      const hospital = await this.campaignsRepository.findHospitalById(
        input.organizerHospitalId
      );

      if (!hospital) {
        throw new AppError('Organizer hospital not found', 404);
      }
    }

    if (input.createdByUserId) {
      const user = await this.campaignsRepository.findUserById(input.createdByUserId);

      if (!user) {
        throw new AppError('Creator user not found', 404);
      }
    }

    const startDate = new Date(input.startDate);
    const endDate = new Date(input.endDate);

    if (endDate <= startDate) {
      throw new AppError('endDate must be greater than startDate', 400);
    }

    return this.campaignsRepository.createCampaign({
      title: input.title,
      description: input.description,
      organizerType: input.organizerType,
      organizerHospitalId: input.organizerHospitalId,
      city: input.city,
      region: input.region,
      targetBloodTypes: input.targetBloodTypes,
      targetUnits: input.targetUnits,
      startDate,
      endDate,
      createdByUserId: input.createdByUserId
    });
  }

  async updateCampaign(id: string, input: UpdateCampaignInput) {
    const existingCampaign = await this.campaignsRepository.findCampaignById(id);

    if (!existingCampaign) {
      throw new AppError('Campaign not found', 404);
    }

    const startDate = input.startDate
      ? new Date(input.startDate)
      : existingCampaign.startDate;

    const endDate = input.endDate ? new Date(input.endDate) : existingCampaign.endDate;

    if (endDate <= startDate) {
      throw new AppError('endDate must be greater than startDate', 400);
    }

    return this.campaignsRepository.updateCampaign(id, {
      title: input.title,
      description: input.description,
      city: input.city,
      region: input.region,
      targetBloodTypes: input.targetBloodTypes,
      targetUnits: input.targetUnits,
      collectedUnits: input.collectedUnits,
      participantsCount: input.participantsCount,
      startDate: input.startDate ? new Date(input.startDate) : undefined,
      endDate: input.endDate ? new Date(input.endDate) : undefined,
      status: input.status
    });
  }

  async publishCampaign(id: string) {
    const existingCampaign = await this.campaignsRepository.findCampaignById(id);

    if (!existingCampaign) {
      throw new AppError('Campaign not found', 404);
    }

    return this.campaignsRepository.updateCampaign(id, {
      status: 'ACTIVE'
    });
  }

  async cancelCampaign(id: string) {
    const existingCampaign = await this.campaignsRepository.findCampaignById(id);

    if (!existingCampaign) {
      throw new AppError('Campaign not found', 404);
    }

    return this.campaignsRepository.updateCampaign(id, {
      status: 'CANCELLED'
    });
  }
}