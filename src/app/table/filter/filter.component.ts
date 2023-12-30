import { Component, EventEmitter, OnInit } from '@angular/core';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { Filter } from 'src/app/model/table';
import { TableService } from 'src/app/services/table.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss',
})
export class FilterComponent implements OnInit {
  id: string | undefined;
  filters: Filter[] | undefined;
  updatedFilters: Filter[] = [];

  constructor(
    private tableService: TableService,
    private config: DynamicDialogConfig
  ) {
    config.header = 'Filtrar';
  }

  ngOnInit(): void {
    this.id = this.config.data.cmdId;
    this.tableService.getFilters(this.id!!).subscribe({
      next: (filters) => (this.filters = filters),
    });
  }

  submit() {}

  onFilterEvent(updatedFilter: Filter) {
    const index = this.updatedFilters.findIndex(filter => {
      return filter.field == updatedFilter.field
    })
    if (index > -1) {
      this.updatedFilters!![index] = updatedFilter
    } else {
      this.updatedFilters.push(updatedFilter)
    }
    console.log(this.updatedFilters)
  }
}
