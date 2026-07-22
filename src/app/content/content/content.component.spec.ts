import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule, provideRouter } from '@angular/router';
import { ConfirmDialogModule } from '@openng/optimus-ui/confirmdialog';
import { DialogModule } from '@openng/optimus-ui/dialog';
import { DialogService } from '@openng/optimus-ui/dynamicdialog';
import { ScrollPanelModule } from '@openng/optimus-ui/scrollpanel';
import { TabsModule } from '@openng/optimus-ui/tabs';
import { TieredMenuModule } from '@openng/optimus-ui/tieredmenu';
import { ToolbarModule } from '@openng/optimus-ui/toolbar';

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
