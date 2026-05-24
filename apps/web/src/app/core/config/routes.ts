export const ROUTES = {
  AUTH: {
    path: 'auth',
    to: '/auth',
    meta: {
      label: 'Authentication',
      title: 'Welcome',
    },
  },
  HOME: {
    path: '',
    to: '/',
    meta: {
      label: 'Home',
      title: 'Home',
    },
  },
  SEARCH: {
    path: 'search',
    to: 'search',
    meta: {
      label: 'Search page',
      title: 'Search',
    },
  },
  NOT_FOUND: {
    path: '**',
    to: '/not-found',
    meta: {
      label: 'Not Found',
      title: 'Not Found',
    },
  },
} as const;
