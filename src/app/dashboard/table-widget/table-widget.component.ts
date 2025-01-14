import { Component, Input } from '@angular/core';
import { TableWidget } from 'src/app/model/dashboard';
import { DashboardService } from 'src/app/services/dashboard.service';

@Component({
  selector: 'app-table-widget',
  templateUrl: './table-widget.component.html',
  styleUrls: ['./table-widget.component.scss'],
  standalone: false,
})
export class TableWidgetComponent {
  _widget: TableWidget | undefined;
  cols: any[] = [];
  elements: any[] = [];

  constructor(private dashboardservice: DashboardService) {}

  @Input()
  set widget(widget: TableWidget | undefined) {
    this._widget = widget;
    if (widget) {
      this.load();
    }
  }

  get widget() {
    return this._widget;
  }

  load() {
    this.dashboardservice.getWidget(this.widget!!.identifier).subscribe({
      next: (content) => {
        const values = content[1];
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
      },
    });
  }
}
