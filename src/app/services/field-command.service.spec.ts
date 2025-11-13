import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { FieldCommandService } from './field-command.service';
import { provideZonelessChangeDetection } from '@angular/core';

describe('FieldCommandService', () => {
  let service: FieldCommandService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        provideZonelessChangeDetection(),
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
      ],
    });
    service = TestBed.inject(FieldCommandService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
