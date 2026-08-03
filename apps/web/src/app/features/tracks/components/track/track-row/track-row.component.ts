import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import type { TrackUI } from '~/shared/models/track-ui.model';
import { DatePipe, NgOptimizedImage } from '@angular/common';
import { PLACEHOLDER_URL_MD } from '~/core/constants/common.constants';
import { DurationPipe } from '~/shared/pipes/duration.pipe';
import { AbbreviatedNumberPipe } from '~/shared/pipes/abbreviated-number.pipe';
import { MatTooltip } from '@angular/material/tooltip';

@Component({
  selector: 'ppf-tracks-row',
  imports: [
    MatIcon,
    MatIconButton,
    RouterLink,
    NgOptimizedImage,
    DatePipe,
    DurationPipe,
    AbbreviatedNumberPipe,
    MatTooltip,
  ],
  templateUrl: './track-row.component.html',
  styleUrl: './track-row.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrackRowComponent {
  public readonly isPlaying = input.required<boolean>();
  public readonly isActive = input<boolean | undefined>(undefined);
  protected readonly isRecentlyPlayed = computed(() => Boolean(this.track().lastPlayedAt));
  public readonly track = input.required<TrackUI>();
  public readonly playClick = output<void>();

  protected readonly highlighted = computed(() => this.isActive() ?? this.isPlaying());
  protected readonly PLACEHOLDER_URL = PLACEHOLDER_URL_MD;
}
