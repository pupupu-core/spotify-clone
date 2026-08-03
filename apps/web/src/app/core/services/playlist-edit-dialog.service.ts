import { inject, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EditPlaylistDialogComponent } from '~/features/playlist/edit/components/edit-playlist-dialog/edit-playlist-dialog.component';
import { MyUploadDialogComponent } from '~/features/playlist/my-uploads/components/my-upload-dialog/my-upload-dialog.component';

@Injectable({
  providedIn: 'root',
})
export class PlaylistEditDialogService {
  private readonly dialog = inject(MatDialog);

  public openEditPlaylist(playlistId: string): void {
    if (playlistId === 'my-uploads') {
      this.dialog.open(MyUploadDialogComponent, {
        data: {
          name: 'My uploads',
          description: 'Tracks you have uploaded to Pupufy.',
        },
        minWidth: 670,
        minHeight: 'min-content',
      });

      return;
    }

    this.dialog.open(EditPlaylistDialogComponent, {
      data: playlistId,
      minWidth: 670,
      minHeight: 'min-content',
    });
  }
}
