import { Search, SearchResult } from '../model/search';
import { UtilService } from './util.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private searchContent: any;

  constructor(
    private http: HttpClient,
    private utilService: UtilService,
  ) {}

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
