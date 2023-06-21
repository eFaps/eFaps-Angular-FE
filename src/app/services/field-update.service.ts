import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AutoComplete } from 'primeng/autocomplete';
import { Observable } from 'rxjs';

import { FieldUpdateResponse } from '../model/field-update';
import { UtilService } from './util.service';
import { ValueService } from './value.service';

@Injectable({
  providedIn: 'root',
})
export class FieldUpdateService {
  values: Map<String, any> | undefined;

  constructor(
    private http: HttpClient,
    private utilService: UtilService,
    private valueService: ValueService
  ) {
    this.valueService.values.subscribe({
      next: (values) => (this.values = values),
    });
  }

  execute(fieldId: string): Observable<FieldUpdateResponse> {
    const url = `${this.utilService.evalApiUrl()}/ui/field-update/${fieldId}`;
    const values: any =
      this.values != null ? Object.fromEntries(this.values) : {};
    return this.http.post<FieldUpdateResponse>(url, { values });
  }
}
