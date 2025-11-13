import { TestBed } from '@angular/core/testing';

import { StyleService } from './style.service';
import { provideZonelessChangeDetection } from '@angular/core';

describe('StyleService', () => {
  let service: StyleService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers:[provideZonelessChangeDetection(),]
    });
    service = TestBed.inject(StyleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
