import { Component, inject, Input } from '@angular/core';
import { ChartModule } from 'primeng/chart';

import { ChartWidget, WidgetData } from 'src/app/model/dashboard';
import { DashboardService } from 'src/app/services/dashboard.service';

@Component({
  selector: 'app-chart-widget',
  templateUrl: './chart-widget.component.html',
  styleUrls: ['./chart-widget.component.scss'],
  standalone: true,
  imports: [ChartModule],
})
export class ChartWidgetComponent {
  private dashboardservice = inject(DashboardService);

  _widget: ChartWidget | undefined;

  type:
    | 'bar'
    | 'line'
    | 'scatter'
    | 'bubble'
    | 'pie'
    | 'doughnut'
    | 'polarArea'
    | 'radar'
    | undefined = 'bar';
  data: any;
  options: any;

  @Input()
  set widget(widget: any) {
    if (widget) {
      if (widget.data) {
        this._widget = widget.widget;
        this.eval(widget);
      } else {
        this._widget = widget;
        this.load();
      }
    }
    this.options = {
      plugins: {
        title: {
          display: this.widget?.title != null,
          text: this.widget.title,
        },
      },
    };
    this.type = this.widget.chartType;
  }

  get widget() {
    return this._widget;
  }

  load() {
    this.dashboardservice.getWidget(this.widget!!.identifier).subscribe({
      next: (dto) => {
        this.eval(dto);
      },
    });
  }

  eval(dto: WidgetData) {
    let content = dto.data;
    let labels = [];
    const datasets: any[] = [];
    for (const label in content) {
      labels.push(label);
    }
    labels.sort();

    labels.forEach((label) => {
      for (const datasetName in content[label]) {
        let dataset = datasets.find((it) => {
          return it.key == datasetName;
        });
        if (!dataset) {
          dataset = {
            label: datasetName,
            key: datasetName,
            data: [],
          };
          datasets.push(dataset);
        }
        dataset.data.push(content[label][datasetName]);
      }
    });

    this.data = {
      labels: labels,
      datasets: datasets,
    };
  }
}
