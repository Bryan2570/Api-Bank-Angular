import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';

import {MatDialog} from "@angular/material/dialog";
import {AlertService} from "../services/alert.service";

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

  constructor(
    private _alert: AlertService,
    public dialog: MatDialog,
  ) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error) => {
        // Evita manejar errores del API externo ipify
        if (error.url === 'https://api.ipify.org?format=json') {
          return throwError(() => error);
        }

        const message = this.getErrorMessage(error);
        if (message) {
          switch (message.type) {
            case 'error':
              this._alert.error(message.text);
              break;
            case 'warning':
              this._alert.warning(message.text);
              break;
            case 'info':
              this._alert.info(message.text);
              break;
          }
        }

        return throwError(() => error);
      })
    );
  }

  /**
   * Devuelve un mensaje formateado según el tipo de error HTTP
   */
  private getErrorMessage(error: any): { type: 'error' | 'warning' | 'info'; text: string } | null {
    switch (error.status) {
      case 400:
        return {type: 'warning', text: error.error?.message || 'Solicitud inválida.'};

      case 403:
        this.dialog.closeAll();
        return {type: 'warning', text: 'Petición inválida'};

      case 404:
        return {type: 'error', text: error.error?.message || 'Recurso no encontrado.'};

      case 409:
        return {type: 'warning', text: error.error?.message || 'Conflicto en la solicitud.'};

      case 500:
        return {type: 'error', text: error.error?.message || 'Tenemos problemas en el servidor, reintenta más tarde...'};

      case 503:
        return {type: 'error', text: error.error?.message || 'El servicio no está disponible temporalmente. Intenta de nuevo luego.'};

      default:
        return {type: 'error', text: 'Ha ocurrido un error inesperado. Reintenta más tarde.'};
    }
  }
}
