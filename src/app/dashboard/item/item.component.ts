import { Component, Input } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import {
  ChartWidget,
  DashboardWidget,
  TableWidget,
} from 'src/app/model/dashboard';

import { EditComponent } from '../edit/edit.component';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
  standalone: false,
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
