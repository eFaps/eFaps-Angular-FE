import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Content, Outline } from '../model/content';
import { UIModule } from '../model/module';
import { UtilService } from './util.service';

@Injectable({
  providedIn: 'root',
})
export class ContentService {
  constructor(private http: HttpClient, private utilService: UtilService) {}

  getContent(oid: string): Observable<Content | UIModule> {
    const url = `${this.utilService.evalApiUrl()}/ui/content/${oid}`;
    return this.http.get<Content | UIModule>(url);
  }

  getContentWithCmd(
    oid: string,
    cmdId: string
  ): Observable<Outline | UIModule> {
    const url = `${this.utilService.evalApiUrl()}/ui/content/${oid}/${cmdId}`;
    return this.http.get<Outline | UIModule>(url);
  }
}
