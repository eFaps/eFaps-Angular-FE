import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ButtonModule } from 'primeng/button';
import {
  DynamicDialogConfig,
  DynamicDialogModule,
  DynamicDialogRef,
} from 'primeng/dynamicdialog';
import { Observable } from 'rxjs';

import { ClassificationDisplayComponent } from '../classification-display/classification-display.component';
import { SectionsComponent } from '../sections/sections.component';
import { ModalContentComponent } from './modal-content.component';

describe('ModalContentComponent', () => {
  let component: ModalContentComponent;
  let fixture: ComponentFixture<ModalContentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DynamicDialogModule, HttpClientTestingModule, ButtonModule],
      declarations: [
        ModalContentComponent,
        SectionsComponent,
        ClassificationDisplayComponent,
      ],
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
    });
    fixture = TestBed.createComponent(ModalContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
