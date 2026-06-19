import { API_ENDPOINTS, API_VERSION } from '@streaming-service/config';
import { buildApiPath } from '@streaming-service/utils';

export const APP_ENDPOINTS = {
  AUTH: {
    LOGIN: buildApiPath({
      prefix: null,
      version: API_VERSION,
      path: API_ENDPOINTS.AUTH.LOGIN.clientUrl,
    }),
    REGISTER: buildApiPath({
      prefix: null,
      version: API_VERSION,
      path: API_ENDPOINTS.AUTH.REGISTER.clientUrl,
    }),
  },
} as const;
