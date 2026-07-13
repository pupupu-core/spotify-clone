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
import { catchError, firstValueFrom, of, timeout } from 'rxjs';
import { accessTokenInterceptor } from './core/interceptors/access-token/access-token.interceptor';
import { httpErrorInterceptor } from './core/interceptors/http-error.interceptor';
import { APP_CONFIG } from './core/config/app.config';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAppInitializer(() => {
      const authSession = inject(AuthSessionService);

      return firstValueFrom(
        authSession.refresh().pipe(
          timeout({ first: APP_CONFIG.AUTH.sessionRestorationTimeoutMs }),
          catchError((error: unknown) => {
            console.error(
              'Session restoration failed or timed out, try reloading the page manually',
              error,
            );

            return of(null);
          }),
        ),
      );
    }),
    provideBrowserGlobalErrorListeners(),
    provideRouter(appRoutes),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(withInterceptors([httpErrorInterceptor, accessTokenInterceptor])),
    ...ppfTranslocoConfig,
  ],
};
