import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MenuModule } from 'primeng/menu';
import { MenubarModule } from 'primeng/menubar';
import { MultiSelectModule } from 'primeng/multiselect';
import { TableModule as primeTableModule } from 'primeng/table';

import { ColumnComponent } from './column/column.component';
import { TableRoutingModule } from './table-routing.module';
import { TableComponent } from './table/table.component';

@NgModule({
  declarations: [TableComponent, ColumnComponent],
  imports: [
    CommonModule,
    TableRoutingModule,
    primeTableModule,
    MultiSelectModule,
    ButtonModule,
    MenuModule,
    MenubarModule,
    ConfirmDialogModule,
  ],
})
export class TableModule {}
