import type { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthSessionService } from '../../stores/auth-session.service';
import { refreshOnUnauthorized } from './refresh-on-unauthorized.operator';
import { withAccessToken } from './with-access-token.utils';

export const accessTokenInterceptor: HttpInterceptorFn = (request, next) => {
  const authSession = inject(AuthSessionService);
  const accessToken = authSession.getAccessToken();

  return next(accessToken === null ? request : withAccessToken(accessToken, request)).pipe(
    refreshOnUnauthorized({ request, next, authSession }),
  );
};
