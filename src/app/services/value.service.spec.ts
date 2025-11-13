import { TestBed } from '@angular/core/testing';

import { ValueService } from './value.service';
import { provideZonelessChangeDetection } from '@angular/core';

describe('ValueService', () => {
  let service: ValueService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers:[provideZonelessChangeDetection(),]
    });
    service = TestBed.inject(ValueService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
