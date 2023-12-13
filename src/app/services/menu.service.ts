import { HttpClient } from '@angular/common/http';
import { Injectable, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MenuItem, MenuItemCommandEvent } from 'primeng/api';

import { MenuEntry } from '../model/menu';
import { UtilService } from './util.service';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  constructor(private http: HttpClient, private utilService: UtilService) {}

  getMainMenu(): Signal<MenuEntry[] | undefined> {
    const url = `${this.utilService.evalApiUrl()}/ui/nav`;
    const observable = this.http.get<MenuEntry[]>(url)
    return toSignal(observable);
  }
}

export function toMenuItems(
  menu: MenuEntry[] | undefined,
  actionProvider: MenuActionProvider
): MenuItem[] {
  if (menu != null) {
    if (menu.length == 1 && menu[0].children && menu[0].children.length > 0) {
      return menu[0].children.map((item) => toMenuItem(item, actionProvider));
    }
    return menu.map((item) => toMenuItem(item, actionProvider));
  }
  return [];
}

export function toMenuItem(
  item: MenuEntry,
  actionProvider: MenuActionProvider
): MenuItem {
  return {
    id: item.id,
    label: item.label,
    items:
      item.children && item.children.length > 0
        ? item.children.map((item) => toMenuItem(item, actionProvider))
        : undefined,
    command: actionProvider(item),
  };
}

export interface MenuActionProvider {
  (entry: MenuEntry): MenuAction | undefined;
}

export interface MenuAction {
  (event: MenuItemCommandEvent): void;
}
