import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import {
  CompactType,
  DisplayGrid,
  GridType,
  GridsterConfig,
  GridsterItem,
} from 'angular-gridster2';
import { DashboardPage } from 'src/app/model/dashboard';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss'],
})
export class PageComponent {
  _page: DashboardPage = { items: [] };

  options: GridsterConfig | undefined;
  items: GridsterItem[] = [];

  _editMode = false;

  constructor(private ref: ChangeDetectorRef) {}

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
      defaultItemRows: 1
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
    this.items?.push({ x: 1, y: 1, cols: 1, rows: 1 ,widget: { 
      type: 'PLACEHOLDER',identifier: uuidv4() }});
    //this.ref.detectChanges();
    this.options!!.api!!.resize!!();
  }
  removeItem() {}
}
