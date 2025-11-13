import { TestBed } from '@angular/core/testing';

import { DynamicComponentService } from './dynamic-component.service';
import { provideZonelessChangeDetection } from '@angular/core';

describe('DynamicComponentService', () => {
  let service: DynamicComponentService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection()]
    });
    service = TestBed.inject(DynamicComponentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
