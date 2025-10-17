import {ApplicationConfig, importProvidersFrom} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {provideAnimations} from "@angular/platform-browser/animations";
import {HttpErrorInterceptor} from "./core/interceptors/http-error.interceptor";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimationsAsync(),
    provideAnimations(),
    importProvidersFrom(
      HttpClientModule
    ),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true
    }
  ]
};
