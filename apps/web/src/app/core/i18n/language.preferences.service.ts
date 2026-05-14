import { effect, inject, Injectable } from '@angular/core';
import { TranslocoService } from '@jsverse/transloco';

export const STORAGE_KEY = 'pupufy_lang';

export type SupportedLang = 'en' | 'ru';
export const SUPPORTED_LANGS: SupportedLang[] = ['en', 'ru'];

@Injectable({ providedIn: 'root' })
export class LanguagePreferenceService {
  private readonly transloco = inject(TranslocoService);
  private readonly defaultLang: SupportedLang = SUPPORTED_LANGS[0];

  constructor() {
    effect(() => {
      const savedLang = localStorage.getItem(STORAGE_KEY);

      if (savedLang !== null && savedLang !== '') {
        this.transloco.setActiveLang(savedLang);
      }
    });
  }

  public getLang(): string {
    return this.transloco.getActiveLang();
  }

  public setLang(lang: SupportedLang): void {
    this.transloco.setActiveLang(lang);
    this.saveToStorage(lang);
  }

  private saveToStorage(lang: SupportedLang): void {
    localStorage.setItem(STORAGE_KEY, lang);
  }
}
