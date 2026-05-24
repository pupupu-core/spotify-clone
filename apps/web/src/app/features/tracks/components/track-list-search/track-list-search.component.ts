import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import type { TrackDataUI } from '../../../../core/api/jamendo/models/common.model';
import type { TrackListMode } from '../track-list/models/mode.model';
import { TrackService } from '../../services/track.mock.service';
import { PpfTrack } from './track/track';

@Component({
  selector: 'ppf-tracks-list-search',
  imports: [PpfTrack],
  templateUrl: './track-list-search.component.html',
  styleUrl: './track-list-search.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PpfTrackListSearchComponent {
  public readonly title = input<string>('Tracks');
  public readonly trackList = input.required<TrackDataUI[]>();
  public readonly mode = input<TrackListMode>('list');
  private readonly trackService = inject(TrackService);
  public readonly currentTrack = this.trackService.track;
  public readonly tracks = this.trackService.trackList;
}
