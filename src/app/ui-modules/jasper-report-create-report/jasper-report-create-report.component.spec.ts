import { ComponentFixture, TestBed } from '@angular/core/testing';

import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { JasperReportCreateReportComponent } from './jasper-report-create-report.component';

describe('JasperReportCreateReportComponent', () => {
  let component: JasperReportCreateReportComponent;
  let fixture: ComponentFixture<JasperReportCreateReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JasperReportCreateReportComponent],
      providers: [
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
        {
          provide: DynamicDialogConfig,
          useValue: {
            data: {},
          },
        },
        { provide: DynamicDialogRef, useValue: {} },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(JasperReportCreateReportComponent);
    fixture.componentRef.setInput('data', {
      oid: '123.',
    });
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
