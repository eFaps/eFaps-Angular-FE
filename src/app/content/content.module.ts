import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule } from 'primeng/fileupload';
import { InputTextModule } from 'primeng/inputtext';
import { MenuModule } from 'primeng/menu';
import { MultiSelectModule } from 'primeng/multiselect';
import { PanelModule } from 'primeng/panel';
import { RadioButtonModule } from 'primeng/radiobutton';
import { TableModule } from 'primeng/table';
import { TabMenuModule } from 'primeng/tabmenu';
import { ToolbarModule } from 'primeng/toolbar';

import { ContentRoutingModule } from './content-routing.module';
import { ContentComponent } from './content/content.component';
import { FormElementComponent } from './form-element/form-element.component';
import { FormContentComponent } from './form-content/form-content.component';
import { FormSectionComponent } from './form-section/form-section.component';
import { ModalContentComponent } from './modal-content/modal-content.component';
import { SectionsComponent } from './sections/sections.component';
import { SubSectionComponent } from './sub-section/sub-section.component';
import { TableSectionComponent } from './table-section/table-section.component';
import { SafeHtmlPipe } from '../pipes/safe-html.pipe';

import { CalendarModule } from 'primeng/calendar';

@NgModule({
  declarations: [
    ContentComponent,
    SectionsComponent,
    SubSectionComponent,
    TableSectionComponent,
    FormSectionComponent,
    FormElementComponent,
    ModalContentComponent,
    FormContentComponent,
    SafeHtmlPipe
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
    MultiSelectModule,
    AutoCompleteModule,
    FileUploadModule,
    CalendarModule
  ],
})
export class ContentModule {}
