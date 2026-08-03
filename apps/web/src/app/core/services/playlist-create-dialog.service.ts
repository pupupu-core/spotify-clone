import { inject, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreatePlaylistDialogComponent } from '~/features/playlist/create/components/create-playlist-dialog/create-playlist-dialog.component';

@Injectable({
  providedIn: 'root',
})
export class PlaylistCreateDialogService {
  private readonly dialog = inject(MatDialog);

  public openCreatePlaylist(): void {
    this.dialog.open(CreatePlaylistDialogComponent, {
      minWidth: 670,
      minHeight: 'min-content',
    });
  }
}
