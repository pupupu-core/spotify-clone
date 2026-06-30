import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import type { TrackListMode } from './models/mode.model';
import { Track } from '../track/track';
import { PpfPlayerService } from '../../../player/services/track-player.service';
import type { TrackUI } from '~/shared/models/track-ui.model';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'ppf-tracks-list',
  imports: [Track, MatButton, MatIcon],
  templateUrl: './track-list.component.html',
  styleUrl: './track-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrackListComponent {
  public readonly title = input<string>('Tracks');
  public readonly trackList = input.required<TrackUI[]>();
  public readonly mode = input<TrackListMode>('list');
  protected readonly player = inject(PpfPlayerService);
  protected readonly trackView = computed(() => (this.mode() === 'grid' ? 'card' : 'row'));

  protected playAllClick(): void {
    this.player.playTracks(this.trackList());
  }

  protected playTrackClick(track: TrackUI): void {
    this.player.toggleTrackByID(track, this.trackList());
  }
}
