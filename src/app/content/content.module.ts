import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { MenuModule } from 'primeng/menu';
import { PanelModule } from 'primeng/panel';
import { RadioButtonModule } from 'primeng/radiobutton';
import { TableModule } from 'primeng/table';
import { TabMenuModule } from 'primeng/tabmenu';
import { ToolbarModule } from 'primeng/toolbar';
import { MultiSelectModule } from 'primeng/multiselect';


import { ContentRoutingModule } from './content-routing.module';
import { ContentComponent } from './content/content.component';
import { ElementComponent } from './element/element.component';
import { FormSectionComponent } from './form-section/form-section.component';
import { ModalContentComponent } from './modal-content/modal-content.component';
import { SectionsComponent } from './sections/sections.component';
import { SubSectionComponent } from './sub-section/sub-section.component';
import { TableSectionComponent } from './table-section/table-section.component';

@NgModule({
  declarations: [
    ContentComponent,
    SectionsComponent,
    SubSectionComponent,
    TableSectionComponent,
    FormSectionComponent,
    ElementComponent,
    ModalContentComponent,
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
    InputTextModule,
    FormsModule,
    RadioButtonModule,
    DropdownModule,
    MultiSelectModule
  ],
})
export class ContentModule {}
