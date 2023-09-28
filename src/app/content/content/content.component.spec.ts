import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { DialogService } from 'primeng/dynamicdialog';
import { TabViewModule } from 'primeng/tabview';
import { ToolbarModule } from 'primeng/toolbar';

import { SectionsComponent } from '../sections/sections.component';
import { ContentComponent } from './content.component';
import { TieredMenuModule } from 'primeng/tieredmenu';

describe('ContentComponent', () => {
  let component: ContentComponent;
  let fixture: ComponentFixture<ContentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        DialogModule,
        RouterTestingModule,
        HttpClientTestingModule,
        ToolbarModule,
        TabViewModule,
        ConfirmDialogModule,
        TieredMenuModule,
      ],
      declarations: [ContentComponent, SectionsComponent],
      providers: [{ provide: DialogService, useValue: {} }],
    });
    fixture = TestBed.createComponent(ContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
