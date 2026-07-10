import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import type { DeveloperInfo } from '~/pages/about-us/models/developer.model';

@Component({
  selector: 'ppf-card-developer-preview',
  imports: [NgOptimizedImage],
  templateUrl: './card-developer-preview.component.html',
  styleUrl: './card-developer-preview.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardDeveloperPreviewComponent {
  public readonly developer = input.required<DeveloperInfo>();
  public readonly selectedDeveloper = input.required<DeveloperInfo | null>();
  public readonly setDeveloper = output();
}
