import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';
import { Company } from '../model/user';

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
