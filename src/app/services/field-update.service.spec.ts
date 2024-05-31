import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { FieldUpdateService } from './field-update.service';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('FieldUpdateService', () => {
  let service: FieldUpdateService;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [],
    providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
});
    service = TestBed.inject(FieldUpdateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
