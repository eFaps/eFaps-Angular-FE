import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { saveAs } from 'file-saver';
import { Observable, map } from 'rxjs';

import { DownloadFile } from '../model/download';
import { UtilService } from './util.service';

@Injectable({
  providedIn: 'root',
})
export class DownloadService {
  private http = inject(HttpClient);
  private utilService = inject(UtilService);

  execute(downloadKey: string): Observable<DownloadFile> {
    const url = `${this.utilService.evalApiUrl()}/ui/download/${downloadKey}`;
    return this.http
      .get(url, { params: {}, observe: 'response', responseType: 'blob' })
      .pipe(
        map((resp) => {
          const contDis = resp.headers.get('content-disposition');
          const match = /filename="(.+)"/.exec(contDis!!);
          return {
            blob: resp.body!!,
            fileName: match == null ? 'file' : match[1],
          };
        }),
      );
  }

  download(downloadKey: string) {
    this.execute(downloadKey).subscribe({
      next: (downloadFile) => {
        saveAs(downloadFile.blob, downloadFile.fileName);
      },
    });
  }
}
