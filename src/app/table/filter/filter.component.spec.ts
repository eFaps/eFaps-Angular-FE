import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ButtonModule } from 'primeng/button';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Observable } from 'rxjs';

import { FilterComponent } from './filter.component';
import { provideZonelessChangeDetection } from '@angular/core';

describe('FilterComponent', () => {
  let component: FilterComponent;
  let fixture: ComponentFixture<FilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonModule],
      providers: [
        {
          provide: DynamicDialogConfig,
          useValue: {
            data: {
              outline: {
                header: {},
              },
            },
          },
        },
        {
          provide: DynamicDialogRef,
          useValue: {
            onClose: {
              subscribe(): Observable<any> {
                return new Observable();
              },
            },
          },
        },
        provideZonelessChangeDetection(),
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(FilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
