import { NextFunction, Request, Response } from 'express';

export function permissionMiddleware(_permissions: string[]) {
  return (_req: Request, _res: Response, next: NextFunction): void => {
    next();
  };
}