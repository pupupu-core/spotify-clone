import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { MatCard, MatCardActions, MatCardContent, MatCardTitle } from '@angular/material/card';
import { MatDivider } from '@angular/material/list';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import type { DeveloperInfo } from '~/pages/about-us/models/developer.model';

interface StackBadges {
  name: string;
  url: string;
}

@Component({
  selector: 'ppf-card-developer',
  imports: [
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
  public readonly githubIconUrl =
    'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg';
  public readonly stackBagdes = computed((): StackBadges[] => {
    return (this.developer().stacks ?? []).map(stack => {
      return {
        name: stack,
        url: `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${stack.toLowerCase()}/${stack.toLowerCase()}-original.svg`,
      };
    });
  });
}
