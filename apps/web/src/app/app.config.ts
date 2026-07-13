import {
  provideAppInitializer,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';
import type { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { appRoutes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ppfTranslocoConfig } from './core/i18n/transloco.config';
import { inject } from '@angular/core';
import { AuthSessionService } from './core/stores/auth-session.service';
import type { Observable } from 'rxjs';
import { catchError, EMPTY, timeout } from 'rxjs';
import { accessTokenInterceptor } from './core/interceptors/access-token/access-token.interceptor';
import { httpErrorInterceptor } from './core/interceptors/http-error.interceptor';
import { APP_CONFIG } from './core/config/app.config';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAppInitializer(() => {
      const authSession = inject(AuthSessionService);
      const restore$: Observable<unknown> = authSession.isLogoutPending
        ? authSession.logout()
        : authSession.refresh();

      return restore$.pipe(
        timeout({ first: APP_CONFIG.AUTH.sessionRestorationTimeoutMs }),
        catchError(() => {
          console.error('Session restoration failed');

          return EMPTY;
        }),
      );
    }),
    provideBrowserGlobalErrorListeners(),
    provideRouter(appRoutes),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(withInterceptors([httpErrorInterceptor, accessTokenInterceptor])),
    ...ppfTranslocoConfig,
  ],
};
