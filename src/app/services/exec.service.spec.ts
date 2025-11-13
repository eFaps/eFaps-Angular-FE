import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { ExecService } from './exec.service';
import { provideZonelessChangeDetection } from '@angular/core';

describe('ExecService', () => {
  let service: ExecService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        provideZonelessChangeDetection(),
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
      ],
    });
    service = TestBed.inject(ExecService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
