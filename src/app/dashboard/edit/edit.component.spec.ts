import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { SelectModule } from 'primeng/select';
import { Observable } from 'rxjs';

import { DashboardTemplate } from '../../model/dashboard';
import { DashboardService } from '../../services/dashboard.service';
import { EditComponent } from './edit.component';

class DashboardServiceStub {
  getTemplates(): Observable<DashboardTemplate[]> {
    return new Observable();
  }
}

describe('EditComponent', () => {
  let component: EditComponent;
  let fixture: ComponentFixture<EditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SelectModule, ButtonModule, FormsModule],
      providers: [
        {
          provide: DynamicDialogConfig,
          useValue: {
            data: {
              widget: {},
            },
          },
        },
        { provide: DynamicDialogRef, useValue: {} },
        { provide: DashboardService, useClass: DashboardServiceStub },
        provideZonelessChangeDetection(),
        provideHttpClient(withInterceptorsFromDi()),
      ],
    });
    fixture = TestBed.createComponent(EditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
