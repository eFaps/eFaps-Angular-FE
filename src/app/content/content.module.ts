import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CheckboxModule } from 'primeng/checkbox';
import { ChipModule } from 'primeng/chip';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DividerModule } from 'primeng/divider';
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule } from 'primeng/fileupload';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MenuModule } from 'primeng/menu';
import { MenubarModule } from 'primeng/menubar';
import { MessagesModule } from 'primeng/messages';
import { MultiSelectModule } from 'primeng/multiselect';
import { PanelModule } from 'primeng/panel';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { TableModule } from 'primeng/table';
import { TabMenuModule } from 'primeng/tabmenu';
import { TabViewModule } from 'primeng/tabview';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { ToolbarModule } from 'primeng/toolbar';
import { TreeModule } from 'primeng/tree';

import { SafeHtmlPipe } from '../pipes/safe-html.pipe';
import { AttributeSetElementComponent } from './attribute-set-element/attribute-set-element.component';
import { AttributeSetComponent } from './attribute-set/attribute-set.component';
import { ClassificationDisplayComponent } from './classification-display/classification-display.component';
import { ClassificationsComponent } from './classifications/classifications.component';
import { ContentRoutingModule } from './content-routing.module';
import { ContentComponent } from './content/content.component';
import { FormContentComponent } from './form-content/form-content.component';
import { FormElementComponent } from './form-element/form-element.component';
import { FormSectionComponent } from './form-section/form-section.component';
import { ModalContentComponent } from './modal-content/modal-content.component';
import { ModalModuleContentComponent } from './modal-module-content/modal-module-content.component';
import { SearchContentComponent } from './search-content/search-content.component';
import { SectionsComponent } from './sections/sections.component';
import { SubSectionComponent } from './sub-section/sub-section.component';
import { TableElementComponent } from './table-element/table-element.component';
import { TableSectionComponent } from './table-section/table-section.component';

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
    SafeHtmlPipe,
    TableElementComponent,
    SearchContentComponent,
    AttributeSetComponent,
    AttributeSetElementComponent,
    ClassificationsComponent,
    ClassificationDisplayComponent,
    ModalModuleContentComponent,
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
    CalendarModule,
    DividerModule,
    CheckboxModule,
    InputTextareaModule,
    MenubarModule,
    TreeModule,
    ChipModule,
    TabViewModule,
    TieredMenuModule,
    MessagesModule,
    ScrollPanelModule,
  ],
})
export class ContentModule {}
