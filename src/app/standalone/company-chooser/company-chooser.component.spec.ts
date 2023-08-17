import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DynamicDialogModule, DynamicDialogRef } from 'primeng/dynamicdialog';

import { CompanyChooserComponent } from './company-chooser.component';

describe('CompanyChooserComponent', () => {
  let component: CompanyChooserComponent;
  let fixture: ComponentFixture<CompanyChooserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        CompanyChooserComponent,
        HttpClientTestingModule,
        DynamicDialogModule,
      ],
      providers: [{ provide: DynamicDialogRef, useValue: {} }],
    });
    fixture = TestBed.createComponent(CompanyChooserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
