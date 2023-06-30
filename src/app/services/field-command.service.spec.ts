import { TestBed } from '@angular/core/testing';

import { FieldCommandService } from './field-command.service';

describe('FieldCommandService', () => {
  let service: FieldCommandService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FieldCommandService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
