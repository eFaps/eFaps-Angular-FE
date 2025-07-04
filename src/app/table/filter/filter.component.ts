import { Component, OnInit, inject } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

import { Filter } from 'src/app/model/table';
import { TableService } from 'src/app/services/table.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss',
  standalone: false,
})
export class FilterComponent implements OnInit {
  private tableService = inject(TableService);
  private config = inject(DynamicDialogConfig);
  private dialogRef = inject(DynamicDialogRef);

  id: string | undefined;
  filters: Filter[] | undefined;
  updatedFilters: Filter[] = [];

  constructor() {
    const config = this.config;

    config.header = 'Filtrar';
  }

  ngOnInit(): void {
    this.id = this.config.data.cmdId;
    this.tableService.getFilters(this.id!!).subscribe({
      next: (filters) => (this.filters = filters),
    });
  }

  submit() {
    console.log(this.id);
    console.log(this.updatedFilters);
    this.tableService.updateFilters(this.id!!, this.updatedFilters).subscribe({
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
