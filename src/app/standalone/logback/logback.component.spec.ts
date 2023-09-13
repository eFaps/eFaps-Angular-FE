import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

import { LogbackComponent } from './logback.component';

describe('LogbackComponent', () => {
  let component: LogbackComponent;
  let fixture: ComponentFixture<LogbackComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [LogbackComponent, HttpClientTestingModule],
      providers: [
        {
          provide: DynamicDialogConfig,
          useValue: {
            data: {},
          },
        },
        { provide: DynamicDialogRef, useValue: {} },
      ],
    });
    fixture = TestBed.createComponent(LogbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
