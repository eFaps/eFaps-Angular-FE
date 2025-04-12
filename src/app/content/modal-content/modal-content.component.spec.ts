import { ClassificationDisplayComponent } from '../classification-display/classification-display.component';
import { SectionsComponent } from '../sections/sections.component';
import { ModalContentComponent } from './modal-content.component';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ButtonModule } from 'primeng/button';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Observable } from 'rxjs';

describe('ModalContentComponent', () => {
  let component: ModalContentComponent;
  let fixture: ComponentFixture<ModalContentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        ModalContentComponent,
        SectionsComponent,
        ClassificationDisplayComponent,
      ],
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
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
      ],
    });
    fixture = TestBed.createComponent(ModalContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
