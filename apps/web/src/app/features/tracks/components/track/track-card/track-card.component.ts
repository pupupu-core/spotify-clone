import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import { DurationPipe } from '~/shared/pipes/duration.pipe';
import { AbbreviatedNumberPipe } from '~/shared/pipes/abbreviated-number.pipe';
import type { TrackUI } from '~/shared/models/track-ui.model';

@Component({
  selector: 'ppf-tracks-card',
  imports: [MatIcon, MatIconButton, DurationPipe, AbbreviatedNumberPipe],
  templateUrl: './track-card.component.html',
  styleUrl: './track-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrackCardComponent {
  public readonly isPlaying = input.required<boolean>();
  public readonly track = input.required<TrackUI>();
  public readonly playClick = output<void>();
}
