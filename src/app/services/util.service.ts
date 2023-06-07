import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UtilService {
  constructor() {}

  evalApiUrl(): String {
    let hostname;
    if (environment.apiHostname) {
      hostname = environment.apiHostname;
    } else {
      hostname = window.location.hostname.replace('.app', '');
    }
    return hostname.startsWith('http')
      ? `${hostname}${environment.apiBaseUrl}`
      : `https://${hostname}${environment.apiBaseUrl}`;
  }
}
