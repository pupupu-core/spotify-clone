import type { PipeTransform } from '@angular/core';
import { Pipe } from '@angular/core';
import { SECONDS_PER_HOURS, SECONDS_PER_MINUTE } from '../../core/constants/number.constants';

@Pipe({
  name: 'duration',
})
export class DurationPipe implements PipeTransform {
  transform(time: string | number, format: 'fullTime' | undefined = undefined): string {
    const timeNumber = Number(time);
    const hours = Math.trunc(timeNumber / SECONDS_PER_HOURS).toString();
    const minutes = Math.trunc(timeNumber / SECONDS_PER_MINUTE)
      .toString()
      .padStart(2, '0');
    const seconds = Math.floor(Math.ceil(timeNumber % SECONDS_PER_MINUTE))
      .toString()
      .padStart(2, '0');

    return format
      ? [
          Number(hours) > 0 ? `${hours}h` : null,
          Number(minutes) > 0 ? `${minutes}min` : null,
          Number(seconds) > 0 ? `${seconds}s` : null,
        ]
          .filter(Boolean)
          .join(' ')
      : `${minutes}:${seconds}`;
  }
}
