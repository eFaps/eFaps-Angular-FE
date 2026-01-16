import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup } from '@angular/forms';

import { AutoCompleteComponent } from './auto-complete.component';

describe('AutoCompleteComponent', () => {
  let component: AutoCompleteComponent;
  let fixture: ComponentFixture<AutoCompleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AutoCompleteComponent],
      providers: [
        provideZonelessChangeDetection(),
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AutoCompleteComponent);
    fixture.componentRef.setInput('uimodule', {
      id: '123-456-456-465',
      key: 'filtered-report',
      targetMode: 'VIEW',
      properties: {},
      header: 'A header',
    });
    fixture.componentRef.setInput(
      'formGroup',
      new FormGroup({
        fieldName: new FormControl<string | undefined>(undefined),
      }),
    );

    fixture.componentRef.setInput('formItem', {
      type: 'AUTOCOMPLETE',
      label: 'label',
      name: 'fieldName',
    });

    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
