import { AppError } from '@/common/errors/app-error';
import { ApprovalsRepository } from './approvals.repository';

type CreateApprovalInput = {
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
};

type UpdateApprovalInput = {
  priority?: string;
  notes?: string;
  status?: 'PENDING' | 'APPROVED' | 'REJECTED' | 'RETURNED';
  reviewedByUserId?: string;
};

export class ApprovalsService {
  constructor(private readonly approvalsRepository: ApprovalsRepository) {}

  async getApprovals() {
    return this.approvalsRepository.findAllApprovals();
  }

  async getApprovalById(id: string) {
    const approval = await this.approvalsRepository.findApprovalById(id);

    if (!approval) {
      throw new AppError('Approval not found', 404);
    }

    return approval;
  }

  async createApproval(input: CreateApprovalInput) {
    if (input.submittedByUserId) {
      const user = await this.approvalsRepository.findUserById(input.submittedByUserId);

      if (!user) {
        throw new AppError('Submitting user not found', 404);
      }
    }

    if (input.submittedByHospitalId) {
      const hospital = await this.approvalsRepository.findHospitalById(
        input.submittedByHospitalId
      );

      if (!hospital) {
        throw new AppError('Submitting hospital not found', 404);
      }
    }

    return this.approvalsRepository.createApproval(input);
  }

  async updateApproval(id: string, input: UpdateApprovalInput) {
    const existingApproval = await this.approvalsRepository.findApprovalById(id);

    if (!existingApproval) {
      throw new AppError('Approval not found', 404);
    }

    if (input.reviewedByUserId) {
      const reviewer = await this.approvalsRepository.findUserById(input.reviewedByUserId);

      if (!reviewer) {
        throw new AppError('Reviewer user not found', 404);
      }
    }

    return this.approvalsRepository.updateApproval(id, {
      priority: input.priority,
      notes: input.notes,
      status: input.status,
      reviewedByUserId: input.reviewedByUserId
    });
  }

  async approveApproval(id: string, reviewedByUserId: string, notes?: string) {
    const existingApproval = await this.approvalsRepository.findApprovalById(id);

    if (!existingApproval) {
      throw new AppError('Approval not found', 404);
    }

    const reviewer = await this.approvalsRepository.findUserById(reviewedByUserId);

    if (!reviewer) {
      throw new AppError('Reviewer user not found', 404);
    }

    return this.approvalsRepository.updateApproval(id, {
      status: 'APPROVED',
      reviewedByUserId,
      reviewedAt: new Date(),
      notes: notes ?? existingApproval.notes ?? undefined
    });
  }

  async rejectApproval(id: string, reviewedByUserId: string, notes?: string) {
    const existingApproval = await this.approvalsRepository.findApprovalById(id);

    if (!existingApproval) {
      throw new AppError('Approval not found', 404);
    }

    const reviewer = await this.approvalsRepository.findUserById(reviewedByUserId);

    if (!reviewer) {
      throw new AppError('Reviewer user not found', 404);
    }

    return this.approvalsRepository.updateApproval(id, {
      status: 'REJECTED',
      reviewedByUserId,
      reviewedAt: new Date(),
      notes: notes ?? existingApproval.notes ?? undefined
    });
  }
}