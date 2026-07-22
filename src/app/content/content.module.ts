import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AutoCompleteModule } from '@openng/optimus-ui/autocomplete';
import { ButtonModule } from '@openng/optimus-ui/button';
import { CheckboxModule } from '@openng/optimus-ui/checkbox';
import { ChipModule } from '@openng/optimus-ui/chip';
import { ConfirmDialogModule } from '@openng/optimus-ui/confirmdialog';
import { DatePickerModule } from '@openng/optimus-ui/datepicker';
import { DividerModule } from '@openng/optimus-ui/divider';
import { FileUploadModule } from '@openng/optimus-ui/fileupload';
import { ImageModule } from '@openng/optimus-ui/image';
import { InputTextModule } from '@openng/optimus-ui/inputtext';
import { MenuModule } from '@openng/optimus-ui/menu';
import { MenubarModule } from '@openng/optimus-ui/menubar';
import { MultiSelectModule } from '@openng/optimus-ui/multiselect';
import { PanelModule } from '@openng/optimus-ui/panel';
import { RadioButtonModule } from '@openng/optimus-ui/radiobutton';
import { ScrollPanelModule } from '@openng/optimus-ui/scrollpanel';
import { SelectModule } from '@openng/optimus-ui/select';
import { TableModule } from '@openng/optimus-ui/table';
import { TabsModule } from '@openng/optimus-ui/tabs';
import { TextareaModule } from '@openng/optimus-ui/textarea';
import { TieredMenuModule } from '@openng/optimus-ui/tieredmenu';
import { ToolbarModule } from '@openng/optimus-ui/toolbar';
import { TreeModule } from '@openng/optimus-ui/tree';

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
