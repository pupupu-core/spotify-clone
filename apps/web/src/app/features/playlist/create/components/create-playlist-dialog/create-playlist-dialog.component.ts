import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { MatDialogActions, MatDialogClose, MatDialogContent } from '@angular/material/dialog';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatFormField, MatInput, MatLabel, MatSuffix } from '@angular/material/input';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TrackListComponent } from '~/features/tracks/components/track-list/track-list.component';

@Component({
  selector: 'ppf-create-playlist-dialog',
  imports: [
    MatDialogContent,
    MatIconButton,
    MatIcon,
    MatFormField,
    MatLabel,
    MatInput,
    MatSuffix,
    ReactiveFormsModule,
    MatDialogActions,
    TrackListComponent,
    MatButton,
    MatDialogClose,
  ],
  templateUrl: './create-playlist-dialog.component.html',
  styleUrl: './create-playlist-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreatePlaylistDialogComponent {
  protected readonly mockCoverPreview = signal<boolean>(false);
  public file?: File;

  public readonly playlistCreateForm = new FormGroup({
    coverFile: new FormControl([null]),
    playlistName: new FormControl(''),
    playlistDescription: new FormControl(''),
  });

  public setCover(eventOrFile: File | Event): void {
    if (eventOrFile instanceof Event) {
      const target: HTMLInputElement = eventOrFile.target as HTMLInputElement;

      if (target.files) {
        this.file = target.files[0];
      }
    } else {
      this.file = eventOrFile;
    }
  }
}
