import { Response } from 'express';

type SuccessResponseParams<T> = {
  res: Response;
  statusCode?: number;
  message?: string;
  data?: T;
  meta?: Record<string, unknown>;
};

type ErrorResponseParams = {
  res: Response;
  statusCode?: number;
  message?: string;
  errors?: unknown;
};

export function sendSuccess<T>({
  res,
  statusCode = 200,
  message = 'Operation completed successfully',
  data,
  meta
}: SuccessResponseParams<T>): Response {
  return res.status(statusCode).json({
    success: true,
    message,
    data: data ?? null,
    meta: meta ?? null
  });
}

export function sendError({
  res,
  statusCode = 500,
  message = 'Something went wrong',
  errors = null
}: ErrorResponseParams): Response {
  return res.status(statusCode).json({
    success: false,
    message,
    errors
  });
}