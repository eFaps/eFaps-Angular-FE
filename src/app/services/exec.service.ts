import { ExecResponse } from '../model/exec';
import { DownloadService } from './download.service';
import { UtilService } from './util.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ExecService {
  constructor(
    private http: HttpClient,
    private downloadService: DownloadService,
    private utilService: UtilService,
  ) {}

  exec(id: string, values?: Map<String, any>): Observable<ExecResponse> {
    const url = `${this.utilService.evalApiUrl()}/ui/exec/${id}`;
    const payload: any =
      values == null
        ? {}
        : {
            values: Object.fromEntries(values),
          };
    return this.http.post<ExecResponse>(url, payload).pipe(
      tap((execResponse) => {
        if (execResponse.downloadKey != null) {
          this.downloadService.download(execResponse.downloadKey);
        }
      }),
    );
  }
}
