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
    minLength: 3,
  },
};

export const UPLOAD_TRACK_CONSTRAINTS = {
  title: {
    minLength: 1,
  },
  artistName: {
    minLength: 1,
  },
  albumName: {
    minLength: 1,
  },
};
