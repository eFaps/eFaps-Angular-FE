import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { MessageService } from 'primeng/api';

import { ErrorInterceptor } from './error.interceptor';

describe('ErrorInterceptor', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        ErrorInterceptor,
        MessageService,
        provideZonelessChangeDetection(),
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
      ],
    }),
  );

  it('should be created', () => {
    const interceptor: ErrorInterceptor = TestBed.inject(ErrorInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
