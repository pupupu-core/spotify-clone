import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { TrackRowComponent } from './track-row/track-row.component';
import { TrackCardComponent } from './track-card/track-card.component';
import type { TrackDataUI } from '../../../../core/api/jamendo/models/common.model';

@Component({
  selector: 'ppf-tracks',
  imports: [TrackRowComponent, TrackCardComponent],
  templateUrl: './track.html',
  styleUrl: './track.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Track {
  public readonly track = input.required<TrackDataUI>();
  public readonly view = input.required<'list' | 'card'>();
  public readonly isPlaying = input.required<boolean>();
  public readonly playClick = output<void>();
}
