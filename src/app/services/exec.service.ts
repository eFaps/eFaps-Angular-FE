import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { UtilService } from './util.service';

@Injectable({
  providedIn: 'root',
})
export class ExecService {
  constructor(private http: HttpClient, private utilService: UtilService) {}

  exec(id: string): Observable<any> {
    const url = `${this.utilService.evalApiUrl()}/ui/exec/${id}`;
    return this.http.post(url, {});
  }
}
