import { getEnvOrThrow } from '../lib/get-env-or-throw';
import { API_PREFIX } from '@streaming-service/config';

export const APP_CONFIG = {
  isProduction: process.env.NODE_ENV === 'production',
  http: {
    host: process.env.HOST || '0.0.0.0',
    port: Number(process.env.PORT) || 3000,
  },
  restGateway: {
    pathPrefix: API_PREFIX,
  },
  jamendo: {
    apiKey: getEnvOrThrow('JAMENDO_API_KEY'),
  },
  prisma: {
    dbUrl: getEnvOrThrow('DATABASE_URL'),
  },
};
