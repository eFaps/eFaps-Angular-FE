import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UtilService } from './util.service';
import { Company, User } from '../model/user';
import { BehaviorSubject, Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private currentCompany = new BehaviorSubject<Company | undefined>(undefined);
  company = this.currentCompany.asObservable();

  constructor(private http: HttpClient, private utilService: UtilService) {}

  getCurrentUser(): Observable<User> {
    const url = `${this.utilService.evalApiUrl()}/ui/user/current`;
    return this.http.get<User>(url).pipe(
      map((user) => {
        if (user.companies.length > 1) {
          var cC = user.companies.find((element) => {
            return element.current == true;
          });
          this.currentCompany.next(cC);
        } else {
          this.currentCompany.next(undefined);
        }
        return user;
      })
    );
  }

  setCompany(company: Company): Observable<User> {
    this.currentCompany.next(company);
    return this.getCurrentUser();
  }
}
