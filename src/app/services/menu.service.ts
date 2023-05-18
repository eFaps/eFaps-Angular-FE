import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { MenuEntry } from '../model/menu';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  constructor(private http: HttpClient) {}

  getMainMenu(): Observable<MenuEntry[]> {
    const url = `${environment.baseUrl}/ui/nav`;
    return this.http.get<MenuEntry[]>(url);
  }
}
