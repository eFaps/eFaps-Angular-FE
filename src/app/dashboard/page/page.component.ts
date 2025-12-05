import { Component, Input, inject } from '@angular/core';
import {
  CompactType,
  DisplayGrid,
  GridType,
  Gridster,
  GridsterConfig,
  GridsterItem,
  GridsterItemConfig,
} from 'angular-gridster2';
import { ButtonModule } from 'primeng/button';
import { v4 as uuidv4 } from 'uuid';

import { ItemComponent } from '../item/item.component';
import { DashboardPage } from 'src/app/model/dashboard';
import { DashboardService } from 'src/app/services/dashboard.service';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss'],
  imports: [ItemComponent, ButtonModule, Gridster, GridsterItem],
})
export class PageComponent {
  private dashboardService = inject(DashboardService);

  _page: DashboardPage = { key: 'not a key', items: [] };

  options: GridsterConfig | undefined;
  dashboard: GridsterItemConfig[] = [];

  _editMode = false;

  @Input()
  set editMode(editMode: boolean) {
    this._editMode = editMode;
    if (this.options) {
      this.options!!.draggable!!.enabled = editMode;
      this.options!!.resizable!!.enabled = editMode;
      this.options = Object.assign({}, this.options);
    }
  }

  get editMode() {
    return this._editMode;
  }

  @Input()
  set page(page: DashboardPage) {
    this._page = page;
    this.options = {
      gridType: GridType.Fit,
      compactType: CompactType.None,
      displayGrid: DisplayGrid.OnDragAndResize,
      minCols: 1,
      maxCols: 100,
      minRows: 1,
      maxRows: 100,
      pushItems: true,
      draggable: {
        enabled: this.editMode,
      },
      resizable: {
        enabled: this.editMode,
      },
      margin: 5,
      disableAutoPositionOnConflict: false,
      defaultItemCols: 1,
      defaultItemRows: 1,
      itemChangeCallback: (item: GridsterItemConfig, itemComponent: GridsterItem) => {
        this.itemChanged(item);
      },
    };
    this.dashboard = page.items.map(item => {
      const gridsterItemConfig = {
        x: item.x,
        y: item.y,
        cols: item.cols,
        rows: item.rows,
      } as GridsterItemConfig
      gridsterItemConfig['widget'] = item.widget;
      return gridsterItemConfig
    })
  }

  get page(): DashboardPage {
    return this._page;
  }

  addItem(): void {
    this.dashboard.push({
      x: 0,
      y: 0,
      cols: 1,
      rows: 1,
      widget: {
        type: 'PLACEHOLDER',
        identifier: uuidv4(),
      },
    });
    this.dashboardService.updateItems(this.page, this.dashboard);
  }

  removeItem(item: GridsterItemConfig) {
    this.dashboard.splice(this.dashboard.indexOf(item), 1);
    this.dashboardService.updateItems(this.page, this.dashboard);
  }

  itemChanged(item: GridsterItemConfig) {
    this.dashboardService.updateItem(this.page, item);
  }
}
