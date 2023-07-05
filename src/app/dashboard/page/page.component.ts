import { Component, Input, OnInit } from '@angular/core';
import {
  CompactType,
  GridType,
  GridsterConfig,
  GridsterItem,
} from 'angular-gridster2';
import { DashboardPage } from 'src/app/model/dashboard';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss'],
})
export class PageComponent {
  _page: DashboardPage = { items: [] };

  options: GridsterConfig | undefined;
  items: GridsterItem[] | undefined;

  editMode = true;

  @Input()
  set page(page: DashboardPage) {
    this._page = page;
    this.options = {
      gridType: GridType.Fit,
      compactType: CompactType.None,
      maxCols: 10,
      maxRows: 10,
      pushItems: true,
      draggable: {
        enabled: this.editMode,
      },
      resizable: {
        enabled: this.editMode,
      },
      margin: 5,
    };
    this.items = page.items.map((item) => {
      const gridsterItem = {
        x: item.x,
        y: item.y,
        cols: item.cols,
        rows: item.rows
      } as GridsterItem;
      gridsterItem['widget'] = item.widget;
      return gridsterItem;
    });
  }

  get page(): DashboardPage {
    return this._page;
  }
}
