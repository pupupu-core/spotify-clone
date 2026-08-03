import type { OnInit } from '@angular/core';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatFabButton, MatIconButton } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { PlaylistCreateDialogService } from '~/core/services/playlist-create-dialog.service';
import { MatIcon } from '@angular/material/icon';
import { UserStore } from '~/core/stores/user/user.store';
import { PlaylistShelfComponent } from '~/shared/ui/playlist/components/playlist-shelf/playlist-shelf.component';
import type { TrackUI } from '~/shared/models/track-ui.model';

@Component({
  selector: 'ppf-add-to-playlist-dialog',
  imports: [
    MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    MatIconButton,
    MatIcon,
    MatDialogContent,
    PlaylistShelfComponent,
    MatFabButton,
  ],
  templateUrl: './add-to-playlist-dialog.component.html',
  styleUrl: './add-to-playlist-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddToPlaylistDialogComponent implements OnInit {
  private readonly playlistDialog = inject(PlaylistCreateDialogService);
  protected readonly store = inject(UserStore);
  protected readonly track = inject<TrackUI>(MAT_DIALOG_DATA);

  protected openCreatePlaylistDialog(): void {
    this.playlistDialog.openCreatePlaylist({ track: this.track });
  }

  public ngOnInit(): void {
    this.store.loadUserPlaylists();
  }
}
