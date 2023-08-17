import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { FieldUpdateService } from './field-update.service';

describe('FieldUpdateService', () => {
  let service: FieldUpdateService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(FieldUpdateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
