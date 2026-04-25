import dotenv from 'dotenv';

dotenv.config();

function getEnv(key: string, defaultValue?: string): string {
  const value = process.env[key] ?? defaultValue;

  if (value === undefined || value === '') {
    throw new Error(`Missing required environment variable: ${key}`);
  }

  return value;
}

export const env = {
  nodeEnv: getEnv('NODE_ENV', 'development'),
  port: Number(getEnv('PORT', '5000')),
  databaseUrl: getEnv('DATABASE_URL'),
  jwtAccessSecret: getEnv('JWT_ACCESS_SECRET'),
  jwtRefreshSecret: getEnv('JWT_REFRESH_SECRET'),
  jwtAccessExpiresIn: getEnv('JWT_ACCESS_EXPIRES_IN', '15m'),
  jwtRefreshExpiresIn: getEnv('JWT_REFRESH_EXPIRES_IN', '7d'),
  logLevel: getEnv('LOG_LEVEL', 'info'),
  appName: getEnv('APP_NAME', 'Wisal Backend'),
  apiPrefix: getEnv('API_PREFIX', '/api/v1'),
  isDevelopment: (process.env.NODE_ENV ?? 'development') === 'development',
  isProduction: process.env.NODE_ENV === 'production'
};