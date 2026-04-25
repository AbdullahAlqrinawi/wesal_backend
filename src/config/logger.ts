import pinoHttp from 'pino-http';
import { baseLogger } from '@/lib/pino';

export const httpLogger = pinoHttp({
  logger: baseLogger,
  customProps: (req) => ({
    requestId: req.headers['x-request-id'] || null
  })
});