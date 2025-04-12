import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { FieldCommandResponse } from '../model/field-command';
import { UtilService } from './util.service';
import { ValueService } from './value.service';

@Injectable({
  providedIn: 'root',
})
export class FieldCommandService {
  private values: Map<String, any> | undefined;

  private currentResponse = new BehaviorSubject<
    FieldCommandResponse | undefined
  >(undefined);
  response = this.currentResponse.asObservable();

  constructor(
    private http: HttpClient,
    private utilService: UtilService,
    private valueService: ValueService,
  ) {
    this.valueService.values.subscribe({
      next: (values) => (this.values = values),
    });
  }

  execute(fieldId: string, index?: number) {
    const url = `${this.utilService.evalApiUrl()}/ui/field-command/${fieldId}`;
    const values: any =
      this.values != null ? Object.fromEntries(this.values) : {};
    if (index != null) {
      values['eFapsRSR'] = index;
    }
    this.http.post<FieldCommandResponse>(url, { values }).subscribe({
      next: (cmdResp) => {
        this.currentResponse.next(cmdResp);
      },
    });
  }
}
