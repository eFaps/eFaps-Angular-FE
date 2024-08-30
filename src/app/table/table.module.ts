import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CheckboxModule } from 'primeng/checkbox';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { MenuModule } from 'primeng/menu';
import { MenubarModule } from 'primeng/menubar';
import { MultiSelectModule } from 'primeng/multiselect';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { PaginatorModule } from 'primeng/paginator';
import { TableModule as primeTableModule } from 'primeng/table';
import { TieredMenuModule } from 'primeng/tieredmenu';

import { ColumnComponent } from './column/column.component';
import { FilterElementComponent } from './filter-element/filter-element.component';
import { FilterComponent } from './filter/filter.component';
import { TableRoutingModule } from './table-routing.module';
import { TableComponent } from './table/table.component';

@NgModule({
  declarations: [
    TableComponent,
    ColumnComponent,
    FilterComponent,
    FilterElementComponent,
  ],
  imports: [
    CommonModule,
    CheckboxModule,
    TableRoutingModule,
    primeTableModule,
    MultiSelectModule,
    ButtonModule,
    MenuModule,
    MenubarModule,
    ConfirmDialogModule,
    InputTextModule,
    InputGroupModule,
    InputGroupAddonModule,
    FormsModule,
    OverlayPanelModule,
    TieredMenuModule,
    CalendarModule,
    PaginatorModule,
  ],
})
export class TableModule {}
