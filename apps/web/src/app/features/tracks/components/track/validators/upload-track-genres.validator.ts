import type { AbstractControl, ValidatorFn } from '@angular/forms';
import { UPLOAD_TRACK_CONSTRAINTS } from '@streaming-service/config';

export function genresValidator(): ValidatorFn {
  return (control: AbstractControl<string[] | null>) => {
    const genres = control.value ?? [];

    if (genres.length > UPLOAD_TRACK_CONSTRAINTS.genres.maxCount) {
      return { genresTooMany: true };
    }

    if (genres.some(genre => genre.length > UPLOAD_TRACK_CONSTRAINTS.genres.maxLength)) {
      return { genreNameTooLong: true };
    }

    return null;
  };
}
