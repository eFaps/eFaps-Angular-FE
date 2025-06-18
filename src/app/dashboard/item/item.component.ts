import { Component, Input } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DialogService } from 'primeng/dynamicdialog';

import { ChartWidgetComponent } from '../chart-widget/chart-widget.component';
import { EditComponent } from '../edit/edit.component';
import { TableWidgetComponent } from '../table-widget/table-widget.component';
import {
  ChartWidget,
  DashboardWidget,
  TableWidget,
} from 'src/app/model/dashboard';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
  imports: [ButtonModule, ChartWidgetComponent, TableWidgetComponent],
})
export class ItemComponent {
  _widget: DashboardWidget | undefined;
  private _editMode: boolean = false;

  constructor(private dialogService: DialogService) {}

  @Input()
  set widget(widget: DashboardWidget | undefined) {
    this._widget = widget;
  }

  get widget() {
    return this._widget;
  }

  get chartWidget(): ChartWidget {
    return this.widget as ChartWidget;
  }

  get tableWidget(): TableWidget {
    return this.widget as TableWidget;
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
