import type { PipeTransform } from '@angular/core';
import { Pipe } from '@angular/core';

@Pipe({
  name: 'developerPositions',
})
export class DeveloperPositionsPipe implements PipeTransform {
  transform(index: number): string {
    const classPosition = ['top-first', 'top-second', 'bottom-third', 'bottom-fourth'];

    return classPosition[index] ?? '';
  }
}
