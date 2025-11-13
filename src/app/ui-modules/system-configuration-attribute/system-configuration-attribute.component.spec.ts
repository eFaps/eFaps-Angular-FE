import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

import { SystemConfigurationAttributeComponent } from './system-configuration-attribute.component';
import { provideZonelessChangeDetection } from '@angular/core';

describe('SystemConfigurationAttributeComponent', () => {
  let component: SystemConfigurationAttributeComponent;
  let fixture: ComponentFixture<SystemConfigurationAttributeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SystemConfigurationAttributeComponent],
      providers: [
        {
          provide: DynamicDialogConfig,
          useValue: {
            data: {},
          },
        },
        { provide: DynamicDialogRef, useValue: {} },
        provideZonelessChangeDetection(),
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
      ],
    });
    fixture = TestBed.createComponent(SystemConfigurationAttributeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
