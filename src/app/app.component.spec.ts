import { AppComponent } from './app.component';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { KEYCLOAK_EVENT_SIGNAL, KeycloakService } from 'keycloak-angular';
import Keycloak from 'keycloak-js';
import { MessageService } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { ToastModule } from 'primeng/toast';

describe('AppComponent', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [
        RouterTestingModule,
        MenubarModule,
        ToastModule,
        OverlayPanelModule,
      ],
      providers: [
        { provide: MessageService, useValue: {} },
        { provide: KeycloakService, useValue: {} },
        { provide: Keycloak, useValue: {} },
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
        { provide: KEYCLOAK_EVENT_SIGNAL, useValue: {} },
      ],
    }),
  );

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'eFaps-Angular-FE'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('eFaps-Angular-FE');
  });
});
