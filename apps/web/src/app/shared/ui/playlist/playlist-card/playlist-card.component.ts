import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import { DatePipe, NgOptimizedImage, NgTemplateOutlet } from '@angular/common';
import type { AlbumUI } from '~/shared/models/album-ui.model';
import type { AlbumCardMode } from '~/features/tracks/components/track-list/models/mode.model';
import { DurationPipe } from '~/shared/pipes/duration.pipe';
import { PLACEHOLDER_URL_200 } from '~/core/constants/common.constants';

@Component({
  selector: 'ppf-playlist-card',
  imports: [MatIcon, MatIconButton, NgOptimizedImage, DatePipe, DurationPipe, NgTemplateOutlet],
  templateUrl: './playlist-card.component.html',
  styleUrl: './playlist-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlaylistCardComponent {
  protected readonly playlistClick = output<void>();
  public readonly album = input.required<AlbumUI>();
  public readonly mode = input.required<AlbumCardMode>();
  protected readonly PLACEHOLDER_URL_200 = PLACEHOLDER_URL_200;
}
