import { AppError } from '@/common/errors/app-error';
import { HospitalsRepository } from './hospitals.repository';

type CreateHospitalInput = {
  name: string;
  city: string;
  region: string;
  address?: string;
  latitude?: number;
  longitude?: number;
  phone?: string;
  email?: string;
  bloodBankEnabled?: boolean;
};

type UpdateHospitalInput = {
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
};

export class HospitalsService {
  constructor(private readonly hospitalsRepository: HospitalsRepository) {}

  async getHospitals() {
    return this.hospitalsRepository.findAllHospitals();
  }

  async getHospitalById(id: string) {
    const hospital = await this.hospitalsRepository.findHospitalById(id);

    if (!hospital) {
      throw new AppError('Hospital not found', 404);
    }

    return hospital;
  }

  async createHospital(input: CreateHospitalInput) {
    if (input.email) {
      const existingHospital = await this.hospitalsRepository.findHospitalByEmail(
        input.email
      );

      if (existingHospital) {
        throw new AppError('Hospital email already exists', 409);
      }
    }

    return this.hospitalsRepository.createHospital(input);
  }

  async updateHospital(id: string, input: UpdateHospitalInput) {
    const existingHospital = await this.hospitalsRepository.findHospitalById(id);

    if (!existingHospital) {
      throw new AppError('Hospital not found', 404);
    }

    if (input.email && input.email !== existingHospital.email) {
      const hospitalWithSameEmail = await this.hospitalsRepository.findHospitalByEmail(
        input.email
      );

      if (hospitalWithSameEmail) {
        throw new AppError('Hospital email already exists', 409);
      }
    }

    return this.hospitalsRepository.updateHospital(id, input);
  }

  async activateHospital(id: string) {
    const existingHospital = await this.hospitalsRepository.findHospitalById(id);

    if (!existingHospital) {
      throw new AppError('Hospital not found', 404);
    }

    return this.hospitalsRepository.updateHospital(id, {
      status: 'ACTIVE',
      approvalStatus: 'APPROVED'
    });
  }

  async deactivateHospital(id: string) {
    const existingHospital = await this.hospitalsRepository.findHospitalById(id);

    if (!existingHospital) {
      throw new AppError('Hospital not found', 404);
    }

    return this.hospitalsRepository.updateHospital(id, {
      status: 'INACTIVE'
    });
  }
}