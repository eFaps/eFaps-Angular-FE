import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule, provideRouter } from '@angular/router';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { DialogService } from 'primeng/dynamicdialog';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { TabsModule } from 'primeng/tabs';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { ToolbarModule } from 'primeng/toolbar';

import { SectionsComponent } from '../sections/sections.component';
import { ContentComponent } from './content.component';

describe('ContentComponent', () => {
  let component: ContentComponent;
  let fixture: ComponentFixture<ContentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ContentComponent,
        SectionsComponent,
        RouterModule,
        DialogModule,
        ToolbarModule,
        TabsModule,
        ConfirmDialogModule,
        TieredMenuModule,
        ScrollPanelModule,
      ],
      providers: [
        { provide: DialogService, useValue: {} },
        provideZonelessChangeDetection(),
        provideRouter([]),
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
      ],
    });
    fixture = TestBed.createComponent(ContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
