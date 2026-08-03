import type { OnInit } from '@angular/core';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
} from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { TrackListComponent } from '~/features/tracks/components/track-list/track-list.component';
import { MatIconButton } from '@angular/material/button';
import { PlaylistService } from '~/features/playlist/services/playlist.service';
import type { AlbumUI } from '~/shared/models/album-ui.model';
import { mapPlaylistResponseToAlbumUI } from '~/shared/utils/mappers/playlists.mapper';
import { NgOptimizedImage } from '@angular/common';
import { PLACEHOLDER_URL_MD } from '~/core/constants/common.constants';
import { MatFormField, MatInput, MatLabel } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'ppf-edit-playlist-dialog',
  imports: [
    MatDialogActions,
    MatIcon,
    TrackListComponent,
    MatIconButton,
    MatDialogClose,
    NgOptimizedImage,
    MatInput,
    ReactiveFormsModule,
    MatDialogContent,
    MatFormField,
    MatLabel,
  ],
  templateUrl: './edit-playlist-dialog.component.html',
  styleUrl: './edit-playlist-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditPlaylistDialogComponent implements OnInit {
  private readonly playlistId = inject<string>(MAT_DIALOG_DATA);
  private readonly playlistService = inject(PlaylistService);

  protected readonly playlistDetail = signal<AlbumUI | undefined>(undefined);

  public ngOnInit(): void {
    if (this.playlistId) {
      this.playlistService.fetchPlaylist(this.playlistId).subscribe(response => {
        this.playlistDetail.set(mapPlaylistResponseToAlbumUI(response));
      });
    }
  }

  protected readonly PLACEHOLDER_URL_MD = PLACEHOLDER_URL_MD;
}
