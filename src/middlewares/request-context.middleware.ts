import { NextFunction, Request, Response } from 'express';
import crypto from 'crypto';

export function requestContextMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const requestId =
    (req.headers['x-request-id'] as string | undefined) ?? crypto.randomUUID();

  req.headers['x-request-id'] = requestId;
  res.setHeader('x-request-id', requestId);

  next();
}