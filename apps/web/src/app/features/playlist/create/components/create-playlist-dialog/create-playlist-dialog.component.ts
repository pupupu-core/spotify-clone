import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { MatDialogActions, MatDialogClose, MatDialogContent } from '@angular/material/dialog';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatFormField, MatInput, MatLabel, MatSuffix } from '@angular/material/input';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TrackListComponent } from '~/features/tracks/components/track-list/track-list.component';
import { fileSizeValidator } from '~/shared/validators/file-size.validator';
import { fileTypeValidator } from '~/shared/validators/file-type.validator';
import { startWith } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

const MAX_SIZE_COVER_MB = 3;
const VALID_FILE_TYPE = ['image/jpg', 'image/png', 'image/avif', 'image/webp', 'image/jpeg'];

interface CoverErrors {
  fileSizeError: {
    errorType: 'fileSize';
    max: number;
    actual: number | null;
  };
  fileTypeError: {
    errorType: 'fileTypes';
    validTypes: string;
    actualType: string | null;
  };
}

interface FileSizeValidationError {
  max: number;
  actual: number;
}

interface FileTypeValidationError {
  validTypes: string[];
  actualType: string | null;
}

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

  private readonly coverControl = this.playlistCreateForm.controls['coverFile'];
  public readonly coverFileStatus = toSignal(
    this.playlistCreateForm.statusChanges.pipe(startWith(this.coverControl.status)),
  );
  protected readonly coverError = computed<CoverErrors>(() => {
    this.coverFileStatus();
    let coverErrors: CoverErrors = {
      fileTypeError: {
        errorType: 'fileTypes',
        validTypes: VALID_FILE_TYPE.map(type => type.replace('image/', '.')).join(', '),
        actualType: null,
      },
      fileSizeError: {
        errorType: 'fileSize',
        max: MAX_SIZE_COVER_MB,
        actual: null,
      },
    };

    if (this.coverControl.hasError('fileSize')) {
      const { max, actual } = this.coverControl.getError('fileSize') as FileSizeValidationError;

      coverErrors = {
        ...coverErrors,
        fileSizeError: {
          errorType: 'fileSize',
          max,
          actual: Number(actual.toFixed(1)),
        },
      };
    }

    if (this.coverControl.hasError('fileTypes')) {
      const { validTypes, actualType } = this.coverControl.getError(
        'fileTypes',
      ) as FileTypeValidationError;

      coverErrors = {
        ...coverErrors,
        fileTypeError: {
          errorType: 'fileTypes',
          validTypes: validTypes.map(type => type.replace('image/', '.')).join(', '),
          actualType: actualType,
        },
      };
    }

    return coverErrors;
  });

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
