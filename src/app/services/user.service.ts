import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, WritableSignal, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, map, of, throwError } from 'rxjs';
import { LocalStorage } from '@efaps/ngx-store';
import { Company, User } from '../model/user';
import { UtilService } from './util.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  company: WritableSignal<Company | undefined> = signal(undefined);

  @LocalStorage() private lsComp: Company | undefined;

  constructor(
    private http: HttpClient,
    private router: Router,
    private utilService: UtilService
  ) {}

  getCurrentUser(sync?: boolean): Observable<User> {
    const url = `${this.utilService.evalApiUrl()}/ui/user/current`;
    let options = undefined;
    if (sync) {
      options = { params: { sync: true } };
    }
    return this.http.get<User>(url, options).pipe(
      catchError((error) => {
        if (sync && error.status === 403) {
          // that means that this is a valid first time login
          this.router.navigate(['first-time-user']);
          return of();
        }
        return throwError(
          () => new Error('Something bad happened; please try again later.')
        );
      }),
      map((user) => {
        if (user.companies.length > 1) {
          var currentCompany = user.companies.find((element) => {
            return element.current == true;
          });
          this.lsComp = currentCompany
          this.company.set(currentCompany);
        } else {
          this.lsComp = undefined
          this.company.set(undefined);
        }
        return user;
      })
    );
  }

  setCompany(company: Company): Observable<User> {
    this.lsComp = company
    this.company.set(company);
    return this.getCurrentUser();
  }

  getCompanies(): Observable<Company[]> {
    const url = `${this.utilService.evalApiUrl()}/ui/user/companies`;
    return this.http.get<Company[]>(url);
  }

  firstTimeUser() {
    const url = `${this.utilService.evalApiUrl()}/first-time-user`;
    return this.http.get(url);
  }
}
