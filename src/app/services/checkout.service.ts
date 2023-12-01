import { Injectable } from '@angular/core';
import { UtilService } from './util.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
 
  constructor(private http: HttpClient, private utilService: UtilService) { }

  checkout(oid: string) {
    const url = `${this.utilService.evalApiUrl()}/checkout`;
    return this.http.get(url, { params: { oid }, responseType: 'blob' })
  }
}
