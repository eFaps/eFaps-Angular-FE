import { LoaderInterceptor } from './loader.interceptor';
import { TestBed } from '@angular/core/testing';

describe('LoaderInterceptor', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [LoaderInterceptor],
    }),
  );

  it('should be created', () => {
    const interceptor: LoaderInterceptor = TestBed.inject(LoaderInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
