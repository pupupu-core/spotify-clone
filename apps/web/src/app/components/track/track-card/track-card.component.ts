import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import type { TrackDataUI } from '../../../models/common.model';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import { DurationPipe } from '../../../pipes/duration.pipe';
import { AbbreviatedNumberPipe } from '../../../pipes/abbreviated-number.pipe';

@Component({
  selector: 'ppf-track-card',
  imports: [MatIcon, MatIconButton, DurationPipe, AbbreviatedNumberPipe],
  templateUrl: './track-card.component.html',
  styleUrl: './track-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrackCardComponent {
  public readonly isPlaying = input.required<boolean>();
  public readonly track = input.required<TrackDataUI>();
  public readonly playClick = output<void>();
}
