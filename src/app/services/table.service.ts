import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Table } from '../model/table';

@Injectable({
  providedIn: 'root',
})
export class TableService {
  constructor(private http: HttpClient) {}

  getTable(id: string): Observable<Table> {
    const url = `${environment.baseUrl}/ui/table/${id}`;
    return this.http.get<Table>(url);
  }
}
