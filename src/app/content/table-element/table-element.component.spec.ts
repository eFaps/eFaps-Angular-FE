import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableElementComponent } from './table-element.component';

describe('TableElementComponent', () => {
  let component: TableElementComponent;
  let fixture: ComponentFixture<TableElementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TableElementComponent],
      providers: [
        provideZonelessChangeDetection(),
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
      ],
    });
    fixture = TestBed.createComponent(TableElementComponent);

    component = fixture.componentInstance;

    fixture.componentRef.setInput('rowData', {
      field: 'something',
    });
    fixture.componentRef.setInput('column', {
      header: 'header',
      field: 'field',
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
