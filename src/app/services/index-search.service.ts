import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { SearchResult } from '../model/index-search';
import { UtilService } from './util.service';

@Injectable({
  providedIn: 'root',
})
export class IndexSearchService {
  private http = inject(HttpClient);
  private utilService = inject(UtilService);

  search(query: string): Observable<SearchResult> {
    const url = `${this.utilService.evalApiUrl()}/ui/index`;
    const params: any = { query };
    return this.http.get<SearchResult>(url, { params: params });
  }
}
