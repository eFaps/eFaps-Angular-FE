import { TestBed } from '@angular/core/testing';

import { ValidationService } from './validation.service';
import { provideZonelessChangeDetection } from '@angular/core';

describe('ValidationService', () => {
  let service: ValidationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection()],
    });
    service = TestBed.inject(ValidationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
