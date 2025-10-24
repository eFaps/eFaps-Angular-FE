import { HttpClient } from '@angular/common/http';
import {
  Injectable,
  WritableSignal,
  signal,
  inject,
  effect,
} from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'ngx-localstorage';
import { Observable, catchError, map, of, throwError } from 'rxjs';

import { Company, User } from '../model/user';
import { UtilService } from './util.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private http = inject(HttpClient);
  private router = inject(Router);
  private readonly storageService = inject(LocalStorageService);

  private utilService = inject(UtilService);

  currentCompany: Company | null | undefined =
    this.storageService.get<Company>('currentCompany');

  company: WritableSignal<Company | undefined> = signal(undefined);

  constructor() {
    if (this.currentCompany != null) {
      this.company.set(this.currentCompany as Company);
    }
    effect(() => {
      const comp = this.company();
      if (comp) {
        this.storageService.set<Company>('currentCompany', comp);
      } else {
        this.storageService.remove('currentCompany');
      }
    });
  }

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
          () => new Error('Something bad happened; please try again later.'),
        );
      }),
      map((user) => {
        if (user.companies.length > 1) {
          var currentCompany = user.companies.find((element) => {
            if (this.company()) {
              return this.company()?.uuid == element.uuid;
            } else {
              return element.current;
            }
          });
          this.company.set(currentCompany);
        } else {
          this.company.set(undefined);
        }
        return user;
      }),
    );
  }

  setCompany(company: Company): Observable<void> {
    this.company.set(company);
    return new Observable((subscriber) => {
      subscriber.next();
    });
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
