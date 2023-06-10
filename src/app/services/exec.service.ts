import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UtilService } from './util.service';
import { Observable } from 'rxjs';

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
