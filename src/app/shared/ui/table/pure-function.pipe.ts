import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pureFunction',
  standalone: true,
})
export class PureFunctionPipe<T, R> implements PipeTransform {
  transform(handler: (args: T) => R, args: T): R {
    return handler(args);
  }
}
