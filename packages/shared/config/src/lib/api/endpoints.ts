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
    RECENTLY_PLAYED: {
      serverPath: 'recently-played',
      clientUrl: '/account/recently-played',
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
    CREATE: {
      serverPath: '',
      clientUrl: '/playlists',
    },
    LIST: {
      serverPath: '',
      clientUrl: '/playlists',
    },
    COMMUNITY: {
      serverPath: 'community',
      clientUrl: '/playlists/community',
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
    ADD_ENTRY: {
      serverPath: ':playlistId/entries',
      clientUrl: '/playlists/:playlistId/entries',
    },
    REMOVE_ENTRY: {
      serverPath: ':playlistId/entries/:entryId',
      clientUrl: '/playlists/:playlistId/entries/:entryId',
    },
    REORDER_ENTRIES: {
      serverPath: ':playlistId/entries/order',
      clientUrl: '/playlists/:playlistId/entries/order',
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
