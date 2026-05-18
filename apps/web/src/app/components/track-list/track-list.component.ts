import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import type { TrackDataUI } from '../../models/common.model';
import type { TrackListMode } from './models/mode.model';
import { Track } from '../track/track';
import { TrackService } from '../../services/track/track.mock.service';

@Component({
  selector: 'ppf-track-list',
  imports: [Track],
  templateUrl: './track-list.component.html',
  styleUrl: './track-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrackListComponent {
  private readonly trackService = inject(TrackService);
  public readonly trackList = input.required<TrackDataUI[]>();
  public readonly mode = input<TrackListMode>('list');
  public readonly currentTrack = this.trackService.track;
}
