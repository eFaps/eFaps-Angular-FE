import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PosStatusReportComponent } from './pos-status-report.component';
import { provideZonelessChangeDetection } from '@angular/core';

describe('PosStatusReportComponent', () => {
  let component: PosStatusReportComponent;
  let fixture: ComponentFixture<PosStatusReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PosStatusReportComponent],
      providers: [
        provideZonelessChangeDetection(),
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
