import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { KEYCLOAK_EVENT_SIGNAL } from 'keycloak-angular';
import Keycloak from 'keycloak-js';
import { MessageService } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { PopoverModule } from 'primeng/popover';
import { ToastModule } from 'primeng/toast';

import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [MenubarModule, ToastModule, PopoverModule],
      providers: [
        { provide: MessageService, useValue: {} },
        { provide: Keycloak, useValue: {} },
        provideZonelessChangeDetection(),
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
