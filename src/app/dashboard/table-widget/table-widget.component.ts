import { Component, Input, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TableModule } from 'primeng/table';

import { TableWidget, WidgetData } from '../../model/dashboard';
import { DashboardService } from '../../services/dashboard.service';

@Component({
  selector: 'app-table-widget',
  templateUrl: './table-widget.component.html',
  styleUrls: ['./table-widget.component.scss'],
  imports: [TableModule, ProgressSpinnerModule, ButtonModule],
})
export class TableWidgetComponent {
  private router = inject(Router);
  private dashboardservice = inject(DashboardService);

  _widget: TableWidget | undefined;
  cols: any[] = [];
  elements: any[] = [];
  loading = signal<boolean>(true);

  @Input()
  set widget(widget: any) {
    if (widget) {
      if (widget.data) {
        this._widget = widget.widget;
        this.eval(widget);
        this.loading.set(false);
      } else {
        this._widget = widget;
        this.load();
      }
    }
  }

  get widget() {
    return this._widget!!;
  }

  load() {
    this.dashboardservice.getWidget(this.widget!!.identifier).subscribe({
      next: (dto) => {
        this.eval(dto);
        this.loading.set(false);
      },
    });
  }

  isLink(key: string): boolean {
    if (this._widget && this._widget!!.links) {
      return this._widget!!.links!!.findIndex((val) => val == key) > -1;
    }
    return false;
  }

  eval(dto: WidgetData) {
    const values = dto.data;
    if (Array.isArray(values) && values.length > 0) {
      (values[0].values as Array<any>).forEach((entry) => {
        const header = this.isLink(entry.key) ? '' : entry.key;
        this.cols.push({ header: header, key: entry.key });
      });
      values.forEach((rowEntry) => {
        const row: any = {};
        (rowEntry.values as Array<any>).forEach((entry) => {
          row[entry.key] = entry.value;
        });
        this.elements.push(row);
      });
    } else {
      this.cols.push({ header: '' });
    }
  }

  followLink(oid: string) {
    this.router.navigate(['content', oid]);
  }
}
