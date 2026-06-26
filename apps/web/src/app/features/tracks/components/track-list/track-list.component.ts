import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import type { TrackResponse } from '@streaming-service/model';
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
  public readonly trackList = input.required<TrackResponse[]>();
  public readonly mode = input<TrackListMode>('list');
  protected readonly player = inject(PpfPlayerService);
  protected readonly trackView = computed(() => (this.mode() === 'grid' ? 'card' : 'list'));

  protected playAllClick(): void {
    this.player.playTracks(this.trackList());
  }

  protected playTrackClick(track: TrackResponse): void {
    this.player.toggleTrackByID(track, this.trackList());
  }
}
