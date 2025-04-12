import { FieldUpdateResponse } from '../model/field-update';
import { UtilService } from './util.service';
import { ValueService } from './value.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FieldUpdateService {
  values: Map<String, any> | undefined;

  constructor(
    private http: HttpClient,
    private utilService: UtilService,
    private valueService: ValueService,
  ) {
    this.valueService.values.subscribe({
      next: (values) => (this.values = values),
    });
  }

  execute(fieldId: string, index?: number): Observable<FieldUpdateResponse> {
    const url = `${this.utilService.evalApiUrl()}/ui/field-update/${fieldId}`;

    const values: any =
      this.values != null ? Object.fromEntries(this.values) : {};
    if (index != null) {
      values['eFapsRSR'] = index;
    }
    return this.http.post<FieldUpdateResponse>(url, { values });
  }
}
