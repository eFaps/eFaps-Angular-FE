import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContentRoutingModule } from './content-routing.module';
import { ContentComponent } from './content/content.component';

import { TabMenuModule } from 'primeng/tabmenu';
import { PanelModule } from 'primeng/panel';
import { SectionsComponent } from './sections/sections.component';
import { SubSectionComponent } from './sub-section/sub-section.component';
import { TableSectionComponent } from './table-section/table-section.component';
import { FormSectionComponent } from './form-section/form-section.component';
import { ElementComponent } from './element/element.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToolbarModule } from 'primeng/toolbar';

@NgModule({
  declarations: [
    ContentComponent,
    SectionsComponent,
    SubSectionComponent,
    TableSectionComponent,
    FormSectionComponent,
    ElementComponent,
  ],
  imports: [
    CommonModule,
    ContentRoutingModule,
    TabMenuModule,
    PanelModule,
    TableModule,
    ButtonModule,
    MenuModule,
    ConfirmDialogModule,
    ToolbarModule,
  ],
})
export class ContentModule {}
