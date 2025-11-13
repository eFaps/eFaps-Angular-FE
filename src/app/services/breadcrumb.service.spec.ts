import { TestBed } from '@angular/core/testing';

import { BreadcrumbService } from './breadcrumb.service';
import { provideZonelessChangeDetection } from '@angular/core';

describe('BreadcrumbService', () => {
  let service: BreadcrumbService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers:[provideZonelessChangeDetection(),]
    });
    service = TestBed.inject(BreadcrumbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
