import type { PipeTransform } from '@angular/core';
import { Pipe } from '@angular/core';

@Pipe({
  name: 'abbreviatedNumber',
})
export class AbbreviatedNumberPipe implements PipeTransform {
  transform(value: number): string {
    const suffixes = ['', 'K', 'M', 'B', 'T', 'Q', 'Qa'];
    const length = value.toString().length;
    let group = Math.floor((length - 1) / 3);
    const divider = Math.pow(1000, group);
    let roundedResult = Number((value / divider).toFixed(1));

    if (roundedResult === 1000) {
      roundedResult = 1;
      group += 1;
    }

    const resultString = roundedResult.toString().replace(/\.0$/, '');

    return `${resultString}${suffixes[group] ?? ''}`;
  }
}
