import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './table/table.component';
import { TableRoutingModule } from './table-routing.module';
import { TableModule as primeTableModule } from 'primeng/table';
import { MultiSelectModule } from 'primeng/multiselect';
import { ColumnComponent } from './column/column.component';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { MenubarModule } from 'primeng/menubar';

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
  ],
})
export class TableModule {}
