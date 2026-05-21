export const getEnvOrThrow = (envName: string): string => {
  const value = process.env[envName];

  if (!value) {
    throw new Error(`Environment variable ${envName} is not set`);
  }

  return value;
};
