import {
  HttpErrorResponse,
  type HttpEvent,
  type HttpHandlerFn,
  type HttpRequest,
} from '@angular/common/http';
import type { MonoTypeOperatorFunction } from 'rxjs';
import { catchError, pipe, switchMap, throwError } from 'rxjs';
import type { AuthSessionService } from '~/core/stores/auth-session.service';
import { APP_ENDPOINTS } from '~/core/config/endpoints.config';
import { withAccessToken } from './with-access-token.utils';

export const refreshOnUnauthorized = ({
  request,
  next,
  authSession,
}: {
  request: HttpRequest<unknown>;
  next: HttpHandlerFn;
  authSession: AuthSessionService;
}): MonoTypeOperatorFunction<HttpEvent<unknown>> =>
  pipe(
    catchError((error: unknown) => {
      if (
        !(error instanceof HttpErrorResponse) ||
        error.status !== 401 ||
        request.url === APP_ENDPOINTS.AUTH.REFRESH
      ) {
        return throwError(() => error);
      }

      return authSession
        .refresh()
        .pipe(
          switchMap(({ accessToken: refreshedAccessToken }) =>
            next(withAccessToken(refreshedAccessToken, request)),
          ),
        );
    }),
  );
