import type { HttpRequest } from '@angular/common/http';

export const withAccessToken = (
  accessToken: string,
  request: HttpRequest<unknown>,
): HttpRequest<unknown> => {
  return request.clone({ setHeaders: { Authorization: `Bearer ${accessToken}` } });
};
