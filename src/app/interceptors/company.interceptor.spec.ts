import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { CompanyInterceptor } from './company.interceptor';

describe('CompanyInterceptor', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        CompanyInterceptor,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
      ],
    }),
  );

  it('should be created', () => {
    const interceptor: CompanyInterceptor = TestBed.inject(CompanyInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
