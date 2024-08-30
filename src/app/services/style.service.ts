import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StyleService {
  menuBarHeight = signal(0);

  constructor() {}
}
