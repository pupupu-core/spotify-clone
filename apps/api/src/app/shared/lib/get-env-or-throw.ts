/**
 * Reads a required environment variable.
 *
 * Throws during application startup when the variable is missing or empty.
 */
export const getEnvOrThrow = (envName: string): string => {
  const value = process.env[envName];

  if (!value) {
    throw new Error(`Environment variable ${envName} is not set`);
  }

  return value;
};
