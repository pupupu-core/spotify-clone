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
  server: {
    host: process.env.HOST || '0.0.0.0',
    port: Number(process.env.PORT) || 3000,
  },
  restGateway: {
    pathPrefix: '' as const,
    version: '/v1' as const,
    publicOrigin: process.env.API_PUBLIC_ORIGIN ?? '',
  },
  jamendo: {
    apiKey: getEnvOrThrow('JAMENDO_API_KEY'),
    clientId: getEnvOrThrow('JAMENDO_API_CLIENT_ID'),
  },
  prisma: {
    dbUrl: getEnvOrThrow('DATABASE_URL'),
  },
  storage: {
    s3: {
      endpoint: getEnvOrThrow('S3_ENDPOINT'),
      region: getEnvOrThrow('S3_REGION'),
      bucket: getEnvOrThrow('S3_BUCKET'),
      accessKey: getEnvOrThrow('S3_ACCESS_KEY'),
      secretKey: getEnvOrThrow('S3_SECRET_KEY'),
      forcePathStyle: getEnvOrThrow('S3_FORCE_PATH_STYLE') === 'true',
    },
  },
};
