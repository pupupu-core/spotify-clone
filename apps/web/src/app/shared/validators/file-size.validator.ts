import type { AbstractControl, ValidatorFn } from '@angular/forms';
import { BYTES_IN_MEGABYTE } from '~/core/constants/number.constants';

export function fileSizeValidator(maxFileSizeMb: number): ValidatorFn {
  return (control: AbstractControl<File | null>) => {
    const file = control.value;

    if (!file) {
      return null;
    }

    const maxFileSizeBytes = maxFileSizeMb * BYTES_IN_MEGABYTE;

    if (file.size > maxFileSizeBytes) {
      return {
        fileSize: {
          max: maxFileSizeMb,
          actual: file.size / BYTES_IN_MEGABYTE,
        },
      };
    }

    return null;
  };
}
