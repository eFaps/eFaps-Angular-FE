import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UtilService } from './util.service';
import { Observable } from 'rxjs';
import { Search, SearchResult } from '../model/search';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private http: HttpClient, private utilService: UtilService) {}

  getSearch(cmdId: string): Observable<Search[]> {
    const url = `${this.utilService.evalApiUrl()}/ui/search/${cmdId}`;
    return this.http.get<Search[]>(url);
  }

  query(cmdId: string): Observable<SearchResult> {
    const url = `${this.utilService.evalApiUrl()}/ui/search/${cmdId}/query`;
    return this.http.get<SearchResult>(url);
  }
}
