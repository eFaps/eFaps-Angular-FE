import { DownloadFile } from '../model/download';
import { UtilService } from './util.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { saveAs } from 'file-saver';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DownloadService {
  constructor(
    private http: HttpClient,
    private utilService: UtilService,
  ) {}

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
