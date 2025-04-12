import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GridsterItem } from 'angular-gridster2';
import { Observable, tap } from 'rxjs';

import { Dashboard, DashboardPage } from '../model/dashboard';
import { UtilService } from './util.service';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  dashboard: Dashboard | undefined;

  constructor(
    private http: HttpClient,
    private utilService: UtilService,
  ) {}

  getDashboard(): Observable<Dashboard> {
    const url = `${this.utilService.evalApiUrl()}/ui/dashboard`;
    return this.http
      .get<Dashboard>(url)
      .pipe(tap((dashboard) => (this.dashboard = dashboard)));
  }

  getWidget(widgetId: string): Observable<any> {
    const url = `${this.utilService.evalApiUrl()}/ui/dashboard/widgets/${widgetId}`;
    return this.http.get<any>(url);
  }

  updateDashboard(dashboard: Dashboard) {
    const url = `${this.utilService.evalApiUrl()}/ui/dashboard`;
    return this.http.post<any>(url, dashboard);
  }

  persist() {
    if (this.dashboard) {
      this.updateDashboard(this.dashboard).subscribe({
        next: (_) => {
          console.log('persisted ' + this.dashboard);
        },
      });
    }
  }

  updateItems(page: DashboardPage, items: GridsterItem[]) {
    const existingPage = this.dashboard?.pages.find(
      (entry) => entry.key == page.key,
    );
    if (existingPage) {
      existingPage!!.items = items.map((item) => {
        return {
          x: item.x,
          y: item.y,
          cols: item.cols,
          rows: item.rows,
          widget: item['widget'],
        };
      });
    }
  }

  updateItem(page: DashboardPage, item: GridsterItem) {
    const existingPage = this.dashboard?.pages.find(
      (entry) => entry.key == page.key,
    );
    if (existingPage) {
      const existingItem = existingPage!!.items.find(
        (entry) => entry.widget?.identifier == item['widget'].identifier,
      );
      if (existingItem) {
        existingItem.x = item.x;
        existingItem.y = item.y;
        existingItem.cols = item.cols;
        existingItem.rows = item.rows;
      }
    }
  }
}
