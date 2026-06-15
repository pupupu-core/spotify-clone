import { getEnvOrThrow } from '../lib/get-env-or-throw';

const REFRESH_TOKEN_EXPIRES_IN_MS = 30 * 24 * 60 * 60_000; // 30 days

export const APP_CONFIG = {
  isProduction: process.env.NODE_ENV === 'production',
  auth: {
    jwt: {
      secret: getEnvOrThrow('JWT_SECRET'),
      accessExpiresIn: '15m' as const,
    },
    refreshToken: {
      expiresInMs: REFRESH_TOKEN_EXPIRES_IN_MS,
    },
    refreshTokenCookie: {
      name: 'refreshToken',
      maxAgeMs: REFRESH_TOKEN_EXPIRES_IN_MS,
    },
  },
  http: {
    host: process.env.HOST || '0.0.0.0',
    port: Number(process.env.PORT) || 3000,
  },
  restGateway: {
    pathPrefix: '' as const,
    version: '/v1' as const,
  },
  jamendo: {
    apiKey: getEnvOrThrow('JAMENDO_API_KEY'),
    clientId: getEnvOrThrow('JAMENDO_API_CLIENT_ID'),
  },
  prisma: {
    dbUrl: getEnvOrThrow('DATABASE_URL'),
  },
};
