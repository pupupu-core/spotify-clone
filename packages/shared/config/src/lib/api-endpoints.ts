export const API_ENDPOINTS = {
  track: {
    serverPath: 'track',
    clientUrl: '/track',
  },
  auth: {
    serverPath: 'auth',
    clientUrl: '/auth',
  },
  authLogin: {
    serverPath: 'login',
    clientUrl: '/auth/login',
  },
  authRegister: {
    serverPath: 'register',
    clientUrl: '/auth/register',
  },
  authRefresh: {
    serverPath: 'refresh',
    clientUrl: '/auth/refresh',
  },
  authMe: {
    serverPath: 'me',
    clientUrl: '/auth/me',
  },
  authLogout: {
    serverPath: 'logout',
    clientUrl: '/auth/logout',
  },
} as const;
