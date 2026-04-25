import { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';
import { Prisma } from '@prisma/client';

import { AppError } from '@/common/errors/app-error';
import { env } from '@/config/env';
import { baseLogger } from '@/lib/pino';

export function errorMiddleware(
    err: unknown,
    req: Request,
    res: Response,
    _next: NextFunction
): Response {
    baseLogger.error(
        {
            path: req.originalUrl,
            method: req.method,
            error: err
        },
        'Unhandled error'
    );

    if (err instanceof AppError) {
        return res.status(err.statusCode).json({
            success: false,
            message: err.message,
            errors: err.details ?? null
        });
    }

    if (err instanceof ZodError) {
        return res.status(400).json({
            success: false,
            message: 'Validation failed',
            errors: err.flatten()
        });
    }

    if (err instanceof Prisma.PrismaClientKnownRequestError) {
        return res.status(400).json({
            success: false,
            message: 'Database operation failed',
            errors: {
                code: err.code,
                meta: err.meta ?? null
            }
        });
    }


    if (err instanceof Error) {
        return res.status(500).json({
            success: false,
            message: err.message,
            errors: env.isDevelopment ? err.stack : null
        });
    }

    return res.status(500).json({
        success: false,
        message: 'Internal server error',
        errors: null
    });
}