import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ButtonModule } from 'primeng/button';
import {
  DynamicDialogConfig,
  DynamicDialogModule,
  DynamicDialogRef,
} from 'primeng/dynamicdialog';
import { Observable } from 'rxjs';

import { FilterComponent } from './filter.component';

describe('FilterComponent', () => {
  let component: FilterComponent;
  let fixture: ComponentFixture<FilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, DynamicDialogModule, ButtonModule],
      declarations: [FilterComponent],
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
