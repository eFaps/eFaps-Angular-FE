import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Dashboard } from '../model/dashboard';
import { UtilService } from './util.service';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  constructor(private http: HttpClient, private utilService: UtilService) {}

  getDashboard(): Observable<Dashboard> {
    const url = `${this.utilService.evalApiUrl()}/ui/dashboard`;
    return this.http.get<Dashboard>(url);
  }

  getWidget(widgetId: string): Observable<any> {
    const url = `${this.utilService.evalApiUrl()}/ui/dashboard/widgets/${widgetId}`;
    return this.http.get<any>(url);
  }
}
