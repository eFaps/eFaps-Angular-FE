import { Component, Input } from '@angular/core';
import { DashboardWidget } from 'src/app/model/dashboard';
import { DashboardService } from 'src/app/services/dashboard.service';

@Component({
  selector: 'app-chart-widget',
  templateUrl: './chart-widget.component.html',
  styleUrls: ['./chart-widget.component.scss'],
})
export class ChartWidgetComponent {
  _widget: DashboardWidget | undefined;

  type = 'bar';
  data: any;
  options: any;

  constructor(private dashboardservice: DashboardService) {}

  @Input()
  set widget(widget: DashboardWidget | undefined) {
    this._widget = widget;
    if (widget) {
      this.options = {
        plugins: {
          title: {
            display: widget?.title != null,
            text: widget.title,
          },
        },
      };
      this.load();
    }
  }

  get widget() {
    return this._widget;
  }

  load() {
    this.dashboardservice.getWidget(this.widget!!.identifier).subscribe({
      next: (content) => {
        let labels = [];
        const datasets: any[] = [];
        for (const label in content) {
          labels.push(label);
        }
        labels.sort();

        labels.forEach((label) => {
          for (const datasetName in content[label]) {
            let dataset = datasets.find((it) => {
              return (it.key = datasetName);
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
      },
    });
  }
}
