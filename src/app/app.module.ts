import { registerLocaleData } from '@angular/common';
import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withInterceptors,
  withInterceptorsFromDi,
} from '@angular/common/http';
import localeEs from '@angular/common/locales/es';
import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { RouteReuseStrategy } from '@angular/router';
import { WebStorageModule } from '@efaps/ngx-store';
import Material from '@primeng/themes/material';
import {
  INCLUDE_BEARER_TOKEN_INTERCEPTOR_CONFIG,
  includeBearerTokenInterceptor,
  provideKeycloak,
} from 'keycloak-angular';
import { MessageService } from 'primeng/api';

import { PopoverModule } from 'primeng/popover';
import { ProgressBarModule } from 'primeng/progressbar';
import { TableModule } from 'primeng/table';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RoutePathReuseStrategy } from './init/route-path-reuse-strategy';
import { CompanyInterceptor } from './interceptors/company.interceptor';
import { ErrorInterceptor } from './interceptors/error.interceptor';
import { LoaderInterceptor } from './interceptors/loader.interceptor';
import { ThemeChooserComponent } from './standalone/theme-chooser/theme-chooser.component';
import { MenubarModule } from 'primeng/menubar';
import { ToastModule } from 'primeng/toast';
import { environment } from 'src/environments/environment';

import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ButtonModule } from 'primeng/button';
import { providePrimeNG } from 'primeng/config';
import { DividerModule } from 'primeng/divider';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';

registerLocaleData(localeEs, 'es');

@NgModule({
  declarations: [AppComponent],
  bootstrap: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MenubarModule,
    BrowserAnimationsModule,
    ButtonModule,
    PopoverModule,
    ProgressBarModule,
    IconFieldModule,
    InputIconModule,
    InputTextModule,
    ToastModule,
    TableModule,
    DividerModule,
    ThemeChooserComponent,
    WebStorageModule,
    BreadcrumbModule,
  ],
  providers: [
    MessageService,
    { provide: HTTP_INTERCEPTORS, useClass: CompanyInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: RouteReuseStrategy, useClass: RoutePathReuseStrategy },
    { provide: LOCALE_ID, useValue: 'es' },
    provideHttpClient(
      withInterceptorsFromDi(),
      withInterceptors([includeBearerTokenInterceptor]),
    ),
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: Material,
        options: {
          darkModeSelector: '.dark-mode',
        },
      },
    }),
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
})
export class AppModule {}
