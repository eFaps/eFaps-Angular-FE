import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Content, Outline } from '../model/content';
import { UtilService } from './util.service';

@Injectable({
  providedIn: 'root',
})
export class ContentService {
  constructor(private http: HttpClient, private utilService: UtilService) {}

  getContent(oid: string): Observable<Content> {
    const url = `${this.utilService.evalApiUrl()}/ui/content/${oid}`;
    return this.http.get<Content>(url);
  }

  getContentWithCmd(oid: string, cmdId: string): Observable<Outline> {
    const url = `${this.utilService.evalApiUrl()}/ui/content/${oid}/${cmdId}`;
    return this.http.get<Outline>(url);
  }
}
