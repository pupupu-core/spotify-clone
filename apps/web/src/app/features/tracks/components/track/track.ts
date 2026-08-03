import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { TrackRowComponent } from './track-row/track-row.component';
import { TrackCardComponent } from './track-card/track-card.component';
import type { TrackUI } from '~/shared/models/track-ui.model';
import type { TrackMode } from '~/features/tracks/components/track/models/track.model';

@Component({
  selector: 'ppf-tracks',
  imports: [TrackRowComponent, TrackCardComponent],
  templateUrl: './track.html',
  styleUrl: './track.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Track {
  public readonly track = input.required<TrackUI>();
  public readonly view = input.required<TrackMode>();
  public readonly isPlaying = input.required<boolean>();
  public readonly selectedForPlaylist = input(false);
  public readonly playlistCreateMode = input(false);
  public readonly playlistEditMode = input(false);
  public readonly playClick = output<void>();
  public readonly addClick = output<TrackUI>();
  public readonly removeClick = output<void>();
}
