import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatDialogActions } from '@angular/material/dialog';

@Component({
  selector: 'ppf-add-to-playlist-dialog',
  imports: [MatButton, MatDialogActions],
  templateUrl: './add-to-playlist-dialog.component.html',
  styleUrl: './add-to-playlist-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddToPlaylistDialogComponent {}
