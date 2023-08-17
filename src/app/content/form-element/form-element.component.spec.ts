import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DialogModule } from 'primeng/dialog';
import { DialogService } from 'primeng/dynamicdialog';

import { FormElementComponent } from './form-element.component';

describe('FormElementComponent', () => {
  let component: FormElementComponent;
  let fixture: ComponentFixture<FormElementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DialogModule, HttpClientTestingModule],
      declarations: [FormElementComponent],
      providers: [{ provide: DialogService, useValue: {} }],
    });
    fixture = TestBed.createComponent(FormElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
