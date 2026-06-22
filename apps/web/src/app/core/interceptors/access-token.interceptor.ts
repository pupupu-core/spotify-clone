import type { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthSessionService } from '../stores/auth-session.service';

export const accessTokenInterceptor: HttpInterceptorFn = (request, next) => {
  const accessToken = inject(AuthSessionService).getAccessToken();

  if (accessToken === null) {
    return next(request);
  }

  return next(
    request.clone({
      setHeaders: {
        Authorization: `Bearer ${accessToken}`,
      },
    }),
  );
};
