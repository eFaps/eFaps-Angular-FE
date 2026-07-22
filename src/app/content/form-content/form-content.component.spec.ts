import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { DialogService } from '@openng/optimus-ui/dynamicdialog';
import { MenuModule } from '@openng/optimus-ui/menu';
import { ToolbarModule } from '@openng/optimus-ui/toolbar';

import { SectionsComponent } from '../sections/sections.component';
import { FormContentComponent } from './form-content.component';

describe('FormContentComponent', () => {
  let component: FormContentComponent;
  let fixture: ComponentFixture<FormContentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        FormContentComponent,
        SectionsComponent,
        ToolbarModule,
        MenuModule,
      ],
      providers: [
        { provide: DialogService, useValue: {} },
        provideZonelessChangeDetection(),
        provideRouter([]),
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
      ],
    });
    fixture = TestBed.createComponent(FormContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
