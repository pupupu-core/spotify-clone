import type { PipeTransform } from '@angular/core';
import { Pipe } from '@angular/core';
import { THOUSAND } from '../shared/constants';

const DIGITS_PER_GROUP = 3;

@Pipe({
  name: 'abbreviatedNumber',
})
export class AbbreviatedNumberPipe implements PipeTransform {
  transform(value: number): string {
    const suffixes = ['', 'K', 'M', 'B', 'T', 'Q', 'Qa'];
    const length = value.toString().length;
    let group = Math.floor((length - 1) / DIGITS_PER_GROUP);
    const divider = Math.pow(THOUSAND, group);
    let roundedResult = Number((value / divider).toFixed(1));

    if (roundedResult === THOUSAND) {
      roundedResult = 1;
      group += 1;
    }

    const resultString = roundedResult.toString().replace(/\.0$/, '');

    return `${resultString}${suffixes[group] ?? ''}`;
  }
}
