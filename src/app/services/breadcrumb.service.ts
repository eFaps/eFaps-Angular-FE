import { Injectable, Signal, WritableSignal, signal } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { MenuItem, MenuItemCommandEvent } from 'primeng/api';
import { BehaviorSubject, filter } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BreadcrumbService {
  maxEntries = 7;
  breadcrumbs: WritableSignal<MenuItem[]> = signal([]);
  currentUrl: string = '';

  constructor(private router: Router) {
    this.router.events
      .pipe(
        filter((event) => {
          return event instanceof NavigationEnd;
        })
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
      return Array.from(items);
    });
  }
}
