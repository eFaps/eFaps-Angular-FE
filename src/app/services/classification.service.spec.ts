import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { ClassificationService } from './classification.service';
import { provideZonelessChangeDetection } from '@angular/core';

describe('ClassificationService', () => {
  let service: ClassificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        provideZonelessChangeDetection(),
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
      ],
    });
    service = TestBed.inject(ClassificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
