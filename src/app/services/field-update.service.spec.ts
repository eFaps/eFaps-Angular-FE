import { TestBed } from '@angular/core/testing';

import { FieldUpdateService } from './field-update.service';

describe('FieldUpdateService', () => {
  let service: FieldUpdateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FieldUpdateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
