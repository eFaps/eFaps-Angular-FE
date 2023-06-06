import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MenuEntry } from '../model/menu';
import { Observable } from 'rxjs';
import { UtilService } from './util.service';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  constructor(private http: HttpClient, private utilService: UtilService) {}

  getMainMenu(): Observable<MenuEntry[]> {
    const url = `${this.utilService.evalApiUrl()}/ui/nav`;
    return this.http.get<MenuEntry[]>(url);
  }
}
