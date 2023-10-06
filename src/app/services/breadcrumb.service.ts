import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { MenuItem, MenuItemCommandEvent } from 'primeng/api';
import { BehaviorSubject, filter } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BreadcrumbService {
  maxEntries = 7;
  private breadcrumbSubject = new BehaviorSubject<MenuItem[]>([]);
  breadcrumbs = this.breadcrumbSubject.asObservable();
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

    const items = this.breadcrumbSubject.getValue();
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

    this.breadcrumbSubject.next(items);
  }

  navigate(event: MenuItemCommandEvent) {
    this.router.navigateByUrl(event.item!!.id!!);
    const items = this.breadcrumbSubject.getValue();
    var index = items.findIndex((menuItem) => {
      return JSON.stringify(event.item) == JSON.stringify(menuItem);
    });
    if (index > -1) {
      items.splice(index, 1);
    }
    this.breadcrumbSubject.next(items);
  }
}
