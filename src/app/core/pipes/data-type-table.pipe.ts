import {ElementRef, Inject, LOCALE_ID, Pipe, PipeTransform, Renderer2} from '@angular/core';
import {DatePipe} from '@angular/common';
import {CustomCurrencyPipe} from "./custom-currency.pipe";

@Pipe({
  standalone: true,
  name: 'dataTypeTable'
})
export class DataTypeTablePipe implements PipeTransform {

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
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
      case 'payments': {
        if (!isValue(value) || value == 0) return 'No aplica';
        return value;
      }
      case 'status': {
        if (typeof value !== "boolean") {
          console.warn('Valor invalido');
          return null;
        }
        this.addStatusString(value);
        return value;
      }
      case 'statusName': {
        this.renderer.addClass(this.el.nativeElement.parentElement, 'dataTypeTable');
        if (typeof value !== 'string') {
          console.warn('Valor invalido');
          return null;
        }
        return value.split('-')[0];
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
          this.addClass('approved');
        }else {
          value = "Inactivo";
          this.addClass('boolean-inactive');
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
      case 'requestType': {
        if (!(typeof value === 'boolean')) {
          console.warn('Valor invalido');
          return null;
        }
        return value ? 'Multiple' : 'Único';
      }
      case 'currency': {
        if (!(typeof value === 'number')) {
          console.warn('Valor invalido');
          return null;
        }
        return this.customCurrencyPipe.transform(value);
      }
      case 'textLogoFranchise': {
        if (!isValue(value)) {
          this.renderer.addClass(this.el.nativeElement.parentElement, 'dataTypeFranchiseClear');
          return this.renderer.setProperty(this.el.nativeElement.parentElement, 'innerHTML', `<div><span>----</span></div><div><span>----</span></div><div><span>----</span></div>`);
        }
        let split: string[] = [];
        if (typeof value === 'string') {
          split = value.split(' -- ');
          this.renderer.addClass(this.el.nativeElement.parentElement, 'dataTypeFranchise');
          this.renderer.setProperty(this.el.nativeElement.parentElement, 'innerHTML', `${split[0]} <div class="${split[2]} table-franchise"><img src="${split[1]}" alt="CarType"></div>`)
          return split[0];
        }
        return null;
      }
      case 'specialCharacter': {
        if (!isValue(value)) return 'No aplica';
        if (typeof value === 'string') {
          return value.replaceAll(/&#126;/g, '~')
            .replaceAll(/&#125;/g, '}')
            .replaceAll(/&#123;/g, '{')
            .replaceAll(/&#93;/g, ']')
            .replaceAll(/&#91;/g, '[')
            .replaceAll(/&#64;/g, '@')
            .replaceAll(/&#63;/g, '?')
            .replaceAll(/&#61;/g, '=')
            .replaceAll(/&#43;/g, '+')
            .replaceAll(/&#42;/g, '*')
            .replaceAll(/&#36;/g, '$')
            .replaceAll(/&#37;/g, '%')
            .replaceAll(/&#47;/g, '/')
            .replaceAll(/&#59;/g, ';')
            .replaceAll(/&#45;/g, '-')
            .replaceAll(/&#39;/g, "'")
            .replaceAll(/&quot;/g, '"')
            .replaceAll(/&gt;/g, '>')
            .replaceAll(/&lt;/g, '<')
            .replaceAll(/&amp;/g, '&')
        }
        return null;
      }
      default: {
        return value;
      }
    }
  }

  addStatusString(value: boolean): void {
    if (value) {
      this.addClass('boolean-active');
    } else {
      this.addClass('boolean-inactive');
    }
  }

  addClass(status: string): void {
    this.renderer.addClass(this.el.nativeElement.parentElement, status);
  }

}

function isValue(value: number | string | null | undefined | unknown): value is number | string {
  return !(value == null || value === '' || value !== value);
}
