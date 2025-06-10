import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';

import { ModalModuleContentComponent } from './modal-module-content.component';

describe('ModalModuleContentComponent', () => {
  let component: ModalModuleContentComponent;
  let fixture: ComponentFixture<ModalModuleContentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ModalModuleContentComponent],
      providers: [
        {
          provide: DynamicDialogConfig,
          useValue: {
            data: {},
          },
        },
      ],
    });
    fixture = TestBed.createComponent(ModalModuleContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
