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
import { TrackListComponent } from '~/features/tracks/components/track-list/track-list.component';
import { MatFabButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { PlaylistShelfComponent } from '~/shared/ui/playlist/components/playlist-shelf/playlist-shelf.component';
import { MatDialog } from '@angular/material/dialog';
import { CreatePlaylistDialogComponent } from '~/features/playlist/create/components/create-playlist-dialog/create-playlist-dialog.component';
import { UserStore } from '~/core/stores/user/user.store';
import { UploadTrackDialogComponent } from '~/features/tracks/components/upload-track-dialog/upload-track-dialog.component';
import type { TrackUI } from '~/shared/models/track-ui.model';
import { TrackService } from '~/features/tracks/services/track.service';
import type { AlbumUI } from '~/shared/models/album-ui.model';
import { PlaylistService } from '~/features/playlist/services/playlist.service';

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
  private readonly playlistService = inject(PlaylistService);
  private readonly destroyRef = inject(DestroyRef);

  protected readonly store = inject(UserStore);
  protected readonly uploadedTracks = signal<TrackUI[]>([]);
  protected readonly playlists = signal<AlbumUI[]>([]);

  protected readonly myUploadsVirtualPlaylist = computed<AlbumUI>(() => ({
    id: 'my-uploads',
    name: 'My uploads',
    tracksCount: this.uploadedTracks().length,
    tracks: this.uploadedTracks(),
  }));

  public openPlaylistForm(): void {
    this.dialog.open(CreatePlaylistDialogComponent, {
      minWidth: 670,
      minHeight: 'min-content',
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
    this.loadUploadedTracks();
    this.loadPlaylists();
  }

  private loadUploadedTracks(): void {
    this.trackService
      .fetchMyUploads()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(response => {
        this.uploadedTracks.set(
          response.tracks
            .filter(track => track.audioUrl !== null)
            .map(track => ({
              id: track.id,
              name: track.title,
              artistName: track.artistName ?? 'Unknown artist',
              albumName: track.albumName ?? undefined,
              genres: track.genres,
              audioUrl: track.audioUrl ?? '',
              duration: 0,
              artistId: '',
              imageUrl: '',
              albumImageUrl: '',
              sourse: 'userUpload' as const,
            })),
        );
      });
  }

  private loadPlaylists(): void {
    this.playlistService
      .fetchMyPlaylists()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(response => {
        this.playlists.set(
          response.playlists.map(playlist => ({
            id: playlist.id,
            name: playlist.name,
            imageUrl: playlist.coverUrl ?? undefined,
            tracksCount: playlist.trackCount,
          })),
        );
      });
  }
}
