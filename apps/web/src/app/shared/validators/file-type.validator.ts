import type { AbstractControl, ValidatorFn } from '@angular/forms';

export interface FileSizeError {
  fileTypes: {
    validTypes: string[];
    actualType: string;
  };
}

export function fileTypeValidator(fileTypes: string[]): ValidatorFn {
  return (control: AbstractControl<File | null>): FileSizeError | null => {
    const file = control.value;

    if (!file) {
      return null;
    }

    return fileTypes.includes(file.type)
      ? null
      : {
          fileTypes: {
            validTypes: fileTypes,
            actualType: file.type,
          },
        };
  };
}
