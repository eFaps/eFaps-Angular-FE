import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PosStatusReportComponent } from './pos-status-report.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('PosStatusReportComponent', () => {
  let component: PosStatusReportComponent;
  let fixture: ComponentFixture<PosStatusReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PosStatusReportComponent],
      providers: [
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PosStatusReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
