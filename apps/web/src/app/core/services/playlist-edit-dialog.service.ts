import { inject, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddToPlaylistDialogComponent } from '~/features/playlist/add-to-playlist/components/add-to-playlist-dialog/add-to-playlist-dialog.component';
import type { AlbumUI } from '~/shared/models/album-ui.model';

@Injectable({
  providedIn: 'root',
})
export class PlaylistEditDialogService {
  private readonly dialog = inject(MatDialog);

  public openEditPlaylist(album: AlbumUI): void {
    this.dialog.open(AddToPlaylistDialogComponent, {
      data: album,
      minWidth: 500,
    });
  }
}
