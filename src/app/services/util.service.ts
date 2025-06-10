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

const regexExp =
  /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;

export function isUUID(val: string): boolean {
  return regexExp.test(val);
}

export function isQA(): boolean {
 return window.location.hostname.includes("qa")
}
