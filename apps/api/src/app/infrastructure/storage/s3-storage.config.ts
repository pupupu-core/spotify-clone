import { APP_CONFIG } from '$/shared/config/app.config';
import { type S3ClientConfig } from '@aws-sdk/client-s3';

export const S3_STORAGE_CONFIG = {
  endpoint: APP_CONFIG.storage.s3.endpoint,
  region: APP_CONFIG.storage.s3.region,
  forcePathStyle: APP_CONFIG.storage.s3.forcePathStyle,
  credentials: {
    accessKeyId: APP_CONFIG.storage.s3.accessKey,
    secretAccessKey: APP_CONFIG.storage.s3.secretKey,
  },
} satisfies S3ClientConfig;
