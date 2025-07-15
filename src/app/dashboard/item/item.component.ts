import { Component, inject, Input, signal } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DialogService } from 'primeng/dynamicdialog';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

import { ChartWidgetComponent } from '../chart-widget/chart-widget.component';
import { EditComponent } from '../edit/edit.component';
import { TableWidgetComponent } from '../table-widget/table-widget.component';
import { DashboardWidget, WidgetData } from 'src/app/model/dashboard';
import { DashboardService } from 'src/app/services/dashboard.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
  imports: [
    ButtonModule,
    ChartWidgetComponent,
    TableWidgetComponent,
    ProgressSpinnerModule,
  ],
})
export class ItemComponent {
  private dialogService = inject(DialogService);

  private dashboardService = inject(DashboardService);

  templateLoading = signal<boolean>(false);

  _widget: DashboardWidget | undefined;
  private _editMode: boolean = false;

  templateWidgetData: WidgetData | undefined;

  @Input()
  set widget(widget: DashboardWidget | undefined) {
    this._widget = widget;
    if (widget?.type == 'TEMPLATE') {
      this.evalTemplate();
    }
  }

  get widget() {
    return this._widget;
  }

  evalTemplate() {
    this.templateLoading.set(true);
    this.dashboardService.getWidget(this.widget?.eql!!).subscribe({
      next: (result) => {
        if (result && result.widget) {
          if (this.widget?.title) {
            result.widget.title = this.widget?.title;
          }
          this.templateWidgetData = result;
        }
        this.templateLoading.set(false);
      },
    });
  }

  @Input()
  set editMode(editMode: boolean) {
    this._editMode = editMode;
  }

  get editMode() {
    return this._editMode;
  }

  edit() {
    const dialogRef = this.dialogService.open(EditComponent, {
      data: {
        widget: this.widget,
      },
      maximizable: true,
      closable: true,
      modal: true,
    });
    dialogRef.onClose.subscribe({
      next: (widget) => {
        if (widget) {
          console.log(widget);
        }
      },
    });
  }
}
