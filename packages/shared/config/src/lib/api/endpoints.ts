export const API_ENDPOINTS = {
  AUTH: {
    basePath: 'auth',
    LOGIN: {
      serverPath: 'login',
      clientUrl: '/auth/login',
    },
    REGISTER: {
      serverPath: 'register',
      clientUrl: '/auth/register',
    },
    REFRESH: {
      serverPath: 'refresh',
      clientUrl: '/auth/refresh',
    },
    LOGOUT: {
      serverPath: 'logout',
      clientUrl: '/auth/logout',
    },
  },
  ACCOUNT: {
    basePath: 'account',
    ME: {
      serverPath: 'me',
      clientUrl: '/account/me',
    },
  },
  TRACK: {
    basePath: 'tracks',
    DISCOVERY: {
      serverPath: 'discovery',
      clientUrl: '/tracks/discovery',
    },
  },
} as const;
