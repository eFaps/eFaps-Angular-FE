import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { combineLatest, forkJoin } from 'rxjs';
import { MenuEntry } from 'src/app/model/menu';
import { TableService } from 'src/app/services/table.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  id: string | undefined;
  cols: any[] = [];
  elements: any[] = [];
  selectionMode: 'single' | 'multiple' | null | undefined = null;
  selectedElements: any;
  title: string = '';
  loading = true;
  menuItems: MenuItem[] = [];
  constructor(
    private route: ActivatedRoute,
    private tableService: TableService
  ) {}

  ngOnInit(): void {
    this.loading = true;
    combineLatest([this.route.queryParams, this.route.params]).subscribe(
      (parameters) => {
        this.id = parameters[1]['id'];
        let oid = parameters[0]['oid'];
        this.tableService.getTable(this.id!!, oid).subscribe({
          next: (val) => {
            this.title = val.header;
            this.cols = val.columns;
            this.elements = val.values;
            this.selectionMode = val.selectionMode;
            this.loading = false;
            this.menuItems = val.menu.map((item) => this.getMenuItem(item));
          },
        });
      }
    );
  }

  getMenuItem(item: MenuEntry): MenuItem {
    return {
      id: item.id,
      label: item.label,
      items:
        item.children && item.children.length > 0
          ? item.children.map((item) => this.getMenuItem(item))
          : undefined,
    };
  }
}
