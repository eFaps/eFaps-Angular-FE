import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
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
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        ConfirmDialogModule,
        TreeTableModule,
        MenuModule,
        FormsModule,
      ],
      declarations: [StructureBrowserComponent],
      providers: [{ provide: DialogService, useValue: {} }],
    });
    fixture = TestBed.createComponent(StructureBrowserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
