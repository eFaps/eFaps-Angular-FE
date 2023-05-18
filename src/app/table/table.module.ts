import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './table/table.component';
import { TableRoutingModule } from './table-routing.module';
import { TableModule as primeTableModule } from 'primeng/table';

@NgModule({
  declarations: [TableComponent],
  imports: [CommonModule, TableRoutingModule, primeTableModule],
})
export class TableModule {}
