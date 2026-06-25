import { API_ENDPOINTS, API_VERSION } from '@streaming-service/config';
import { buildApiPath } from '@streaming-service/utils';
import { environment } from 'environments/environment';

export const APP_ENDPOINTS = {
  AUTH: {
    LOGIN: buildApiPath({
      origin: environment.apiOrigin,
      prefix: null,
      version: API_VERSION,
      path: API_ENDPOINTS.AUTH.LOGIN.clientUrl,
    }),
    REGISTER: buildApiPath({
      origin: environment.apiOrigin,
      prefix: null,
      version: API_VERSION,
      path: API_ENDPOINTS.AUTH.REGISTER.clientUrl,
    }),
    LOGOUT: buildApiPath({
      origin: environment.apiOrigin,
      prefix: null,
      version: API_VERSION,
      path: API_ENDPOINTS.AUTH.LOGOUT.clientUrl,
    }),
    REFRESH: buildApiPath({
      origin: environment.apiOrigin,
      prefix: null,
      version: API_VERSION,
      path: API_ENDPOINTS.AUTH.REFRESH.clientUrl,
    }),
  },
  ACCOUNT: {
    ME: buildApiPath({
      origin: environment.apiOrigin,
      prefix: null,
      version: API_VERSION,
      path: API_ENDPOINTS.ACCOUNT.ME.clientUrl,
    }),
  },
  ARTIST: {
    MUSIC_INFO: buildApiPath({
      origin: environment.apiOrigin,
      prefix: null,
      version: API_VERSION,
      path: API_ENDPOINTS.ARTIST.MUSIC_INFO.clientUrl,
    }),
  },
} as const;
