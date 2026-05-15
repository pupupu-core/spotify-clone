import { effect, inject, Injectable, signal } from '@angular/core';
import { TranslocoService } from '@jsverse/transloco';

export const STORAGE_KEY = 'pupufy_lang';
export type SupportedLang = 'en' | 'ru';
export const SUPPORTED_LANGS: SupportedLang[] = ['en', 'ru'];

@Injectable({ providedIn: 'root' })
export class LanguagePreferenceService {
  private readonly transloco = inject(TranslocoService);
  private readonly defaultLang: SupportedLang = SUPPORTED_LANGS[0];

  public readonly currentLanguage = signal<SupportedLang>(
    this.loadFromLocalStorage() ?? this.getInitialLangFromTransloco(),
  );

  private readonly persistLang = effect(() => {
    const lang = this.currentLanguage();

    this.transloco.setActiveLang(lang);
    localStorage.setItem(STORAGE_KEY, lang);
  });

  public setLang(lang: SupportedLang): void {
    if (this.isSupportedLang(lang)) {
      this.currentLanguage.set(lang);
    }
  }

  private isSupportedLang(lang: string | null): lang is SupportedLang {
    return lang !== null && SUPPORTED_LANGS.includes(lang as SupportedLang);
  }

  private loadFromLocalStorage(): SupportedLang | null {
    const savedLang = localStorage.getItem(STORAGE_KEY);

    return this.isSupportedLang(savedLang) ? savedLang : null;
  }

  private getInitialLangFromTransloco(): SupportedLang {
    const active = this.transloco.getActiveLang();

    return this.isSupportedLang(active) ? active : this.defaultLang;
  }
}
