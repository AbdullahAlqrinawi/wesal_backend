import app from '@/app';
import { env } from '@/config/env';
import { baseLogger } from '@/lib/pino';
import { prisma } from '@/lib/prisma';

async function bootstrap(): Promise<void> {
  try {
    await prisma.$connect();

    app.listen(env.port, () => {
      baseLogger.info(
        `Server is running on http://localhost:${env.port}${env.apiPrefix}`
      );
      baseLogger.info(`Swagger docs available at http://localhost:${env.port}/docs`);
    });
  } catch (error) {
    baseLogger.error(error, 'Failed to start server');
    process.exit(1);
  }
}

void bootstrap();