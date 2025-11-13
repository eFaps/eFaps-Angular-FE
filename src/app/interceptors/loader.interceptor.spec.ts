import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { LoaderInterceptor } from './loader.interceptor';

describe('LoaderInterceptor', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection(), LoaderInterceptor],
    }),
  );

  it('should be created', () => {
    const interceptor: LoaderInterceptor = TestBed.inject(LoaderInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
