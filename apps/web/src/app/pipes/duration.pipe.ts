import type { PipeTransform } from '@angular/core';
import { Pipe } from '@angular/core';

@Pipe({
  name: 'duration',
})
export class DurationPipe implements PipeTransform {
  transform(time: string | number): string {
    const timeNumber = Number(time);
    const minutes = Math.trunc(timeNumber / 60)
      .toString()
      .padStart(2, '0');
    const seconds = (timeNumber % 60).toString().padStart(2, '0');

    return `${minutes}:${seconds}`;
  }
}
