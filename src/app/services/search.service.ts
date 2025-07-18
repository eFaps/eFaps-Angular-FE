import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { Search, SearchResult } from '../model/search';
import { UtilService } from './util.service';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private http = inject(HttpClient);
  private utilService = inject(UtilService);

  private searchContent: any;

  getSearch(cmdId: string): Observable<Search[]> {
    const url = `${this.utilService.evalApiUrl()}/ui/search/${cmdId}`;
    return this.http.get<Search[]>(url);
  }

  query(
    cmdId: string,
    queryParams?: Map<String, any>,
  ): Observable<SearchResult> {
    const url = `${this.utilService.evalApiUrl()}/ui/search/${cmdId}/query`;
    const params: any =
      queryParams == null ? undefined : Object.fromEntries(queryParams);
    return this.http.get<SearchResult>(url, { params });
  }

  persist(searchContent: any) {
    this.searchContent = searchContent;
  }

  restore(): any {
    return this.searchContent;
  }

  clear() {
    this.searchContent = undefined;
  }

  hasPersistedSearch(): boolean {
    return this.searchContent != null;
  }
}
