import type { PipeTransform } from '@angular/core';
import { Pipe } from '@angular/core';

@Pipe({
  name: 'submitButtonText',
})
export class SubmitButtonTextPipe implements PipeTransform {
  transform(value: boolean, text: string): string {
    return value ? 'Loading...' : text;
  }
}
