import { Component, Input, inject, signal } from '@angular/core';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TableModule } from 'primeng/table';

import { TableWidget, WidgetData } from 'src/app/model/dashboard';
import { DashboardService } from 'src/app/services/dashboard.service';

@Component({
  selector: 'app-table-widget',
  templateUrl: './table-widget.component.html',
  styleUrls: ['./table-widget.component.scss'],
  imports: [TableModule, ProgressSpinnerModule],
})
export class TableWidgetComponent {
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

  eval(dto: WidgetData) {
    const values = dto.data;
    if (Array.isArray(values)) {
      (values[0].values as Array<any>).forEach((entry) => {
        this.cols.push({ header: entry.key });
      });
      values.forEach((rowEntry) => {
        const row: any = {};
        (rowEntry.values as Array<any>).forEach((entry) => {
          row[entry.key] = entry.value;
        });
        this.elements.push(row);
      });
    }
  }
}
