import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { MatDialogActions, MatDialogClose, MatDialogContent } from '@angular/material/dialog';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatFormField, MatInput, MatLabel, MatSuffix } from '@angular/material/input';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TrackListComponent } from '~/features/tracks/components/track-list/track-list.component';
import { fileSizeValidator } from '~/shared/validators/file-size.validator';
import { fileTypeValidator } from '~/shared/validators/file-type.validator';

const MAX_SIZE_COVER_MB = 3;
const VALID_FILE_TYPE = ['image/jpg', 'image/png', 'image/avif', 'image/webp'];

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
  // TODO: добавить логику создания при появление бэка
  protected readonly coverPreview = signal<string>('');

  public readonly playlistCreateForm = new FormGroup(
    {
      coverFile: new FormControl<null | File>(null, [
        fileSizeValidator(MAX_SIZE_COVER_MB),
        fileTypeValidator(VALID_FILE_TYPE),
      ]),
      playlistName: new FormControl(''),
      playlistDescription: new FormControl(''),
    },
    { updateOn: 'blur' },
  );

  public setCover(event: Event): void {
    const target: HTMLInputElement = event.target as HTMLInputElement;

    const file = target.files?.[0] ?? this.playlistCreateForm.get('coverFile')?.value ?? null;

    this.playlistCreateForm.patchValue({
      coverFile: file,
    });

    if (!file) {
      this.coverPreview.set('');

      return;
    }

    this.coverPreview.set(URL.createObjectURL(file));
  }
}
