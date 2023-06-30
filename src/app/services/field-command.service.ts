import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UtilService } from './util.service';
import { ValueService } from './value.service';
import { FieldUpdateResponse } from '../model/field-update';
import { Observable } from 'rxjs';
import { FieldCommandResponse } from '../model/field-command';

@Injectable({
  providedIn: 'root'
})
export class FieldCommandService {

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

  execute(fieldId: string, index?: number): Observable<FieldCommandResponse> {
    const url = `${this.utilService.evalApiUrl()}/ui/field-command/${fieldId}`;

    const values: any =
      this.values != null ? Object.fromEntries(this.values) : {};
    if (index != null) {
      values['eFapsRSR'] = index;
    }
    return this.http.post<FieldCommandResponse>(url, { values });
  }
}
