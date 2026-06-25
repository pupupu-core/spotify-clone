import { HttpModuleOptions } from '@nestjs/axios';

export const HTTP_CLIENT_CONFIG = {
  AXIOS: {
    timeout: 10_000,
    maxRedirects: 5,
  },
} as const satisfies {
  AXIOS: HttpModuleOptions;
};
