import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UtilService } from './util.service';
import { Observable } from 'rxjs';
import { Content } from '../model/content';

@Injectable({
  providedIn: 'root'
})
export class ContentService {

  constructor(private http: HttpClient, private utilService: UtilService) {}

  getContent(oid: string): Observable<Content> {
    const url = `${this.utilService.evalApiUrl()}/ui/content/${oid}`;
    return this.http.get<Content>(url);
  }

}