import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { LowerCasePipe, NgOptimizedImage } from '@angular/common';
import { MatCard, MatCardActions, MatCardContent, MatCardTitle } from '@angular/material/card';
import { MatDivider } from '@angular/material/list';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import type { DeveloperInfo } from '~/pages/about-us/about-us-page.component';

@Component({
  selector: 'ppf-card-developer',
  imports: [
    LowerCasePipe,
    MatCard,
    MatCardActions,
    MatCardContent,
    MatCardTitle,
    MatDivider,
    MatIcon,
    MatIconButton,
    NgOptimizedImage,
  ],
  templateUrl: './card-developer.component.html',
  styleUrl: './card-developer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardDeveloperComponent {
  public readonly developer = input.required<DeveloperInfo>();
  public readonly closeDeveloper = output();
}
