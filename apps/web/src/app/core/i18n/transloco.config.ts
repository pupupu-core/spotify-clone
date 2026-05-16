import type { ApplicationConfig } from '@angular/core';
import { isDevMode } from '@angular/core';
import { TranslocoHttpLoader } from '../../transloco-loader';
import { provideTransloco } from '@jsverse/transloco';
import { SUPPORTED_LANGS } from './language.preferences.service';

export const ppfTranslocoConfig: ApplicationConfig['providers'] = [
  provideTransloco({
    config: {
      availableLangs: [...SUPPORTED_LANGS],
      defaultLang: SUPPORTED_LANGS[0],
      prodMode: !isDevMode(),
    },
    loader: TranslocoHttpLoader,
  }),
];
