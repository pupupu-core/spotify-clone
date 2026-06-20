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
    LOGOUT: buildApiPath({
      prefix: null,
      version: API_VERSION,
      path: API_ENDPOINTS.AUTH.LOGOUT.clientUrl,
    }),
    REFRESH: buildApiPath({
      prefix: null,
      version: API_VERSION,
      path: API_ENDPOINTS.AUTH.REFRESH.clientUrl,
    }),
  },
} as const;
