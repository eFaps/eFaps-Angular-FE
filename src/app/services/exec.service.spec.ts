import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { ExecService } from './exec.service';

describe('ExecService', () => {
  let service: ExecService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(ExecService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
