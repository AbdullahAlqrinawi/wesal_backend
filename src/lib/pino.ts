import pino from 'pino';
import { env } from '@/config/env';

export const baseLogger = pino({
  level: env.logLevel,
  transport: env.isDevelopment
    ? {
        target: 'pino-pretty',
        options: {
          colorize: true,
          translateTime: 'SYS:standard',
          ignore: 'pid,hostname'
        }
      }
    : undefined
});