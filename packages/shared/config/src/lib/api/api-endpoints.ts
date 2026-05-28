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
  USER: {
    basePath: 'user',
    ME: {
      serverPath: 'me',
      clientUrl: '/user/me',
    },
  },
  TRACK: {
    serverPath: 'track',
    clientUrl: '/track/id',
  },
} as const;
