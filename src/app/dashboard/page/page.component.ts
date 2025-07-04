import { Component, Input, inject } from '@angular/core';
import {
  CompactType,
  DisplayGrid,
  GridType,
  GridsterConfig,
  GridsterItem,
  GridsterModule,
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
  standalone: true,
  imports: [GridsterModule, ItemComponent, ButtonModule],
})
export class PageComponent {
  private dashboardService = inject(DashboardService);

  _page: DashboardPage = { key: 'not a key', items: [] };

  options: GridsterConfig | undefined;
  items: GridsterItem[] = [];

  _editMode = false;

  @Input()
  set editMode(editMode: boolean) {
    this._editMode = editMode;
    if (this.options) {
      this.options!!.draggable!!.enabled = editMode;
      this.options!!.resizable!!.enabled = editMode;
      if (this.options!!.api) {
        this.options!!.api!!.optionsChanged!!();
      }
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
      itemChangeCallback: (item: GridsterItem) => {
        this.itemChanged(item);
      },
    };
    this.items = page.items.map((item) => {
      const gridsterItem = {
        x: item.x,
        y: item.y,
        cols: item.cols,
        rows: item.rows,
      } as GridsterItem;
      gridsterItem['widget'] = item.widget;
      return gridsterItem;
    });
  }

  get page(): DashboardPage {
    return this._page;
  }

  addItem(): void {
    this.items?.push({
      x: 0,
      y: 0,
      cols: 1,
      rows: 1,
      widget: {
        type: 'PLACEHOLDER',
        identifier: uuidv4(),
      },
    });
    this.options!!.api!!.resize!!();
    this.dashboardService.updateItems(this.page, this.items);
  }

  removeItem(item: GridsterItem) {
    this.items.splice(this.items.indexOf(item), 1);
    this.dashboardService.updateItems(this.page, this.items);
  }

  itemChanged(item: GridsterItem) {
    this.dashboardService.updateItem(this.page, item);
  }
}
