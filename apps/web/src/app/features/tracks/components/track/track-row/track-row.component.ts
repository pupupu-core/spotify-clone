import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import { DurationPipe } from '../../../../../shared/pipes/duration.pipe';
import { AbbreviatedNumberPipe } from '../../../../../shared/pipes/abbreviated-number.pipe';
import type { TrackDataUI } from '../../../../../core/api/jamendo/models/common.model';

@Component({
  selector: 'ppf-tracks-row',
  imports: [MatIcon, MatIconButton, DurationPipe, AbbreviatedNumberPipe],
  templateUrl: './track-row.component.html',
  styleUrl: './track-row.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrackRowComponent {
  public readonly isPlaying = input.required<boolean>();
  public readonly track = input.required<TrackDataUI>();
  public readonly playClick = output<void>();
}
