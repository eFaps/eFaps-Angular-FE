import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ButtonModule } from 'primeng/button';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { TextareaModule } from 'primeng/textarea';

import {
  ChartWidget,
  DashboardTemplate,
  DashboardWidget,
  TableWidget,
} from '../../model/dashboard';
import { DashboardService } from '../../services/dashboard.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
  imports: [
    SelectModule,
    FormsModule,
    ButtonModule,
    InputTextModule,
    FloatLabelModule,
    TextareaModule,
    AutoCompleteModule,
  ],
})
export class EditComponent implements OnInit {
  private dialogRef = inject(DynamicDialogRef);

  private dashboardService = inject(DashboardService);

  widget: DashboardWidget;

  types = [
    { label: 'Vacio', value: 'PLACEHOLDER' },
    { label: 'Plantilla', value: 'TEMPLATE' },
    { label: 'Tabla', value: 'TABLE' },
    { label: 'Gráfico', value: 'CHART' },
  ];
  type: 'CHART' | 'TABLE' | 'PLACEHOLDER' | 'TEMPLATE' = 'PLACEHOLDER';

  title: string | undefined;
  eql: string | undefined;

  links: string[] | undefined;

  groupBy: string[] | undefined;

  functions = [{ label: 'Sumar', value: 'SUM' }];
  function = 'SUM';
  key: string | undefined;
  chartTypes = [
    { label: 'Gráfico de barras', value: 'bar' },
    { label: 'Gráfico de líneas', value: 'line' },
  ];
  chartType: 'bar' | 'line' = 'bar';

  templates: DashboardTemplate[] = [];
  templateOid: string | undefined = undefined;

  constructor() {
    const config = inject(DynamicDialogConfig);

    this.widget = config.data.widget;
    this.type = this.widget.type;
    if (this.widget.title != null) {
      this.title = this.widget.title;
    }
    if (this.widget.eql != null) {
      this.eql = this.widget.eql;
    }
    if (this.widget.type == 'TABLE') {
      let tableWidget = this.widget as TableWidget;
      if (tableWidget.links != null) {
        this.links = tableWidget.links;
      }
    }
    if (this.widget.type == 'CHART') {
      let chartWidget = this.widget as ChartWidget;

      if (chartWidget.groupBy != null) {
        this.groupBy = chartWidget.groupBy;
      }
      if (chartWidget.metrics != null && chartWidget.metrics!!.length > 0) {
        this.key = chartWidget.metrics!![0].key;
      }
      this.chartType = chartWidget.chartType;
    }
    if (this.widget.type == 'TEMPLATE') {
      this.templateOid = this.widget.eql;
    }
  }
  ngOnInit(): void {
    this.dashboardService.getTemplates().subscribe({
      next: (templates) => {
        this.templates = templates;
      },
    });
  }

  submit() {
    this.widget.type = this.type;
    this.widget.title = this.title;
    this.widget.eql = this.eql;

    if (this.widget.type == 'TABLE') {
      let tableWidget = this.widget as TableWidget;
      tableWidget.links = this.links;
    }

    if (this.widget.type == 'CHART') {
      let chartWidget = this.widget as ChartWidget;
      chartWidget.groupBy = this.groupBy;
      chartWidget.metrics = [{ function: 'SUM', key: this.key!! }];
      chartWidget.chartType = this.chartType;
    }

    if (this.widget.type == 'TEMPLATE') {
      this.widget.eql = this.templateOid;
    }
    this.dialogRef.close(this.widget);
  }
}
