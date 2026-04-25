import { Request, Response } from 'express';
import { sendSuccess } from '@/common/utils/api-response';
import { CampaignsService } from './campaigns.service';

type CampaignIdParams = {
  id: string;
};

export class CampaignsController {
  constructor(private readonly campaignsService: CampaignsService) {}

  getCampaigns = async (_req: Request, res: Response): Promise<Response> => {
    const result = await this.campaignsService.getCampaigns();

    return sendSuccess({
      res,
      message: 'Campaigns fetched successfully',
      data: result
    });
  };

  getCampaignById = async (
    req: Request<CampaignIdParams>,
    res: Response
  ): Promise<Response> => {
    const result = await this.campaignsService.getCampaignById(req.params.id);

    return sendSuccess({
      res,
      message: 'Campaign fetched successfully',
      data: result
    });
  };

  createCampaign = async (req: Request, res: Response): Promise<Response> => {
    const result = await this.campaignsService.createCampaign(req.body);

    return sendSuccess({
      res,
      statusCode: 201,
      message: 'Campaign created successfully',
      data: result
    });
  };

  updateCampaign = async (
    req: Request<CampaignIdParams>,
    res: Response
  ): Promise<Response> => {
    const result = await this.campaignsService.updateCampaign(req.params.id, req.body);

    return sendSuccess({
      res,
      message: 'Campaign updated successfully',
      data: result
    });
  };

  publishCampaign = async (
    req: Request<CampaignIdParams>,
    res: Response
  ): Promise<Response> => {
    const result = await this.campaignsService.publishCampaign(req.params.id);

    return sendSuccess({
      res,
      message: 'Campaign published successfully',
      data: result
    });
  };

  cancelCampaign = async (
    req: Request<CampaignIdParams>,
    res: Response
  ): Promise<Response> => {
    const result = await this.campaignsService.cancelCampaign(req.params.id);

    return sendSuccess({
      res,
      message: 'Campaign cancelled successfully',
      data: result
    });
  };
}