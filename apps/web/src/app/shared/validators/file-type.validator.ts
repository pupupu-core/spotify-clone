import type { AbstractControl, ValidatorFn } from '@angular/forms';

export function fileTypeValidator(fileTypes: string[]): ValidatorFn {
  return (control: AbstractControl<File | null>) => {
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
