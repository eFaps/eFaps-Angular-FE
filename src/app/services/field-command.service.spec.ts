import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { FieldCommandService } from './field-command.service';

describe('FieldCommandService', () => {
  let service: FieldCommandService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(FieldCommandService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
