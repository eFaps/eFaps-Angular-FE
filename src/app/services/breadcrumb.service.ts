import { Injectable, WritableSignal, signal, inject } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { MenuItem, MenuItemCommandEvent } from 'primeng/api';
import { filter } from 'rxjs';

import { StyleService } from './style.service';

@Injectable({
  providedIn: 'root',
})
export class BreadcrumbService {
  private router = inject(Router);
  private styleService = inject(StyleService);

  maxEntries = 7;
  breadcrumbs: WritableSignal<MenuItem[]> = signal([]);
  currentUrl: string = '';

  constructor() {
    this.router.events
      .pipe(
        filter((event) => {
          return event instanceof NavigationEnd;
        }),
      )
      .subscribe((event) => {
        this.currentUrl = (event as NavigationEnd).urlAfterRedirects;
      });
  }

  addEntry(entry: MenuItem) {
    entry.id = this.currentUrl;
    entry.command = (event) => {
      this.navigate(event);
    };

    this.breadcrumbs.update((items) => {
      var index = items.findIndex((menuItem) => {
        return JSON.stringify(entry) == JSON.stringify(menuItem);
      });
      if (index > -1) {
        items.splice(index, 1);
      }
      items.push(entry);

      if (items.length > this.maxEntries) {
        items.splice(0, items.length - this.maxEntries);
      }
      return Array.from(items);
    });
  }

  navigate(event: MenuItemCommandEvent) {
    this.router.navigateByUrl(event.item!!.id!!);
    this.breadcrumbs.update((items) => {
      var index = items.findIndex((menuItem) => {
        return JSON.stringify(event.item) == JSON.stringify(menuItem);
      });
      if (index > -1) {
        items.splice(index, 1);
      }
      if (items.length == 0) {
        this.styleService.breadcrumbHeight.set(0);
      }
      return Array.from(items);
    });
  }
}
