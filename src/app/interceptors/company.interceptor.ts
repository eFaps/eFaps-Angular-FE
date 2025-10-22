import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable, effect, inject } from '@angular/core';
import { LocalStorageService } from 'ngx-localstorage';
import { Observable } from 'rxjs';

import { Company } from '../model/user';
import { UserService } from '../services/user.service';

@Injectable()
export class CompanyInterceptor implements HttpInterceptor {
  private readonly storageService = inject(LocalStorageService);
  private readonly userService = inject(UserService);

  currentCompany: Company | null | undefined =
    this.storageService.get<Company>('currentCompany');

  constructor() {
    effect(() => {
      const company = this.userService.company();
      if (company) {
        this.currentCompany = company;
        this.storageService.set<Company>('currentCompany', this.currentCompany);
      }
    });
  }

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler,
  ): Observable<HttpEvent<unknown>> {
    // exclude the call for user current to not use any company
    if (this.currentCompany && this.currentCompany.uuid && !request.url.endsWith("/ui/user/current")) {
      request = request.clone({
        setHeaders: {
          'X-CONTEXT-COMPANY': this.currentCompany.uuid,
        },
      });
    }
    return next.handle(request);
  }
}
