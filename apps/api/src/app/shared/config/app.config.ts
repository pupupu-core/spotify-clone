import { getEnvOrThrow } from '../lib/get-env-or-throw';

export const APP_CONFIG = {
  isProduction: process.env.NODE_ENV === 'production',
  http: {
    host: process.env.HOST || '0.0.0.0',
    port: Number(process.env.PORT) || 3000,
  },
  restGateway: {
    pathPrefix: 'api',
    version: '1',
  },
  jamendo: {
    apiKey: getEnvOrThrow('JAMENDO_API_KEY'),
  },
};
