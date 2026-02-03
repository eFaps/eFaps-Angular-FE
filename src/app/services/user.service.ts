import { HttpClient } from '@angular/common/http';
import {
  Injectable,
  WritableSignal,
  effect,
  inject,
  linkedSignal,
  signal,
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

  private _company: WritableSignal<Company | undefined> = signal(undefined, {
    equal: (a: Company | undefined, b: Company | undefined) => {
      if (a === undefined && b === undefined) {
        return true;
      }
      if (
        (a === undefined && b !== undefined) ||
        (a !== undefined && b === undefined)
      ) {
        return false;
      }
      return a!.uuid == b!.uuid;
    },
  });

  readonly company = this._company.asReadonly();

  companySwitched = linkedSignal<Company | undefined, boolean>({
    source: this.company,
    computation: (newOptions, previous) => {
      // return true if we change bewteen two companies
      return previous !== undefined;
    },
  });

  constructor() {
    const currentCompany = this.storageService.get<Company>('currentCompany');
    if (currentCompany != null) {
      this.setCompany(currentCompany);
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
        if (user.companies.length == 1) {
          this.setCompany(user.companies[0]);
        } else if (user.companies.length > 1) {
          var currentCompany = user.companies.find((element) => {
            if (this.company()) {
              return this.company()?.uuid == element.uuid;
            } else {
              return element.current;
            }
          });
          this.setCompany(currentCompany);
        } else {
          this.setCompany(undefined);
        }
        return user;
      }),
    );
  }

  setCompany(company: Company | undefined) {
    this._company.set(company);
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
