import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  output,
  signal,
} from '@angular/core';
import type { HeaderControl, TrackListMode, UlMode } from './models/mode.model';
import { Track } from '../track/track';
import { PpfPlayerService } from '../../../player/services/track-player.service';
import type { TrackUI } from '~/shared/models/track-ui.model';
import { MatButton, MatFabButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatSortModule } from '@angular/material/sort';
import type { CdkDragDrop } from '@angular/cdk/drag-drop';
import { CdkDrag, CdkDropList, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'ppf-tracks-list',
  imports: [Track, MatButton, MatIcon, MatSortModule, MatFabButton, CdkDropList, CdkDrag],
  templateUrl: './track-list.component.html',
  styleUrl: './track-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrackListComponent {
  public readonly title = input<string>('Tracks');
  public readonly trackList = input<TrackUI[]>([]);
  public readonly mode = input<TrackListMode>('list');
  public readonly ulMode = input<UlMode>('unnumbered');
  public readonly headerControl = input<HeaderControl>('playAll');
  public readonly playlistCreateMode = input(false);
  public readonly playlistEditMode = input(false);
  protected readonly player = inject(PpfPlayerService);
  protected readonly trackView = computed(() => (this.mode() === 'grid' ? 'card' : 'row'));
  protected readonly sortChange = output<'asc' | 'desc'>();
  protected readonly direction = signal<'asc' | 'desc'>('desc');
  public readonly reorder = output<TrackUI[]>();
  public readonly addClick = output<TrackUI>();

  protected playAllClick(): void {
    this.player.playTracks(this.trackList());
  }

  protected playTrackClick(track: TrackUI): void {
    this.player.toggleTrackByID(track, this.trackList());
  }

  public toggleSort(): void {
    const next = this.direction() === 'asc' ? 'desc' : 'asc';

    this.direction.set(next);
    this.sortChange.emit(next);
  }

  public drop(event: CdkDragDrop<TrackUI[]>): void {
    const tracks = [...this.trackList()];

    moveItemInArray(tracks, event.previousIndex, event.currentIndex);

    this.reorder.emit(tracks);
  }
}
