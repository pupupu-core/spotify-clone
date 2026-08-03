import { inject, Injectable } from '@angular/core';
import type { TrackUI } from '~/shared/models/track-ui.model';
import { MatDialog } from '@angular/material/dialog';
import { AddToPlaylistDialogComponent } from '~/features/playlist/add-to-playlist/components/add-to-playlist-dialog/add-to-playlist-dialog.component';

@Injectable({
  providedIn: 'root',
})
export class PlaylistsDialogService {
  private readonly dialog = inject(MatDialog);

  public openAddToPlaylist(track: TrackUI): void {
    this.dialog.open(AddToPlaylistDialogComponent, {
      data: track,
      minWidth: 500,
    });
  }
}
