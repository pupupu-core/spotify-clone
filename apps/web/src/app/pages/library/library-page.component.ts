import type { OnInit } from '@angular/core';
import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { TrackListComponent } from '~/features/tracks/components/track-list/track-list.component';
import { MatFabButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { PlaylistShelfComponent } from '~/shared/ui/playlist/components/playlist-shelf/playlist-shelf.component';
import { MatDialog } from '@angular/material/dialog';
import { CreatePlaylistDialogComponent } from '~/features/playlist/create/components/create-playlist-dialog/create-playlist-dialog.component';
import { UserStore } from '~/core/stores/user/user.store';
import type { TrackUI } from '~/shared/models/track-ui.model';

@Component({
  selector: 'ppf-library-page',
  imports: [TrackListComponent, MatFabButton, MatIcon, PlaylistShelfComponent],
  templateUrl: './library-page.component.html',
  styleUrl: './library-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LibraryPageComponent implements OnInit {
  private readonly dialog = inject(MatDialog);
  protected readonly store = inject(UserStore);

  protected readonly recentlyPlayedSortDirection = signal<'asc' | 'desc'>('desc');

  protected readonly recentlyPlayedTracks = computed(() => {
    const direction = this.recentlyPlayedSortDirection() === 'asc' ? 1 : -1;

    return [...this.store.recentlyPlayed()].sort(
      (first, second) => (this.getPlayedAtTime(first) - this.getPlayedAtTime(second)) * direction,
    );
  });

  public openPlaylistForm(): void {
    this.dialog.open(CreatePlaylistDialogComponent, {
      minWidth: 670,
      minHeight: 'min-content',
    });
  }

  public ngOnInit(): void {
    this.store.loadUserProfile();
    this.store.loadRecentlyPlayed();
  }

  protected sortRecentlyPlayed(direction: 'asc' | 'desc'): void {
    this.recentlyPlayedSortDirection.set(direction);
  }

  private getPlayedAtTime(track: TrackUI): number {
    if (track.lastPlayedAt === undefined || track.lastPlayedAt.length === 0) {
      return 0;
    }

    const parsedDate = Date.parse(track.lastPlayedAt);

    return Number.isNaN(parsedDate) ? 0 : parsedDate;
  }
}
