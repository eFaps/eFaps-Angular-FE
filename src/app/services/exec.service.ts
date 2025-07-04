import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, tap } from 'rxjs';

import { ExecResponse } from '../model/exec';
import { DownloadService } from './download.service';
import { UtilService } from './util.service';

@Injectable({
  providedIn: 'root',
})
export class ExecService {
  private http = inject(HttpClient);
  private downloadService = inject(DownloadService);
  private utilService = inject(UtilService);

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
