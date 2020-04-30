import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'squareroot'
})
export class SquarerootPipe implements PipeTransform {

  transform(n: number, ...args: unknown[]): number {
    return Math.sqrt(n);
  }
}
