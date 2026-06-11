import { ChangeDetectionStrategy, Component, output } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'ppf-playlist-card',
  imports: [MatIcon, MatIconButton, NgOptimizedImage],
  templateUrl: './playlist-card.component.html',
  styleUrl: './playlist-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlaylistCardComponent {
  protected readonly playlistClick = output<void>();
}
