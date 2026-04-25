import swaggerJsdoc from 'swagger-jsdoc';
import { env } from '@/config/env';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: env.appName,
      version: '1.0.0',
      description: 'Wisal Backend API Documentation'
    },
    servers: [
      {
        url: `http://localhost:${env.port}${env.apiPrefix}`,
        description: 'Local development server'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    },
    security: [
      {
        bearerAuth: []
      }
    ]
  },
  apis: ['./src/modules/**/*.ts', './src/routes/**/*.ts']
};

export const swaggerSpec = swaggerJsdoc(options);