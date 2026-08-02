import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { TrackService } from '../../services/track.service';
import { FormBuilder, Validators } from '@angular/forms';
import { UPLOAD_TRACK_CONSTRAINTS } from '@streaming-service/config';
import { genresValidator } from '../track/validators/upload-track-genres.validator';
import { fileSizeValidator } from '~/shared/validators/file-size.validator';
import { fileTypeValidator } from '~/shared/validators/file-type.validator';

@Component({
  selector: 'ppf-upload-track-dialog',
  imports: [],
  templateUrl: './upload-track-dialog.component.html',
  styleUrl: './upload-track-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UploadTrackDialogComponent {
  private readonly trackService = inject(TrackService);
  private readonly formBuilder = inject(FormBuilder);

  public readonly isLoading = signal(false);
  public readonly error = signal<string | null>(null);

  protected readonly uploadTrackForm = this.formBuilder.nonNullable.group({
    file: [
      Validators.required,
      fileSizeValidator(UPLOAD_TRACK_CONSTRAINTS.limits.maxFileSizeMb),
      fileTypeValidator(UPLOAD_TRACK_CONSTRAINTS.limits.types),
    ],
    title: [
      '',
      Validators.required,
      Validators.minLength(UPLOAD_TRACK_CONSTRAINTS.title.minLength),
      Validators.maxLength(UPLOAD_TRACK_CONSTRAINTS.title.maxLength),
    ],
    artistName: [
      '',
      Validators.required,
      Validators.minLength(UPLOAD_TRACK_CONSTRAINTS.artistName.minLength),
      Validators.maxLength(UPLOAD_TRACK_CONSTRAINTS.artistName.maxLength),
    ],
    albumName: [
      '',
      Validators.minLength(UPLOAD_TRACK_CONSTRAINTS.albumName.minLength),
      Validators.maxLength(UPLOAD_TRACK_CONSTRAINTS.albumName.maxLength),
    ],
    genres: [[] as string[], [genresValidator()]],
  });

  protected submit(): void {
    if (this.isLoading()) {
      return;
    }

    if (this.uploadTrackForm.invalid) {
      return;
    }

    const { albumName, artistName, file, genres, title } = this.uploadTrackForm.getRawValue();

    if (!file) {
      return;
    }

    this.trackService.uploadTrack({
      file,
      title,
      artistName,
      albumName,
      genres,
    });
  }
}
