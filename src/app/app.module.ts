import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenubarModule } from 'primeng/menubar';
import { initializeKeycloak } from './init/keycloak-init.factory';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ButtonModule } from 'primeng/button';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { CompanyInterceptor } from './interceptors/company.interceptor';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MenubarModule,
    KeycloakAngularModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ButtonModule,
    OverlayPanelModule,
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService],
    },
    { provide: HTTP_INTERCEPTORS, useClass: CompanyInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
