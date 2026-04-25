import { AppError } from '@/common/errors/app-error';
import { BloodRequestsRepository } from './blood-requests.repository';

type BloodType =
  | 'A_POS'
  | 'A_NEG'
  | 'B_POS'
  | 'B_NEG'
  | 'AB_POS'
  | 'AB_NEG'
  | 'O_POS'
  | 'O_NEG';

type Priority = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL' | 'EMERGENCY';
type RequestStatus =
  | 'PENDING'
  | 'IN_PROGRESS'
  | 'PARTIALLY_FULFILLED'
  | 'FULFILLED'
  | 'CANCELLED'
  | 'REJECTED';

type CreateBloodRequestInput = {
  hospitalId: string;
  bloodType: BloodType;
  unitsRequested: number;
  priority: Priority;
  caseType?: string;
  patientAge?: number;
  notes?: string;
  neededBy?: string;
  createdByUserId?: string;
};

type UpdateBloodRequestInput = {
  unitsRequested?: number;
  priority?: Priority;
  status?: RequestStatus;
  caseType?: string;
  patientAge?: number;
  notes?: string;
  neededBy?: string;
};

function generateRequestNumber(): string {
  const now = Date.now();
  return `BR-${now}`;
}

export class BloodRequestsService {
  constructor(private readonly bloodRequestsRepository: BloodRequestsRepository) {}

  async getBloodRequests() {
    return this.bloodRequestsRepository.findAllBloodRequests();
  }

  async getBloodRequestById(id: string) {
    const request = await this.bloodRequestsRepository.findBloodRequestById(id);

    if (!request) {
      throw new AppError('Blood request not found', 404);
    }

    return request;
  }

  async createBloodRequest(input: CreateBloodRequestInput) {
    const hospital = await this.bloodRequestsRepository.findHospitalById(input.hospitalId);

    if (!hospital) {
      throw new AppError('Hospital not found', 404);
    }

    return this.bloodRequestsRepository.createBloodRequest({
      requestNumber: generateRequestNumber(),
      hospitalId: input.hospitalId,
      bloodType: input.bloodType,
      unitsRequested: input.unitsRequested,
      priority: input.priority,
      caseType: input.caseType,
      patientAge: input.patientAge,
      notes: input.notes,
      neededBy: input.neededBy ? new Date(input.neededBy) : undefined,
      createdByUserId: input.createdByUserId
    });
  }

  async updateBloodRequest(id: string, input: UpdateBloodRequestInput) {
    const existingRequest = await this.bloodRequestsRepository.findBloodRequestById(id);

    if (!existingRequest) {
      throw new AppError('Blood request not found', 404);
    }

    if (input.unitsRequested !== undefined && input.unitsRequested < existingRequest.unitsFulfilled) {
      throw new AppError('unitsRequested cannot be less than already fulfilled units', 400);
    }

    return this.bloodRequestsRepository.updateBloodRequest(id, {
      unitsRequested: input.unitsRequested,
      priority: input.priority,
      status: input.status,
      caseType: input.caseType,
      patientAge: input.patientAge,
      notes: input.notes,
      neededBy: input.neededBy ? new Date(input.neededBy) : undefined
    });
  }

  async fulfillBloodRequest(id: string, unitsFulfilledNow: number) {
    const existingRequest = await this.bloodRequestsRepository.findBloodRequestById(id);

    if (!existingRequest) {
      throw new AppError('Blood request not found', 404);
    }

    if (existingRequest.status === 'FULFILLED') {
      throw new AppError('Blood request is already fulfilled', 400);
    }

    const totalFulfilled = existingRequest.unitsFulfilled + unitsFulfilledNow;

    if (totalFulfilled > existingRequest.unitsRequested) {
      throw new AppError('Fulfilled units cannot exceed requested units', 400);
    }

    let status: RequestStatus = 'PARTIALLY_FULFILLED';

    if (totalFulfilled === existingRequest.unitsRequested) {
      status = 'FULFILLED';
    } else if (totalFulfilled === 0) {
      status = 'PENDING';
    }

    return this.bloodRequestsRepository.updateBloodRequest(id, {
      unitsFulfilled: totalFulfilled,
      status
    });
  }
}