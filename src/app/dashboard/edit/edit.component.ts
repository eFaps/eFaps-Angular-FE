import { Component } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ChartWidget, DashboardWidget } from 'src/app/model/dashboard';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditComponent {
  widget: DashboardWidget;

  types = [
    { label: 'Gráfico', value: 'CHART' },
    { label: 'Tabla', value: 'TABLE' },
    { label: 'Vacio', value: 'PLACEHOLDER' },
  ];
  type: 'CHART' | 'TABLE' | 'PLACEHOLDER' = 'PLACEHOLDER';

  title: string | undefined
  eql: string | undefined
  groupBy: string[] | undefined

  constructor(
    config: DynamicDialogConfig,
    private dialogRef: DynamicDialogRef
  ) {
    this.widget = config.data.widget;
    this.type = this.widget.type
    if (this.widget.title != null) {
      this.title = this.widget.title
    }
    if (this.widget.eql != null) {
      this.eql = this.widget.eql
    }
  }

  submit() {
    this.widget.type = this.type
    this.widget.title = this.title
    this.widget.eql = this.eql
    if (this.widget.type == 'CHART') {
      (this.widget as ChartWidget).groupBy = this.groupBy
    }
    this.dialogRef.close(this.widget)
  }
}
