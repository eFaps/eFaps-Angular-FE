import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { AutoCompleteService } from './auto-complete.service';
import { provideZonelessChangeDetection } from '@angular/core';

describe('AutoCompleteService', () => {
  let service: AutoCompleteService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        provideZonelessChangeDetection(),
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
      ],
    });
    service = TestBed.inject(AutoCompleteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
