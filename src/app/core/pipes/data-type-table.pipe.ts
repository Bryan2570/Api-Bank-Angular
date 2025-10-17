import {Inject, LOCALE_ID, Pipe, PipeTransform} from '@angular/core';
import {DatePipe} from '@angular/common';
import {CustomCurrencyPipe} from "./custom-currency.pipe";

@Pipe({
  standalone: true,
  name: 'dataTypeTable'
})
export class DataTypeTablePipe implements PipeTransform {

  constructor(
    private customCurrencyPipe: CustomCurrencyPipe,
    private datePipe: DatePipe,
    @Inject(LOCALE_ID) public locale: string
  ) {
  }

  transform(value: unknown, dataType: string, currency?: string): unknown {
    switch (dataType) {
      case 'text': {
        if (!isValue(value)) return '--';
        return value;
      }
      case 'dateTime': {
        if (!isValue(value)) return 'No aplica';
        const date: Date = new Date(value);
        if (typeof date !== 'object') {
          console.warn('Valor invalido');
          return null;
        }
        return this.datePipe.transform(value, 'dd-MMM-yyyy - hh:mm a', undefined, 'es-EC')
      }
      case 'boolean-to-status': {
        if (value === true) {
          value = "Activo";
        } else {
          value = "Inactivo";
        }
        return value;
      }
      case 'date': {
        if (!isValue(value)) return 'No aplica';

        const date = new Date(value as string);
        if (isNaN(date.getTime())) {
          console.warn('Valor inválido');
          return 'Fecha inválida';
        }
        return this.datePipe.transform(date, 'dd-MMM-yyyy', undefined, 'es-EC');
      }
      case 'date-military': {
        if (!isValue(value)) return 'No aplica';
        const date: Date = new Date(value);
        if (typeof date !== 'object') {
          console.warn('Valor invalido');
          return null;
        }
        return this.datePipe.transform(value, 'dd-MMM-yyyy - H:mm:ss', undefined, 'en-EC');
      }
      case 'currency': {
        if (!(typeof value === 'number')) {
          console.warn('Valor invalido');
          return null;
        }
        return this.customCurrencyPipe.transform(value);
      }
      default: {
        return value;
      }
    }
  }

}

function isValue(value: number | string | null | undefined | unknown): value is number | string {
  return !(value == null || value === '' || value !== value);
}
