import { Request, Response } from 'express';

import { sendSuccess } from '@/common/utils/api-response';

import { AuthService } from './auth.service';

export class AuthController {
  constructor(private readonly authService: AuthService) {}

  registerDonor = async (req: Request, res: Response): Promise<Response> => {
    const result = await this.authService.registerDonor(req.body);

    return sendSuccess({
      res,
      statusCode: 201,
      message: 'Donor registered successfully',
      data: result
    });
  };

  login = async (req: Request, res: Response): Promise<Response> => {
    const result = await this.authService.login(req.body);

    return sendSuccess({
      res,
      message: 'Login successful',
      data: result
    });
  };

  refreshToken = async (req: Request, res: Response): Promise<Response> => {
    const result = await this.authService.refreshToken(req.body.refreshToken);

    return sendSuccess({
      res,
      message: 'Token refreshed successfully',
      data: result
    });
  };
}