import { ComponentFixture, TestBed } from '@angular/core/testing';

import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { EQL2Component } from './eql2.component';

describe('EQL2Component', () => {
  let component: EQL2Component;
  let fixture: ComponentFixture<EQL2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EQL2Component],
      providers: [
        {
          provide: DynamicDialogConfig,
          useValue: {
            data: {
              classUUIDs: [],
            },
          },
        },
        provideZonelessChangeDetection(),
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EQL2Component);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
