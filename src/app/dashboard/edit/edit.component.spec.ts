import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from '@openng/optimus-ui/button';
import {
  DynamicDialogConfig,
  DynamicDialogRef,
} from '@openng/optimus-ui/dynamicdialog';
import { SelectModule } from '@openng/optimus-ui/select';
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
