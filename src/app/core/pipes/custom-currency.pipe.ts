import {Inject, LOCALE_ID, Pipe, PipeTransform} from '@angular/core';
import {getLocaleCurrencyCode} from '@angular/common';

@Pipe({
  standalone: true,
  name: 'customCurrency'
})
export class CustomCurrencyPipe implements PipeTransform {

  constructor(
    @Inject(LOCALE_ID) public locale: string
  ) {
  }

  transform(value?: number, currency?: string, ...args: unknown[]): unknown {
    if (!isValue(value)) return null;

    const localeCurrencyCode: string | null = getLocaleCurrencyCode(this.locale);
    let currencyCode: string = (typeof localeCurrencyCode === 'string') ? localeCurrencyCode : 'USD';

    if (currency) {
      currencyCode = currency;
    }
    if (!value) {
      return currencyCode + ' 0.00';
    }
    const countDots = value.toString().split('.').length - 1;
    if (countDots > 1) {
      return ''; // Resetear el campo
    }
    let dollarUS = Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currencyCode
    });
    return dollarUS.format(value).replaceAll(currencyCode == 'USD' ? '$' : 'BOB', currencyCode + (currencyCode == 'USD' ? ' ' : ''))
  }
}

function isValue(value: unknown) {
  return !(value == null || value === '' || value !== value);
}
