import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { Content, Outline } from '../model/content';
import { UIModule } from '../model/module';
import { UtilService } from './util.service';

@Injectable({
  providedIn: 'root',
})
export class ContentService {
  private http = inject(HttpClient);
  private utilService = inject(UtilService);

  getContent(oid: string): Observable<Content | UIModule> {
    const url = `${this.utilService.evalApiUrl()}/ui/content/${oid}`;
    return this.http.get<Content | UIModule>(url);
  }

  getContentWithCmd(
    oid: string,
    cmdId: string,
    selectedOids?: string[],
  ): Observable<Outline | UIModule> {
    const url = `${this.utilService.evalApiUrl()}/ui/content/${oid}/${cmdId}`;
    let params = new HttpParams();
    if (selectedOids) {
      selectedOids.forEach((val) => {
        params = params.append('selOids', val);
      });
    }
    return this.http.get<Outline | UIModule>(url, { params: params });
  }
}
