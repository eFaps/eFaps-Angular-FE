import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { provideRouter } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogService } from 'primeng/dynamicdialog';
import { MenuModule } from 'primeng/menu';
import { TreeTableModule } from 'primeng/treetable';

import { StructureBrowserComponent } from './structure-browser.component';

describe('StructureBrowserComponent', () => {
  let component: StructureBrowserComponent;
  let fixture: ComponentFixture<StructureBrowserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ConfirmDialogModule, TreeTableModule, MenuModule, FormsModule],
      providers: [
        { provide: DialogService, useValue: {} },
        { provide: MessageService, useValue: {} },
        provideZonelessChangeDetection(),
        provideRouter([]),
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
      ],
    });
    fixture = TestBed.createComponent(StructureBrowserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
