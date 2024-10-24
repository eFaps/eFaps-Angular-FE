import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StyleService {
  menuBarHeight = signal(0);
  breadcrumbHeight = signal(0);
  contentHeaderHeight = signal(0);
  constructor() {}
}
