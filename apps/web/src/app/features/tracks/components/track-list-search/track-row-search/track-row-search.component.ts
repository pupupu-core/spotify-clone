import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import { DurationPipe } from '../../../../../shared/pipes/duration.pipe';
import { AbbreviatedNumberPipe } from '../../../../../shared/pipes/abbreviated-number.pipe';
import type { TrackDataUI } from '../../../../../core/api/jamendo/models/common.model';

@Component({
  selector: 'ppf-tracks-row-search',
  imports: [MatIcon, MatIconButton, DurationPipe, AbbreviatedNumberPipe],
  templateUrl: './track-row-search.component.html',
  styleUrl: './track-row-search.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PpfTrackRowSearchComponent {
  public readonly isPlaying = input.required<boolean>();
  public readonly track = input.required<TrackDataUI>();
  public readonly playClick = output<void>();
}
