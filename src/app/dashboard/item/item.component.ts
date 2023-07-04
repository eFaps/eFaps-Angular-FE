import { Component, Input } from '@angular/core';
import { DashboardWidget } from 'src/app/model/dashboard';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
})
export class ItemComponent {
  _widget: DashboardWidget | undefined;

  constructor() {}

  @Input()
  set widget(widget: DashboardWidget | undefined) {
    this._widget = widget;
  }

  get widget() {
    return this._widget;
  }
}
