import { Request, Response } from 'express';
import { sendSuccess } from '@/common/utils/api-response';
import { HospitalsService } from './hospitals.service';

type HospitalIdParams = {
  id: string;
};

export class HospitalsController {
  constructor(private readonly hospitalsService: HospitalsService) {}

  getHospitals = async (_req: Request, res: Response): Promise<Response> => {
    const result = await this.hospitalsService.getHospitals();

    return sendSuccess({
      res,
      message: 'Hospitals fetched successfully',
      data: result
    });
  };

  getHospitalById = async (
    req: Request<HospitalIdParams>,
    res: Response
  ): Promise<Response> => {
    const result = await this.hospitalsService.getHospitalById(req.params.id);

    return sendSuccess({
      res,
      message: 'Hospital fetched successfully',
      data: result
    });
  };

  createHospital = async (req: Request, res: Response): Promise<Response> => {
    const result = await this.hospitalsService.createHospital(req.body);

    return sendSuccess({
      res,
      statusCode: 201,
      message: 'Hospital created successfully',
      data: result
    });
  };

  updateHospital = async (
    req: Request<HospitalIdParams>,
    res: Response
  ): Promise<Response> => {
    const result = await this.hospitalsService.updateHospital(req.params.id, req.body);

    return sendSuccess({
      res,
      message: 'Hospital updated successfully',
      data: result
    });
  };

  activateHospital = async (
    req: Request<HospitalIdParams>,
    res: Response
  ): Promise<Response> => {
    const result = await this.hospitalsService.activateHospital(req.params.id);

    return sendSuccess({
      res,
      message: 'Hospital activated successfully',
      data: result
    });
  };

  deactivateHospital = async (
    req: Request<HospitalIdParams>,
    res: Response
  ): Promise<Response> => {
    const result = await this.hospitalsService.deactivateHospital(req.params.id);

    return sendSuccess({
      res,
      message: 'Hospital deactivated successfully',
      data: result
    });
  };
}