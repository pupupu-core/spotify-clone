import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { TrackService } from '../../services/track.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { UPLOAD_TRACK_CONSTRAINTS } from '@streaming-service/config';
import { genresValidator } from '../track/validators/upload-track-genres.validator';
import { fileSizeValidator } from '~/shared/validators/file-size.validator';
import { fileTypeValidator } from '~/shared/validators/file-type.validator';
import { MatButton } from '@angular/material/button';
import { MatIconButton } from '@angular/material/button';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatIcon } from '@angular/material/icon';
import { catchError, EMPTY, finalize } from 'rxjs';

@Component({
  selector: 'ppf-upload-track-dialog',
  imports: [
    MatButton,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatError,
    MatFormField,
    MatIcon,
    MatIconButton,
    MatInput,
    MatLabel,
    ReactiveFormsModule,
  ],
  templateUrl: './upload-track-dialog.component.html',
  styleUrl: './upload-track-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UploadTrackDialogComponent {
  private readonly trackService = inject(TrackService);
  private readonly formBuilder = inject(FormBuilder);
  private readonly dialogRef = inject(MatDialogRef<UploadTrackDialogComponent>);

  protected readonly isLoading = signal(false);
  protected readonly error = signal<string | null>(null);

  protected readonly uploadTrackForm = this.formBuilder.group({
    file: this.formBuilder.control<File | null>(null, [
      Validators.required,
      fileSizeValidator(UPLOAD_TRACK_CONSTRAINTS.limits.maxFileSizeMb),
      fileTypeValidator(UPLOAD_TRACK_CONSTRAINTS.limits.types),
    ]),
    title: this.formBuilder.nonNullable.control('', [
      Validators.required,
      Validators.minLength(UPLOAD_TRACK_CONSTRAINTS.title.minLength),
      Validators.maxLength(UPLOAD_TRACK_CONSTRAINTS.title.maxLength),
    ]),
    artistName: this.formBuilder.nonNullable.control('', [
      Validators.required,
      Validators.minLength(UPLOAD_TRACK_CONSTRAINTS.artistName.minLength),
      Validators.maxLength(UPLOAD_TRACK_CONSTRAINTS.artistName.maxLength),
    ]),
    albumName: this.formBuilder.nonNullable.control('', [
      Validators.minLength(UPLOAD_TRACK_CONSTRAINTS.albumName.minLength),
      Validators.maxLength(UPLOAD_TRACK_CONSTRAINTS.albumName.maxLength),
    ]),
    genres: this.formBuilder.nonNullable.control<string[]>([], [genresValidator()]),
  });

  protected setFile(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.item(0) ?? null;

    this.uploadTrackForm.controls.file.setValue(file);
    this.uploadTrackForm.controls.file.markAsTouched();
  }

  protected setGenres(value: string): void {
    const genres = value
      .split(/[,\s]+/)
      .map(genre => genre.trim())
      .filter(Boolean);

    this.uploadTrackForm.controls.genres.setValue(genres);
    this.uploadTrackForm.controls.genres.markAsTouched();
  }

  protected submit(): void {
    if (this.isLoading()) {
      return;
    }

    const { albumName, artistName, title } = this.uploadTrackForm.getRawValue();

    this.uploadTrackForm.patchValue({
      title: title.trim(),
      artistName: artistName.trim(),
      albumName: albumName.trim(),
    });

    if (this.uploadTrackForm.invalid) {
      this.uploadTrackForm.markAllAsTouched();

      return;
    }

    const values = this.uploadTrackForm.getRawValue();

    if (!values.file) {
      return;
    }

    this.trackService
      .uploadTrack({
        file: values.file,
        title: values.title,
        artistName: values.artistName,
        albumName: values.albumName,
        genres: values.genres,
      })
      .pipe(
        catchError(error => {
          this.error.set(error.message);

          return EMPTY;
        }),
        finalize(() => this.isLoading.set(false)),
      )
      .subscribe(() => this.dialogRef.close());
  }
}
