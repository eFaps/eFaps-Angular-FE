import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { IndexSearchService } from './index-search.service';
import { provideZonelessChangeDetection } from '@angular/core';

describe('IndexSearchService', () => {
  let service: IndexSearchService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        provideZonelessChangeDetection(),
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
      ],
    });
    service = TestBed.inject(IndexSearchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
