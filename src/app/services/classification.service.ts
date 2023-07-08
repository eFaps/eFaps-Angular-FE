import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UtilService } from './util.service';
import { Classification } from '../model/classification';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClassificationService {

  constructor(private http: HttpClient, private utilService: UtilService) {}

  getClassifications(ids: string[]): Observable<Classification[]> {
    const url = `${this.utilService.evalApiUrl()}/ui/classification`;
    const params: any = {};
    params.id = ids
    return this.http.get<Classification[]>(url,  { params });
  }
}
