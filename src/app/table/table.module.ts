import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './table/table.component';
import { TableRoutingModule } from './table-routing.module';
import { TableModule as primeTableModule } from 'primeng/table';
import { MultiSelectModule } from 'primeng/multiselect';
@NgModule({
  declarations: [TableComponent],
  imports: [CommonModule, TableRoutingModule, primeTableModule, MultiSelectModule],
})
export class TableModule {}
