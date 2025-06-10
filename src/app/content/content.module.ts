import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { ChipModule } from 'primeng/chip';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DatePickerModule } from 'primeng/datepicker';
import { DividerModule } from 'primeng/divider';
import { FileUploadModule } from 'primeng/fileupload';
import { ImageModule } from 'primeng/image';
import { InputTextModule } from 'primeng/inputtext';
import { MenuModule } from 'primeng/menu';
import { MenubarModule } from 'primeng/menubar';
import { MessagesModule } from 'primeng/messages';
import { MultiSelectModule } from 'primeng/multiselect';
import { PanelModule } from 'primeng/panel';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { SelectModule } from 'primeng/select';
import { TableModule } from 'primeng/table';
import { TabsModule } from 'primeng/tabs';
import { TextareaModule } from 'primeng/textarea';
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
  imports: [
    CommonModule,
    ContentRoutingModule,
    TabsModule,
    PanelModule,
    TableModule,
    ButtonModule,
    MenuModule,
    ConfirmDialogModule,
    ToolbarModule,
    InputTextModule,
    ImageModule,
    FormsModule,
    RadioButtonModule,
    SelectModule,
    MultiSelectModule,
    AutoCompleteModule,
    FileUploadModule,
    DatePickerModule,
    DividerModule,
    CheckboxModule,
    TextareaModule,
    MenubarModule,
    TreeModule,
    ChipModule,
    TieredMenuModule,
    MessagesModule,
    ScrollPanelModule,
    SafeHtmlPipe,
    ModalContentComponent,
    SectionsComponent,
    FormSectionComponent,
    SubSectionComponent,
    TableSectionComponent,
    TableElementComponent,
    FormElementComponent,
    AttributeSetComponent,
    AttributeSetElementComponent,
    ContentComponent,
    FormContentComponent,
    SearchContentComponent,
    ClassificationsComponent,
    ClassificationDisplayComponent,
    ModalModuleContentComponent,
  ],
})
export class ContentModule {}
