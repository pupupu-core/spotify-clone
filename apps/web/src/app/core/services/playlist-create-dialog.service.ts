import { inject, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreatePlaylistDialogComponent } from '~/features/playlist/create/components/create-playlist-dialog/create-playlist-dialog.component';
import type { CreatePlaylistDialogData } from '~/features/playlist/models/playlists.models';

@Injectable({
  providedIn: 'root',
})
export class PlaylistCreateDialogService {
  private readonly dialog = inject(MatDialog);

  public openCreatePlaylist(data?: CreatePlaylistDialogData): void {
    this.dialog.open(CreatePlaylistDialogComponent, {
      minWidth: 670,
      minHeight: 'min-content',
      data,
    });
  }
}
