import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormSectionComponent } from './form-section.component';
import { provideZonelessChangeDetection } from '@angular/core';

describe('FormSectionComponent', () => {
  let component: FormSectionComponent;
  let fixture: ComponentFixture<FormSectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormSectionComponent],
      providers: [provideZonelessChangeDetection(),]
    });
    fixture = TestBed.createComponent(FormSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
