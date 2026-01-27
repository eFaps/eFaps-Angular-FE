import { registerLocaleData } from '@angular/common';
import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withInterceptors,
  withInterceptorsFromDi,
} from '@angular/common/http';
import localeEs from '@angular/common/locales/es';
import {
  ApplicationConfig,
  LOCALE_ID,
  provideZonelessChangeDetection,
} from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter, RouteReuseStrategy } from '@angular/router';
import Material from '@primeuix/themes/material';
import {
  INCLUDE_BEARER_TOKEN_INTERCEPTOR_CONFIG,
  includeBearerTokenInterceptor,
  provideKeycloak,
} from 'keycloak-angular';
import { NGX_LOCAL_STORAGE_CONFIG } from 'ngx-localstorage';
import { ConfirmationService, MessageService } from 'primeng/api';
import { providePrimeNG } from 'primeng/config';
import { DialogService } from 'primeng/dynamicdialog';

import { environment } from 'src/environments/environment';
import { routes } from './app-routes';
import { RoutePathReuseStrategy } from './init/route-path-reuse-strategy';
import { CompanyInterceptor } from './interceptors/company.interceptor';
import { ErrorInterceptor } from './interceptors/error.interceptor';
import { LoaderInterceptor } from './interceptors/loader.interceptor';

registerLocaleData(localeEs, 'es');

export const appConfig: ApplicationConfig = {
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: CompanyInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: RouteReuseStrategy, useClass: RoutePathReuseStrategy },
    {
      provide: NGX_LOCAL_STORAGE_CONFIG,
      useValue: {
        prefix: 'sc',
        delimiter: '_',
      },
    },
    { provide: LOCALE_ID, useValue: 'es' },
    provideHttpClient(
      withInterceptorsFromDi(),
      withInterceptors([includeBearerTokenInterceptor]),
    ),
    provideRouter(routes),
    provideZonelessChangeDetection(),
    provideAnimationsAsync(), // required from PrimeNG
    providePrimeNG({
      theme: {
        preset: Material,
        options: {
          darkModeSelector: '.dark-mode',
        },
      },
    }),
    MessageService,
    DialogService,
    ConfirmationService,
    provideKeycloak({
      config: {
        url: environment.sso.url,
        realm: environment.sso.realm,
        clientId: environment.sso.clientId,
      },
      initOptions: {
        onLoad: 'login-required',
        enableLogging: true,
      },
    }),
    {
      provide: INCLUDE_BEARER_TOKEN_INTERCEPTOR_CONFIG,
      useValue: [
        {
          urlPattern: /^http[s]*:\/\/.*\/api\/.*$/,
        },
      ],
    },
  ],
};
