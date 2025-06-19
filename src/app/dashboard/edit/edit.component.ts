import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { TextareaModule } from 'primeng/textarea';

import {
  ChartWidget,
  DashboardWidget,
  DashboardTemplate,
} from 'src/app/model/dashboard';
import { DashboardService } from 'src/app/services/dashboard.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
  standalone: true,
  imports: [
    SelectModule,
    FormsModule,
    ButtonModule,
    InputTextModule,
    FloatLabelModule,
    TextareaModule,
  ],
})
export class EditComponent implements OnInit {
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
  groupBy: string[] | undefined;

  functions = [{ label: 'Sumar', value: 'SUM' }];
  function = 'SUM';
  key: string | undefined;

  templates: DashboardTemplate[] = [];
  templateOid: string | undefined = undefined;

  constructor(
    config: DynamicDialogConfig,
    private dialogRef: DynamicDialogRef,
  ) {
    this.widget = config.data.widget;
    this.type = this.widget.type;
    if (this.widget.title != null) {
      this.title = this.widget.title;
    }
    if (this.widget.eql != null) {
      this.eql = this.widget.eql;
    }
    if (this.widget.type == 'CHART') {
      if ((this.widget as ChartWidget).groupBy != null) {
        this.groupBy = (this.widget as ChartWidget).groupBy;
      }
      if (
        (this.widget as ChartWidget).metrics != null &&
        (this.widget as ChartWidget).metrics!!.length > 0
      ) {
        this.key = (this.widget as ChartWidget).metrics!![0].key;
      }
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
    if (this.widget.type == 'CHART') {
      (this.widget as ChartWidget).groupBy = this.groupBy;
      (this.widget as ChartWidget).metrics = [
        { function: 'SUM', key: this.key!! },
      ];
    }
    if (this.widget.type == 'TEMPLATE') {
      this.widget.eql = this.templateOid;
    }
    this.dialogRef.close(this.widget);
  }
}
