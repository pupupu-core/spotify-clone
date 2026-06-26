import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import { DurationPipe } from '~/shared/pipes/duration.pipe';
import { AbbreviatedNumberPipe } from '~/shared/pipes/abbreviated-number.pipe';
import { RouterLink } from '@angular/router';
import type { TrackUI } from '~/shared/models/track-ui.model';

@Component({
  selector: 'ppf-tracks-row',
  imports: [MatIcon, MatIconButton, DurationPipe, AbbreviatedNumberPipe, RouterLink],
  templateUrl: './track-row.component.html',
  styleUrl: './track-row.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrackRowComponent {
  public readonly isPlaying = input.required<boolean>();
  public readonly isActive = input<boolean | undefined>(undefined);
  public readonly track = input.required<TrackUI>();
  public readonly playClick = output<void>();

  protected readonly highlighted = computed(() => this.isActive() ?? this.isPlaying());
}
