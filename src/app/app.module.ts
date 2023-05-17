import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenubarModule } from 'primeng/menubar';
import { initializeKeycloak } from './init/keycloak-init.factory';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MenubarModule,
    KeycloakAngularModule
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService],
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
