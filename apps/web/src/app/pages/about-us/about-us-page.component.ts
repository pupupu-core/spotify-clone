import type { OnInit } from '@angular/core';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { APP_NAME } from '~/core/constants/common.constants';
import { NgOptimizedImage } from '@angular/common';
import { CardDeveloperComponent } from '~/pages/about-us/component/card-developer/card-developer.component';
import { CardDeveloperPreviewComponent } from '~/pages/about-us/component/card-developer-preview/card-developer-preview.component';
import type { DeveloperInfo } from '~/pages/about-us/models/developer.model';
import { DEVELOPERS } from '~/pages/about-us/constants/data';

@Component({
  selector: 'ppf-about-us-page',
  imports: [NgOptimizedImage, CardDeveloperComponent, CardDeveloperPreviewComponent],
  templateUrl: './about-us-page.component.html',
  styleUrl: './about-us-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutUsPageComponent implements OnInit {
  protected readonly APP_NAME = APP_NAME;
  protected readonly developers: DeveloperInfo[] = DEVELOPERS;
  public readonly selectedDeveloper = signal<DeveloperInfo | null>(null);

  public ngOnInit(): void {
    document.body.style.overflow = 'hidden';

    setTimeout(() => (document.body.style.overflow = ''), 1500);
  }
}
