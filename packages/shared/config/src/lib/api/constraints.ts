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
