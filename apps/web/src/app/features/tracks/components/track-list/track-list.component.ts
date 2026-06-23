import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import type { TrackDataUI } from '../../../../core/api/jamendo/models/common.model';
import type { TrackListMode } from './models/mode.model';
import { Track } from '../track/track';
import { MatIcon } from '@angular/material/icon';
import { MatButton } from '@angular/material/button';
import { PpfPlayerService } from '../../../player/services/track-player.service';

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
  protected readonly player = inject(PpfPlayerService);
  protected readonly trackView = computed(() => (this.mode() === 'grid' ? 'card' : 'list'));

  //todo: later i guess i should refactor it, because currently when you play one track,
  // i pass to the queue all other track, sp playAllClick = playTrackClick
  protected playAllClick(): void {
    this.player.playTracks(this.trackList());
  }

  protected playTrackClick(track: TrackDataUI): void {
    this.player.toggleTrackByID(track, this.trackList());
  }
}
