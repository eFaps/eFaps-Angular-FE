import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ButtonModule } from 'primeng/button';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { TreeModule } from 'primeng/tree';

import { ClassificationsComponent } from './classifications.component';
import { provideZonelessChangeDetection } from '@angular/core';

describe('ClassificationsComponent', () => {
  let component: ClassificationsComponent;
  let fixture: ComponentFixture<ClassificationsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ClassificationsComponent, TreeModule, ButtonModule],
      providers: [
        {
          provide: DynamicDialogConfig,
          useValue: {
            data: {
              classUUIDs: [],
            },
          },
        },
        { provide: DynamicDialogRef, useValue: {} },
        provideZonelessChangeDetection(),
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
      ],
    });
    fixture = TestBed.createComponent(ClassificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
