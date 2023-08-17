import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ButtonModule } from 'primeng/button';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { TreeModule } from 'primeng/tree';

import { ClassificationsComponent } from './classifications.component';

describe('ClassificationsComponent', () => {
  let component: ClassificationsComponent;
  let fixture: ComponentFixture<ClassificationsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, TreeModule, ButtonModule],
      declarations: [ClassificationsComponent],
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
