import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'getterProperty',
  standalone: true
})
export class GetterPropertyPipe implements PipeTransform {

  transform(object: any, keyName: string, ...args: unknown[]): unknown {
    return object[keyName];
  }

}
