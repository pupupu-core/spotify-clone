import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatDialogActions, MatDialogClose } from '@angular/material/dialog';
import { PlaylistCreateDialogService } from '~/core/services/playlist-create-dialog.service';

@Component({
  selector: 'ppf-add-to-playlist-dialog',
  imports: [MatButton, MatDialogActions, MatDialogClose],
  templateUrl: './add-to-playlist-dialog.component.html',
  styleUrl: './add-to-playlist-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddToPlaylistDialogComponent {
  private readonly playlistDialog = inject(PlaylistCreateDialogService);

  protected openCreatePlaylistDialog(): void {
    this.playlistDialog.openCreatePlaylist();
  }
}
