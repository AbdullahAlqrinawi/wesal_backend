import { Request, Response } from 'express';
import { sendSuccess } from '@/common/utils/api-response';
import { ApprovalsService } from './approvals.service';

type ApprovalIdParams = {
  id: string;
};

export class ApprovalsController {
  constructor(private readonly approvalsService: ApprovalsService) {}

  getApprovals = async (_req: Request, res: Response): Promise<Response> => {
    const result = await this.approvalsService.getApprovals();

    return sendSuccess({
      res,
      message: 'Approvals fetched successfully',
      data: result
    });
  };

  getApprovalById = async (
    req: Request<ApprovalIdParams>,
    res: Response
  ): Promise<Response> => {
    const result = await this.approvalsService.getApprovalById(req.params.id);

    return sendSuccess({
      res,
      message: 'Approval fetched successfully',
      data: result
    });
  };

  createApproval = async (req: Request, res: Response): Promise<Response> => {
    const result = await this.approvalsService.createApproval(req.body);

    return sendSuccess({
      res,
      statusCode: 201,
      message: 'Approval created successfully',
      data: result
    });
  };

  updateApproval = async (
    req: Request<ApprovalIdParams>,
    res: Response
  ): Promise<Response> => {
    const result = await this.approvalsService.updateApproval(req.params.id, req.body);

    return sendSuccess({
      res,
      message: 'Approval updated successfully',
      data: result
    });
  };

  approveApproval = async (
    req: Request<ApprovalIdParams>,
    res: Response
  ): Promise<Response> => {
    const result = await this.approvalsService.approveApproval(
      req.params.id,
      req.body.reviewedByUserId,
      req.body.notes
    );

    return sendSuccess({
      res,
      message: 'Approval approved successfully',
      data: result
    });
  };

  rejectApproval = async (
    req: Request<ApprovalIdParams>,
    res: Response
  ): Promise<Response> => {
    const result = await this.approvalsService.rejectApproval(
      req.params.id,
      req.body.reviewedByUserId,
      req.body.notes
    );

    return sendSuccess({
      res,
      message: 'Approval rejected successfully',
      data: result
    });
  };
}