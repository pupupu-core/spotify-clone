import { inject, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreatePlaylistDialogComponent } from '~/features/playlist/create/components/create-playlist-dialog/create-playlist-dialog.component';
import type { CreatePlaylistDialogData } from '~/features/playlist/models/playlists.models';
import { UserStore } from '~/core/stores/user/user.store';

@Injectable({
  providedIn: 'root',
})
export class PlaylistCreateDialogService {
  private readonly dialog = inject(MatDialog);
  protected readonly store = inject(UserStore);

  public openCreatePlaylist(data?: CreatePlaylistDialogData): void {
    const dialogRef = this.dialog.open(CreatePlaylistDialogComponent, {
      minWidth: 670,
      minHeight: 'min-content',
      data,
    });

    dialogRef.afterClosed().subscribe(created => {
      if (created === true) {
        // TODO добавить в стор метод для создания
        this.store.loadUserPlaylists();
      }
    });
  }
}
