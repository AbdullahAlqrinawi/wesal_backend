import { Request, Response } from 'express';
import { sendSuccess } from '@/common/utils/api-response';
import { UsersService } from './users.service';

type UserIdParams = {
  id: string;
};

export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  getUsers = async (_req: Request, res: Response): Promise<Response> => {
    const result = await this.usersService.getUsers();

    return sendSuccess({
      res,
      message: 'Users fetched successfully',
      data: result
    });
  };

  getUserById = async (
    req: Request<UserIdParams>,
    res: Response
  ): Promise<Response> => {
    const result = await this.usersService.getUserById(req.params.id);

    return sendSuccess({
      res,
      message: 'User fetched successfully',
      data: result
    });
  };

  createUser = async (req: Request, res: Response): Promise<Response> => {
    const result = await this.usersService.createUser(req.body);

    return sendSuccess({
      res,
      statusCode: 201,
      message: 'User created successfully',
      data: result
    });
  };

  updateUser = async (
    req: Request<UserIdParams>,
    res: Response
  ): Promise<Response> => {
    const result = await this.usersService.updateUser(req.params.id, req.body);

    return sendSuccess({
      res,
      message: 'User updated successfully',
      data: result
    });
  };

  activateUser = async (
    req: Request<UserIdParams>,
    res: Response
  ): Promise<Response> => {
    const result = await this.usersService.activateUser(req.params.id);

    return sendSuccess({
      res,
      message: 'User activated successfully',
      data: result
    });
  };

  deactivateUser = async (
    req: Request<UserIdParams>,
    res: Response
  ): Promise<Response> => {
    const result = await this.usersService.deactivateUser(req.params.id);

    return sendSuccess({
      res,
      message: 'User deactivated successfully',
      data: result
    });
  };
}