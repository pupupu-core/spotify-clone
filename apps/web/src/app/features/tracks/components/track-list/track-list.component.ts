import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import type { TrackListMode } from './models/mode.model';
import { Track } from '../track/track';
import { MatIcon } from '@angular/material/icon';
import { MatButton } from '@angular/material/button';
import { PpfPlayerService } from '../../../player/services/track-player.service';
import type { TrackUI } from '~/shared/models/track-ui.model';
import type { TrackMode } from '~/features/tracks/components/track/models/track.model';

@Component({
  selector: 'ppf-tracks-list',
  imports: [Track, MatIcon, MatButton],
  templateUrl: './track-list.component.html',
  styleUrl: './track-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrackListComponent {
  public readonly title = input<string>('Tracks');
  public readonly trackList = input.required<TrackUI[]>();
  public readonly mode = input<TrackListMode>('list');
  protected readonly player = inject(PpfPlayerService);
  protected readonly trackView = computed<TrackMode>(() =>
    this.mode() === 'grid' ? 'card' : 'row',
  );

  protected playAllClick(): void {
    this.player.playTracks(this.trackList());
  }

  protected playTrackClick(track: TrackUI): void {
    this.player.toggleTrackByID(track, this.trackList());
  }
}
