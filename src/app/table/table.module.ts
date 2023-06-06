import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './table/table.component';
import { TableRoutingModule } from './table-routing.module';
import { TableModule as primeTableModule } from 'primeng/table';
import { MultiSelectModule } from 'primeng/multiselect';
import { ColumnComponent } from './column/column.component';
import { ButtonModule } from 'primeng/button';
@NgModule({
  declarations: [TableComponent, ColumnComponent],
  imports: [
    CommonModule,
    TableRoutingModule,
    primeTableModule,
    MultiSelectModule,
    ButtonModule,
  ],
})
export class TableModule {}
