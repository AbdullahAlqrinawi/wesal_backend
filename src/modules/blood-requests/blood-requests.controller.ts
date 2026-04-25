import { Request, Response } from 'express';
import { sendSuccess } from '@/common/utils/api-response';
import { BloodRequestsService } from './blood-requests.service';

type BloodRequestIdParams = {
  id: string;
};

export class BloodRequestsController {
  constructor(private readonly bloodRequestsService: BloodRequestsService) {}

  getBloodRequests = async (_req: Request, res: Response): Promise<Response> => {
    const result = await this.bloodRequestsService.getBloodRequests();

    return sendSuccess({
      res,
      message: 'Blood requests fetched successfully',
      data: result
    });
  };

  getBloodRequestById = async (
    req: Request<BloodRequestIdParams>,
    res: Response
  ): Promise<Response> => {
    const result = await this.bloodRequestsService.getBloodRequestById(req.params.id);

    return sendSuccess({
      res,
      message: 'Blood request fetched successfully',
      data: result
    });
  };

  createBloodRequest = async (req: Request, res: Response): Promise<Response> => {
    const result = await this.bloodRequestsService.createBloodRequest(req.body);

    return sendSuccess({
      res,
      statusCode: 201,
      message: 'Blood request created successfully',
      data: result
    });
  };

  updateBloodRequest = async (
    req: Request<BloodRequestIdParams>,
    res: Response
  ): Promise<Response> => {
    const result = await this.bloodRequestsService.updateBloodRequest(req.params.id, req.body);

    return sendSuccess({
      res,
      message: 'Blood request updated successfully',
      data: result
    });
  };

  fulfillBloodRequest = async (
    req: Request<BloodRequestIdParams>,
    res: Response
  ): Promise<Response> => {
    const result = await this.bloodRequestsService.fulfillBloodRequest(
      req.params.id,
      req.body.unitsFulfilledNow
    );

    return sendSuccess({
      res,
      message: 'Blood request fulfilled successfully',
      data: result
    });
  };
}