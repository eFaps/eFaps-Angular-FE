import { Component, OnInit, inject, signal } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { PopoverModule } from 'primeng/popover';

import { FilterElementComponent } from '../filter-element/filter-element.component';
import { Column, Filter } from 'src/app/model/table';
import { TableService } from 'src/app/services/table.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss',
  imports: [FilterElementComponent, ButtonModule, PopoverModule],
})
export class FilterComponent implements OnInit {
  private tableService = inject(TableService);
  private config = inject(DynamicDialogConfig);
  private dialogRef = inject(DynamicDialogRef);

  id: string | undefined;
  filters = signal<Filter[]>([]);
  private updatedFilters: Filter[] = [];
  private cols: Column[] = [];

  constructor() {
    const config = this.config;

    config.header = 'Filtrar';
  }

  ngOnInit(): void {
    this.id = this.config.data.cmdId;
    this.cols = this.config.data.cols;
    this.tableService.getFilters(this.id!!).subscribe({
      next: (filters) => this.filters.set(filters),
    });
  }

  getLabel(filter: Filter): string {
    const col = this.cols.find((col) => {
      return col.field == filter.field;
    });
    return col ? col.header : '';
  }

  submit() {
    const sf: Filter[] = [];
    this.filters().forEach((filter) => {
      const index = this.updatedFilters.findIndex((uf) => {
        return filter.field == uf.field;
      });
      if (index > -1) {
        sf.push(this.updatedFilters!![index]);
      } else {
        sf.push(filter);
      }
    });
    this.tableService.updateFilters(this.id!!, sf).subscribe({
      next: (_) => {
        this.dialogRef.close();
      },
    });
  }

  onFilterEvent(updatedFilter: Filter) {
    const index = this.updatedFilters.findIndex((filter) => {
      return filter.field == updatedFilter.field;
    });
    if (index > -1) {
      this.updatedFilters!![index] = updatedFilter;
    } else {
      this.updatedFilters.push(updatedFilter);
    }
  }
}
