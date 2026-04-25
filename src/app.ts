import express from 'express';
import helmet from 'helmet';
import swaggerUi from 'swagger-ui-express';

import { env } from '@/config/env';
import { corsMiddleware } from '@/config/cors';
import { httpLogger } from '@/config/logger';
import { swaggerSpec } from '@/config/swagger';
import apiRoutes from '@/routes';
import { requestContextMiddleware } from '@/middlewares/request-context.middleware';
import { notFoundMiddleware } from '@/middlewares/not-found.middleware';
import { errorMiddleware } from '@/middlewares/error.middleware';

const app = express();

app.use(requestContextMiddleware);
app.use(httpLogger);
app.use(helmet());
app.use(corsMiddleware);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(env.apiPrefix, apiRoutes);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;