import { Component, inject, Input, signal } from '@angular/core';
import { Chart } from 'chart.js';
import { ChartModule } from 'primeng/chart';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

import { ChartWidget, WidgetData } from '../../model/dashboard';
import { DashboardService } from '../../services/dashboard.service';

@Component({
  selector: 'app-chart-widget',
  templateUrl: './chart-widget.component.html',
  styleUrls: ['./chart-widget.component.scss'],
  standalone: true,
  imports: [ChartModule, ProgressSpinnerModule],
})
export class ChartWidgetComponent {
  private dashboardservice = inject(DashboardService);

  loading = signal<boolean>(true);

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
        this.loading.set(false);
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

    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--p-text-color');
    const bckgrColor = documentStyle.getPropertyValue('--p-primary-200');
    Chart.defaults.color = textColor;
    Chart.defaults.backgroundColor = bckgrColor;
  }

  get widget() {
    return this._widget;
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
