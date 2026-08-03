import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatDialogActions, MatDialogClose, MatDialogContent } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { TrackListComponent } from '~/features/tracks/components/track-list/track-list.component';
import { MatIconButton } from '@angular/material/button';

@Component({
  selector: 'ppf-edit-playlist-dialog',
  imports: [
    MatDialogContent,
    MatDialogActions,
    MatIcon,
    TrackListComponent,
    MatIconButton,
    MatDialogClose,
  ],
  templateUrl: './edit-playlist-dialog.component.html',
  styleUrl: './edit-playlist-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditPlaylistDialogComponent {}
