import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { CompanyInterceptor } from './company.interceptor';

describe('CompanyInterceptor', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CompanyInterceptor],
    })
  );

  it('should be created', () => {
    const interceptor: CompanyInterceptor = TestBed.inject(CompanyInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
