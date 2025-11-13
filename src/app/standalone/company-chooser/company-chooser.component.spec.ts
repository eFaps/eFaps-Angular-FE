import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

import { CompanyChooserComponent } from './company-chooser.component';
import { provideZonelessChangeDetection } from '@angular/core';

describe('CompanyChooserComponent', () => {
  let component: CompanyChooserComponent;
  let fixture: ComponentFixture<CompanyChooserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CompanyChooserComponent],
      providers: [
        { provide: DynamicDialogRef, useValue: {} },
        provideZonelessChangeDetection(),
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
      ],
    });
    fixture = TestBed.createComponent(CompanyChooserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
