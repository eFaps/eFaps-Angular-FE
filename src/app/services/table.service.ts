import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Table } from '../model/table';
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
}
