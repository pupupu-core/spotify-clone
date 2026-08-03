import { inject, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EditPlaylistDialogComponent } from '~/features/playlist/edit/components/edit-playlist-dialog/edit-playlist-dialog.component';

@Injectable({
  providedIn: 'root',
})
export class PlaylistEditDialogService {
  private readonly dialog = inject(MatDialog);

  public openEditPlaylist(playlistId: string): void {
    this.dialog.open(EditPlaylistDialogComponent, {
      data: playlistId,
      minWidth: 670,
      minHeight: 'min-content',
    });
  }
}
