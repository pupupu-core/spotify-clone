import { provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import type { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { appRoutes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { ppfTranslocoConfig } from './core/i18n/transloco.config';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(appRoutes),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(),
    ...ppfTranslocoConfig,
  ],
};
