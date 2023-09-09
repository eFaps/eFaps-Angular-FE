import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  public sso:
    | {
        url: string;
        realm: string;
        clientId: string;
      }
    | undefined;

  constructor(private http: HttpClient) {}

  load(): Promise<any> {
    return new Promise<any>((resolve) => {
      this.http.get('assets/config.json').subscribe({
        next: (config) => {
          Object.assign(this, config);
          resolve(config);
        },
      });
    });
  }
}
