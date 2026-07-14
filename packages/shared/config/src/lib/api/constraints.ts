export const AUTH_CONSTRAINTS = {
  password: {
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  },
  login: {
    minLength: 3,
  },
  username: {
    minLength: 1,
  },
};

export const UPLOAD_TRACK_CONSTRAINTS = {
  title: {
    minLength: 1,
    maxLength: 120,
  },
  artistName: {
    minLength: 1,
    maxLength: 120,
  },
  albumName: {
    minLength: 1,
    maxLength: 120,
  },
  limits: {
    maxFileSizeBytes: 10 * 1024 * 1024, // 10MB
    typeRegex: /^audio\/(mpeg|mp3|wav|ogg|flac|aac|x-m4a|mp4)$/,
  },
};

export const PLAYLIST_CONSTRAINTS = {
  name: {
    minLength: 1,
    maxLength: 120,
  },
  description: {
    maxLength: 500,
  },
  tracks: {
    minCount: 1,
    maxCount: 500,
  },
};
