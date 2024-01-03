import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Filter, StructureBrowser, Table } from '../model/table';
import { UtilService } from './util.service';

@Injectable({
  providedIn: 'root',
})
export class TableService {
  constructor(private http: HttpClient, private utilService: UtilService) {}

  getTable(id: string, oid?: string): Observable<Table> {
    const url = `${this.utilService.evalApiUrl()}/ui/table/${id}`;
    const params: any = oid ? { oid: oid } : {};
    return this.http.get<Table>(url, { params: params });
  }

  getStructureBrowser(id: string, oid?: string): Observable<StructureBrowser> {
    const url = `${this.utilService.evalApiUrl()}/ui/strctbrws/${id}`;
    const params: any = oid ? { oid: oid } : {};
    return this.http.get<StructureBrowser>(url, { params: params });
  }

  getFilters(id: string): Observable<Filter[]> {
    const url = `${this.utilService.evalApiUrl()}/ui/table/${id}/filters`;
    return this.http.get<Filter[]>(url);
  }

  updateFilters(id: string, filters: Filter[]): Observable<void> {
    const url = `${this.utilService.evalApiUrl()}/ui/table/${id}/filters`;
    return this.http.put<void>(url, filters); 
  }
}
