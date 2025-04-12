import { SearchResult } from '../model/index-search';
import { UtilService } from './util.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class IndexSearchService {
  constructor(
    private http: HttpClient,
    private utilService: UtilService,
  ) {}

  search(query: string): Observable<SearchResult> {
    const url = `${this.utilService.evalApiUrl()}/ui/index`;
    const params: any = { query };
    return this.http.get<SearchResult>(url, { params: params });
  }
}
