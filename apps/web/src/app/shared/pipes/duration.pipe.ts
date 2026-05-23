import type { PipeTransform } from '@angular/core';
import { Pipe } from '@angular/core';
import { SECONDS_PER_MINUTE } from '../../core/constants/number.constants';

@Pipe({
  name: 'duration',
})
export class DurationPipe implements PipeTransform {
  transform(time: string | number): string {
    const timeNumber = Number(time);
    const minutes = Math.trunc(timeNumber / SECONDS_PER_MINUTE)
      .toString()
      .padStart(2, '0');
    const seconds = (timeNumber % SECONDS_PER_MINUTE).toString().padStart(2, '0');

    return `${minutes}:${seconds}`;
  }
}
