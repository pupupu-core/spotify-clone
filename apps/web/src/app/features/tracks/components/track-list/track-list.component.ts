import { ChangeDetectionStrategy, Component, inject, input, output } from '@angular/core';
import type { TrackDataUI } from '../../../../core/api/jamendo/models/common.model';
import type { TrackListMode } from './models/mode.model';
import { TrackService } from '../../services/track.mock.service';
import { Track } from '../track/track';
import { MatIcon } from '@angular/material/icon';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'ppf-tracks-list',
  imports: [Track, MatIcon, MatButton],
  templateUrl: './track-list.component.html',
  styleUrl: './track-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrackListComponent {
  public readonly title = input<string>('Tracks');
  public readonly trackList = input.required<TrackDataUI[]>();
  public readonly mode = input<TrackListMode>('list');
  public readonly playAllClick = output<void>();
  private readonly trackService = inject(TrackService);
  public readonly currentTrack = this.trackService.track;
  public readonly tracks = this.trackService.trackList;
}
