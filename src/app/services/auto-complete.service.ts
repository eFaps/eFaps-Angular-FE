import { AutoComplete } from '../model/auto-complete';
import { UtilService } from './util.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AutoCompleteService {
  constructor(
    private http: HttpClient,
    private utilService: UtilService,
  ) {}

  search(fieldId: string, query: string): Observable<AutoComplete> {
    const url = `${this.utilService.evalApiUrl()}/ui/autocomplete/${fieldId}`;
    const values: any = {};
    values[fieldId + '_query'] = query;
    return this.http.post<AutoComplete>(url, { values });
  }
}
