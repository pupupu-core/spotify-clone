import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import { NgOptimizedImage } from '@angular/common';
import type { AlbumUI } from '~/shared/models/album-ui.model';

@Component({
  selector: 'ppf-playlist-card',
  imports: [MatIcon, MatIconButton, NgOptimizedImage],
  templateUrl: './playlist-card.component.html',
  styleUrl: './playlist-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlaylistCardComponent {
  protected readonly playlistClick = output<void>();
  public readonly album = input.required<AlbumUI>();
}
