import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  private http = inject(HttpClient);

  public sso:
    | {
        url: string;
        realm: string;
        clientId: string;
      }
    | undefined;

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
