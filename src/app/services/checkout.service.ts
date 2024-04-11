import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { UtilService } from './util.service';
import { DownloadFile } from '../model/download';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CheckoutService {
  constructor(private http: HttpClient, private utilService: UtilService) {}

  checkout(oid: string): Observable<DownloadFile> {
    const url = `${this.utilService.evalApiUrl()}/checkout`;
    return this.http.get(url, { params: { oid }, observe: 'response', responseType: 'blob' }).pipe(map(resp => {
      const contDis = resp.headers.get('content-disposition');
      const match = /filename="(.+)"/.exec(contDis!!)
      return {
        blob: resp.body!!,
        fileName: match == null ? "file": match[1]
      }
    }));
  }
}
