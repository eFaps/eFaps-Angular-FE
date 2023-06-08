import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UtilService } from './util.service';
import { User } from '../model/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient, private utilService: UtilService) {}

  getCurrentUser(): Observable<User> {
    const url = `${this.utilService.evalApiUrl()}/ui/user/current`;
    return this.http.get<User>(url);
  }
}
