import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { UtilService } from './util.service';
import { AutoComplete } from 'primeng/autocomplete';

@Injectable({
  providedIn: 'root',
})
export class ExecService {
  constructor(private http: HttpClient, private utilService: UtilService) {}

  exec(id: string, values?: Map<String, any>): Observable<AutoComplete> {
    const url = `${this.utilService.evalApiUrl()}/ui/exec/${id}`;
    const payload: any = values == null ? {} : {
      values:  Object.fromEntries(values)
    }
    return this.http.post<AutoComplete>(url, payload);
  }
}
