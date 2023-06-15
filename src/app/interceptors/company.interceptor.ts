import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Company } from '../model/user';
import { UserService } from '../services/user.service';

@Injectable()
export class CompanyInterceptor implements HttpInterceptor {
  currentCompany: Company | undefined;

  constructor(private userService: UserService) {
    this.userService.company.subscribe({
      next: (company) => (this.currentCompany = company),
    });
  }

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (this.currentCompany && this.currentCompany.uuid) {
      request = request.clone({
        setHeaders: {
          'X-CONTEXT-COMPANY': this.currentCompany.uuid,
        },
      });
    }
    return next.handle(request);
  }
}
