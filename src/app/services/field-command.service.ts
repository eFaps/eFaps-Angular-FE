import { HttpClient } from '@angular/common/http';
import { inject, Injectable, linkedSignal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { FieldCommandResponse } from '../model/field-command';
import { UtilService } from './util.service';
import { ValueService } from './value.service';

@Injectable({
  providedIn: 'root',
})
export class FieldCommandService {
  private http = inject(HttpClient);
  private utilService = inject(UtilService);
  private valueService = inject(ValueService);

  private currentResponse = new BehaviorSubject<
    FieldCommandResponse | undefined
  >(undefined);
  response = this.currentResponse.asObservable();

  execute(fieldId: string, index?: number) {
    const url = `${this.utilService.evalApiUrl()}/ui/field-command/${fieldId}`;
    const val = this.valueService.values();
    const values: any = val != null ? Object.fromEntries(val) : {};
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
