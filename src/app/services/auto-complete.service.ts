import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { AutoComplete } from '../model/auto-complete';
import { UtilService } from './util.service';

@Injectable({
  providedIn: 'root',
})
export class AutoCompleteService {
  private http = inject(HttpClient);
  private utilService = inject(UtilService);

  search(fieldId: string, query: string): Observable<AutoComplete> {
    const url = `${this.utilService.evalApiUrl()}/ui/autocomplete/${fieldId}`;
    const values: any = {};
    values[fieldId + '_query'] = query;
    return this.http.post<AutoComplete>(url, { values });
  }
}
