import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassificationDisplayComponent } from './classification-display.component';
import { provideZonelessChangeDetection } from '@angular/core';

describe('ClassificationDisplayComponent', () => {
  let component: ClassificationDisplayComponent;
  let fixture: ComponentFixture<ClassificationDisplayComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ClassificationDisplayComponent],
      providers: [
        provideZonelessChangeDetection(),
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
      ],
    });
    fixture = TestBed.createComponent(ClassificationDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
