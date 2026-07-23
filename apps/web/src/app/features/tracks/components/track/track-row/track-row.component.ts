import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import type { TrackUI } from '~/shared/models/track-ui.model';
import { NgOptimizedImage } from '@angular/common';
import { PLACEHOLDER_URL_MD } from '~/core/constants/common.constants';
import { DurationPipe } from '~/shared/pipes/duration.pipe';
import { AbbreviatedNumberPipe } from '~/shared/pipes/abbreviated-number.pipe';

@Component({
  selector: 'ppf-tracks-row',
  imports: [
    MatIcon,
    MatIconButton,
    RouterLink,
    NgOptimizedImage,
    DurationPipe,
    AbbreviatedNumberPipe,
  ],
  templateUrl: './track-row.component.html',
  styleUrl: './track-row.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrackRowComponent {
  public readonly isPlaying = input.required<boolean>();
  public readonly isActive = input<boolean | undefined>(undefined);
  public readonly track = input.required<TrackUI>();
  public readonly selectedForPlaylist = input(false);
  public readonly playlistCreateMode = input(false);
  public readonly playlistEditMode = input(false);
  public readonly playClick = output<void>();
  public readonly addClick = output<void>();
  public readonly removeClick = output<void>();

  protected readonly highlighted = computed(
    () => (this.isActive() ?? false) || this.isPlaying() || this.selectedForPlaylist(),
  );
  protected readonly PLACEHOLDER_URL = PLACEHOLDER_URL_MD;
}
