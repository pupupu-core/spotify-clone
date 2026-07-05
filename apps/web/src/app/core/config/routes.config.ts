export const ROUTES = {
  AUTH: {
    path: 'auth',
    to: '/auth',
    meta: {
      label: 'Authentication',
      title: 'Welcome',
    },
    LOGIN: {
      path: 'login',
      to: '/auth/login',
      meta: {
        label: 'Login Page',
        title: 'Login',
      },
    },
    REGISTER: {
      path: 'register',
      to: '/auth/register',
      meta: {
        label: 'Register Page',
        title: 'Register',
      },
    },
  },
  HOME: {
    path: '',
    to: '/',
    meta: {
      label: 'Discover page',
      title: 'Discover',
    },
  },
  SEARCH: {
    path: 'search',
    to: '/search',
    meta: {
      label: 'Search page',
      title: 'Search',
    },
  },
  LIBRARY: {
    path: 'library',
    to: '/library',
    meta: {
      label: 'Library page',
      title: 'Library',
    },
  },
  ARTIST: {
    path: 'artist/:artistId',
    to: (artistId: string) => `/artist/${artistId}`,
    meta: {
      label: 'Artist page',
      title: 'Artist',
    },
  },
  ARTIST_ALBUM: {
    path: 'album/:albumId',
    to: (albumId: string) => `/album/${albumId}`,
    meta: {
      label: 'Album page',
      title: 'Album',
    },
  },
  ABOUT_US: {
    path: 'about-us',
    to: '/about-us',
    meta: {
      label: 'About us page',
      title: 'About us',
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
