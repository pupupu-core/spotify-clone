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
    TRACKS: {
      serverPath: 'tracks',
      clientUrl: '/account/tracks',
    },
  },
  TRACK: {
    basePath: 'tracks',
    DISCOVERY: {
      serverPath: 'discovery',
      clientUrl: '/tracks/discovery',
    },
    COMMUNITY: {
      serverPath: 'community',
      clientUrl: '/tracks/community',
    },
    UPLOAD: {
      serverPath: 'upload',
      clientUrl: '/tracks/upload',
    },
    AUDIO: {
      serverPath: ':trackId/audio',
      clientUrl: '/tracks/:trackId/audio',
    },
    DELETE: {
      serverPath: ':trackId',
      clientUrl: '/tracks/:trackId',
    },
  },
  PLAYLIST: {
    basePath: 'playlists',
    LIST: {
      serverPath: '',
      clientUrl: '/playlists',
    },
    CREATE: {
      serverPath: '',
      clientUrl: '/playlists',
    },
    DETAIL: {
      serverPath: ':playlistId',
      clientUrl: '/playlists/:playlistId',
    },
    UPDATE: {
      serverPath: ':playlistId',
      clientUrl: '/playlists/:playlistId',
    },
    DELETE: {
      serverPath: ':playlistId',
      clientUrl: '/playlists/:playlistId',
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
  SEARCH: {
    basePath: 'search',
    AUTOCOMPLETE: {
      serverPath: 'autocomplete',
      clientUrl: '/search/autocomplete',
    },
    TRACKS: {
      serverPath: 'tracks',
      clientUrl: '/search/tracks',
    },
  },
} as const;
