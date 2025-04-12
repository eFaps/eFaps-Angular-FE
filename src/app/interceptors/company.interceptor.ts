import { Company } from '../model/user';
import { UserService } from '../services/user.service';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable, effect } from '@angular/core';
import { LocalStorage } from '@efaps/ngx-store';
import { Observable } from 'rxjs';

@Injectable()
export class CompanyInterceptor implements HttpInterceptor {
  @LocalStorage() currentCompany: Company | undefined;

  constructor(private userService: UserService) {
    localStorage.getItem('');
    effect(() => {
      this.currentCompany = this.userService.company();
    });
  }

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler,
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
