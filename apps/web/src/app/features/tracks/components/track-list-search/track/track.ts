import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { PpfTrackRowSearchComponent } from '../track-row-search/track-row-search.component';
import { TrackCardComponent } from '../../track/track-card/track-card.component';
import type { TrackDataUI } from '../../../../../core/api/jamendo/models/common.model';

@Component({
  selector: 'ppf-tracks-search',
  imports: [PpfTrackRowSearchComponent, TrackCardComponent],
  templateUrl: './track.html',
  styleUrl: './track.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PpfTrack {
  public readonly track = input.required<TrackDataUI>();
  public readonly view = input.required<'list' | 'card'>();
  public readonly isPlaying = input.required<boolean>();
  public readonly playClick = output<void>();
}
