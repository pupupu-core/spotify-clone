export const APP_ROUTES = {
  AUTH: {
    to: '/auth',
    LOGIN: {
      to: '/auth/login',
    },
    REGISTER: {
      to: '/auth/register',
    },
  },
  HOME: {
    to: '/',
  },
} as const;
