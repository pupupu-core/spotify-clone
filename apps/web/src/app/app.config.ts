import {
  provideAppInitializer,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';
import type { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { appRoutes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { ppfTranslocoConfig } from './core/i18n/transloco.config';
import { inject } from '@angular/core/primitives/di';
import { AuthSessionService } from './core/auth/auth-session.service';
import { catchError, firstValueFrom, of } from 'rxjs';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAppInitializer(() => {
      const authSession = inject(AuthSessionService);

      return firstValueFrom(authSession.refresh().pipe(catchError(() => of(null))));
    }),
    provideBrowserGlobalErrorListeners(),
    provideRouter(appRoutes),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(),
    ...ppfTranslocoConfig,
  ],
};
