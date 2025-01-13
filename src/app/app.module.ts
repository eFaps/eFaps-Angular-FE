import { registerLocaleData } from '@angular/common';
import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import localeEs from '@angular/common/locales/es';
import { LOCALE_ID, NgModule, inject, provideAppInitializer } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { RouteReuseStrategy } from '@angular/router';
import { WebStorageModule } from '@efaps/ngx-store';
import Material from '@primeng/themes/material';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import { MessageService } from 'primeng/api';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ButtonModule } from 'primeng/button';
import { providePrimeNG } from 'primeng/config';
import { DividerModule } from 'primeng/divider';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { MenubarModule } from 'primeng/menubar';
import { PopoverModule } from 'primeng/popover';
import { ProgressBarModule } from 'primeng/progressbar';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initApp } from './init/app-init.factory';
import { RoutePathReuseStrategy } from './init/route-path-reuse-strategy';
import { CompanyInterceptor } from './interceptors/company.interceptor';
import { ErrorInterceptor } from './interceptors/error.interceptor';
import { LoaderInterceptor } from './interceptors/loader.interceptor';
import { ConfigService } from './services/config.service';
import { UserService } from './services/user.service';
import { ThemeChooserComponent } from './standalone/theme-chooser/theme-chooser.component';

registerLocaleData(localeEs, 'es');

@NgModule({
  declarations: [AppComponent],
  bootstrap: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MenubarModule,
    KeycloakAngularModule,
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
    provideAppInitializer(() => {
        const initializerFn = (initApp)(inject(ConfigService), inject(UserService), inject(KeycloakService));
        return initializerFn();
      }),
    { provide: HTTP_INTERCEPTORS, useClass: CompanyInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: RouteReuseStrategy, useClass: RoutePathReuseStrategy },
    { provide: LOCALE_ID, useValue: 'es' },
    provideHttpClient(withInterceptorsFromDi()),
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: Material,
        options: {
          darkModeSelector: '.dark-mode',
        },
      },
    }),
  ],
})
export class AppModule {}
