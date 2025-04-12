import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { Classification } from '../model/classification';
import { Section } from '../model/content';
import { UtilService } from './util.service';

@Injectable({
  providedIn: 'root',
})
export class ClassificationService {
  private currentValue = new BehaviorSubject<Classification[]>([]);
  classifications = this.currentValue.asObservable();

  constructor(
    private http: HttpClient,
    private utilService: UtilService,
  ) {}

  getClassifications(ids: string[]): Observable<Classification[]> {
    const url = `${this.utilService.evalApiUrl()}/ui/classification`;
    const params: any = {};
    params.id = ids;
    return this.http.get<Classification[]>(url, { params });
  }

  setClassifications(classifications: Classification[]) {
    this.currentValue.next(classifications);
  }

  getSections(classification: Classification): Observable<Section[]> {
    const url = `${this.utilService.evalApiUrl()}/ui/classification/${
      classification.id
    }/sections`;
    return this.http.get<Section[]>(url);
  }
}
