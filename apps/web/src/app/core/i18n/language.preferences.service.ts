import { effect, inject, Injectable, signal } from '@angular/core';
import { TranslocoService } from '@jsverse/transloco';

export const STORAGE_KEY = 'pupufy_lang';
export type SupportedLang = 'en' | 'ru';
export const SUPPORTED_LANGS: SupportedLang[] = ['en', 'ru'];

@Injectable({ providedIn: 'root' })
export class LanguagePreferenceService {
  private readonly transloco = inject(TranslocoService);

  public readonly currentLanguage = signal<SupportedLang>(this.getCurrentLanguage());

  private readonly persistLang = effect(() => {
    const lang = this.currentLanguage();

    this.transloco.setActiveLang(lang);
    localStorage.setItem(STORAGE_KEY, lang);
  });

  public setLang(lang: string): void {
    if (this.isSupportedLang(lang)) {
      this.currentLanguage.set(lang);
    }
  }

  private isSupportedLang(lang: string | null): lang is SupportedLang {
    if (lang === null) {
      return false;
    }

    return SUPPORTED_LANGS.some(supported => supported === lang);
  }

  private getCurrentLanguage(): SupportedLang {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (this.isSupportedLang(saved)) {
      return saved;
    }

    const active = this.transloco.getActiveLang();

    if (this.isSupportedLang(active)) {
      return active;
    }

    return SUPPORTED_LANGS[0];
  }
}
