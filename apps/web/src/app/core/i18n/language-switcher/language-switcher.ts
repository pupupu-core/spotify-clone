import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import type { SupportedLang } from '../language.preferences.service';
import { LanguagePreferenceService, SUPPORTED_LANGS } from '../language.preferences.service';

@Component({
  selector: 'app-lang-switcher',
  templateUrl: 'language-switcher.html',
  styleUrl: 'language-switcher.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppLangSwitcher {
  private readonly langService = inject(LanguagePreferenceService);

  public readonly languages = SUPPORTED_LANGS;

  public switchLang(lang: SupportedLang): void {
    this.langService.setLang(lang);
  }

  public get activeLang(): string {
    return this.langService.getLang();
  }
}
