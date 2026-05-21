export const API_ENDPOINTS = {
  TRACK: {
    // not final
    serverPath: 'track',
    clientUrl: '/track',
  },
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
    ME: {
      serverPath: 'me',
      clientUrl: '/auth/me',
    },
    LOGOUT: {
      serverPath: 'logout',
      clientUrl: '/auth/logout',
    },
  },
} as const;
