import { HttpClient } from '@angular/common/http';
import { Injectable, WritableSignal, signal } from '@angular/core';
import { Observable, map } from 'rxjs';

import { Company, User } from '../model/user';
import { UtilService } from './util.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  company: WritableSignal<Company | undefined> = signal(undefined);

  constructor(private http: HttpClient, private utilService: UtilService) {}

  getCurrentUser(sync?: boolean): Observable<User> {
    const url = `${this.utilService.evalApiUrl()}/ui/user/current`;
    let options = undefined;
    if (sync) {
      options = { params: { sync: true } };
    }
    console.log('sync', sync);
    return this.http.get<User>(url, options).pipe(
      map((user) => {
        if (user.companies.length > 1) {
          var currentCompany = user.companies.find((element) => {
            return element.current == true;
          });
          this.company.set(currentCompany);
        } else {
          this.company.set(undefined);
        }
        return user;
      })
    );
  }

  setCompany(company: Company): Observable<User> {
    this.company.set(company);
    return this.getCurrentUser();
  }

  getCompanies(): Observable<Company[]> {
    const url = `${this.utilService.evalApiUrl()}/ui/user/companies`;
    return this.http.get<Company[]>(url);
  }
}
