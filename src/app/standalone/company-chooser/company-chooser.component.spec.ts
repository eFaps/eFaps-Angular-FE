import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DynamicDialogModule, DynamicDialogRef } from 'primeng/dynamicdialog';

import { CompanyChooserComponent } from './company-chooser.component';

describe('CompanyChooserComponent', () => {
  let component: CompanyChooserComponent;
  let fixture: ComponentFixture<CompanyChooserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CompanyChooserComponent, DynamicDialogModule],
      providers: [
        { provide: DynamicDialogRef, useValue: {} },
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
