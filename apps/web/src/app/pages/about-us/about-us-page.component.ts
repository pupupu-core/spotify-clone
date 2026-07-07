import { ChangeDetectionStrategy, Component } from '@angular/core';
import { APP_NAME } from '~/core/constants/common.constants';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'ppf-about-us-page',
  imports: [NgOptimizedImage],
  templateUrl: './about-us-page.component.html',
  styleUrl: './about-us-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutUsPageComponent {
  protected readonly APP_NAME = APP_NAME;
}
