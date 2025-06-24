import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { FieldUpdateResponse } from '../model/field-update';
import { UtilService } from './util.service';
import { ValueService } from './value.service';

@Injectable({
  providedIn: 'root',
})
export class FieldUpdateService {
  private http = inject(HttpClient);
  private utilService = inject(UtilService);
  private valueService = inject(ValueService);

  execute(fieldId: string, index?: number): Observable<FieldUpdateResponse> {
    const url = `${this.utilService.evalApiUrl()}/ui/field-update/${fieldId}`;
    const val = this.valueService.values();
    const values: any = val != null ? Object.fromEntries(val) : {};
    if (index != null) {
      values['eFapsRSR'] = index;
    }
    return this.http.post<FieldUpdateResponse>(url, { values });
  }
}
