import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  output,
  signal,
} from '@angular/core';
import type { SortMode, TrackListMode, UlMode } from './models/mode.model';
import { Track } from '../track/track';
import { PpfPlayerService } from '../../../player/services/track-player.service';
import type { TrackUI } from '~/shared/models/track-ui.model';
import { MatButton, MatFabButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { NgTemplateOutlet } from '@angular/common';
import { MatSortModule } from '@angular/material/sort';

@Component({
  selector: 'ppf-tracks-list',
  imports: [Track, MatButton, MatIcon, NgTemplateOutlet, MatSortModule, MatFabButton],
  templateUrl: './track-list.component.html',
  styleUrl: './track-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrackListComponent {
  public readonly title = input<string>('Tracks');
  public readonly trackList = input.required<TrackUI[]>();
  public readonly mode = input<TrackListMode>('list');
  public readonly ulMode = input.required<UlMode>();
  public readonly sortMode = input<SortMode>();
  protected readonly player = inject(PpfPlayerService);
  protected readonly trackView = computed(() => (this.mode() === 'grid' ? 'card' : 'row'));
  protected readonly sortChange = output<'asc' | 'desc'>();
  protected readonly direction = signal<'asc' | 'desc'>('desc');

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
}
