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
  ARTIST: {
    basePath: 'artists',
    TRACKS: {
      serverPath: ':artistId/tracks',
      clientUrl: '/artists/:artistId/tracks',
    },
    ALBUMS: {
      serverPath: ':artistId/albums',
      clientUrl: '/artists/:artistId/albums',
    },
    MUSIC_INFO: {
      serverPath: ':artistId/musicInfo',
      clientUrl: '/artists/:artistId/musicInfo',
    },
  },
  ALBUMS: {
    basePath: 'albums',
    TRACKS: {
      serverPath: ':albumId/tracks',
      clientUrl: '/albums/:albumId/tracks',
    },
  },
} as const;
