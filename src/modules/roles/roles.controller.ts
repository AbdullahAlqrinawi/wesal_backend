import { Request, Response } from 'express';
import { sendSuccess } from '@/common/utils/api-response';
import { RolesService } from './roles.service';

export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  getRoles = async (_req: Request, res: Response): Promise<Response> => {
    const result = await this.rolesService.getRoles();

    return sendSuccess({
      res,
      message: 'Roles fetched successfully',
      data: result
    });
  };

  getPermissions = async (_req: Request, res: Response): Promise<Response> => {
    const result = await this.rolesService.getPermissions();

    return sendSuccess({
      res,
      message: 'Permissions fetched successfully',
      data: result
    });
  };
}