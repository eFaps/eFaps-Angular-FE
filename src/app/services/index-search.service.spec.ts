import { TestBed } from '@angular/core/testing';

import { IndexSearchService } from './index-search.service';

describe('IndexSearchService', () => {
  let service: IndexSearchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IndexSearchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
