import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import { DurationPipe } from '../../../../../shared/pipes/duration.pipe';
import { AbbreviatedNumberPipe } from '../../../../../shared/pipes/abbreviated-number.pipe';
import type { TrackResponse } from '@streaming-service/model';

@Component({
  selector: 'ppf-tracks-card',
  imports: [MatIcon, MatIconButton, DurationPipe, AbbreviatedNumberPipe],
  templateUrl: './track-card.component.html',
  styleUrl: './track-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrackCardComponent {
  public readonly isPlaying = input.required<boolean>();
  public readonly track = input.required<TrackResponse>();
  public readonly playClick = output<void>();
}
