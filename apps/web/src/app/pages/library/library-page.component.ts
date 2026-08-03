import type { OnInit } from '@angular/core';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  inject,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatFabButton } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { PlaylistsAddDialogService } from '~/core/services/playlists-add-dialog.service';
import { UserStore } from '~/core/stores/user/user.store';
import { CreatePlaylistDialogComponent } from '~/features/playlist/create/components/create-playlist-dialog/create-playlist-dialog.component';
import { TrackListComponent } from '~/features/tracks/components/track-list/track-list.component';
import { UploadTrackDialogComponent } from '~/features/tracks/components/upload-track-dialog/upload-track-dialog.component';
import { TrackService } from '~/features/tracks/services/track.service';
import type { AlbumUI } from '~/shared/models/album-ui.model';
import type { TrackUI } from '~/shared/models/track-ui.model';
import { PlaylistShelfComponent } from '~/shared/ui/playlist/components/playlist-shelf/playlist-shelf.component';
import { PlaylistEditDialogService } from '~/core/services/playlist-edit-dialog.service';

@Component({
  selector: 'ppf-library-page',
  imports: [TrackListComponent, MatFabButton, MatIcon, PlaylistShelfComponent],
  templateUrl: './library-page.component.html',
  styleUrl: './library-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LibraryPageComponent implements OnInit {
  private readonly dialog = inject(MatDialog);
  private readonly trackService = inject(TrackService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly playlistDialog = inject(PlaylistsAddDialogService);
  private readonly editDialog = inject(PlaylistEditDialogService);

  protected readonly store = inject(UserStore);
  protected readonly uploadedTracks = signal<TrackUI[]>([]);

  protected readonly myUploadsVirtualPlaylist = computed<AlbumUI>(() => ({
    id: 'my-uploads',
    name: 'My uploads',
    tracksCount: this.uploadedTracks().length,
    tracks: this.uploadedTracks(),
  }));

  protected readonly recentlyPlayedSortDirection = signal<'asc' | 'desc'>('desc');

  protected readonly recentlyPlayedTracks = computed(() => {
    const direction = this.recentlyPlayedSortDirection() === 'asc' ? 1 : -1;

    return [...this.store.recentlyPlayed()].sort(
      (first, second) => (this.getPlayedAtTime(first) - this.getPlayedAtTime(second)) * direction,
    );
  });

  protected sortRecentlyPlayed(direction: 'asc' | 'desc'): void {
    this.recentlyPlayedSortDirection.set(direction);
  }

  public openPlaylistForm(): void {
    const dialogRef = this.dialog.open(CreatePlaylistDialogComponent, {
      minWidth: 670,
      minHeight: 'min-content',
    });

    dialogRef.afterClosed().subscribe(created => {
      if (created === true) {
        this.store.loadUserPlaylists();
      }
    });
  }

  public openUploadTrackForm(): void {
    const dialog = this.dialog.open<UploadTrackDialogComponent, void, boolean>(
      UploadTrackDialogComponent,
      {
        minWidth: 670,
        minHeight: 'min-content',
      },
    );

    dialog
      .afterClosed()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(uploaded => {
        if (uploaded === true) {
          this.loadUploadedTracks();
        }
      });
  }

  public ngOnInit(): void {
    this.store.loadUserProfile();
    this.store.loadUserPlaylists();
    this.store.loadRecentlyPlayed();
  }

  private getPlayedAtTime(track: TrackUI): number {
    if (track.lastPlayedAt === undefined || track.lastPlayedAt.length === 0) {
      return 0;
    }

    const parsedDate = Date.parse(track.lastPlayedAt);

    return Number.isNaN(parsedDate) ? 0 : parsedDate;
  }

  protected openAddToPlaylist(track: TrackUI): void {
    this.playlistDialog.openAddToPlaylist(track);
  }

  protected openEditPlaylist(id: string): void {
    this.editDialog.openEditPlaylist(id);
  }
}
