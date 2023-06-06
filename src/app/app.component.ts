import { Component, OnInit } from '@angular/core';
import { MenuItem, PrimeNGConfig } from 'primeng/api';
import { MenuService } from './services/menu.service';
import { MenuAction, MenuEntry } from './model/menu';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'eFaps-Angular-FE';
  menuItems: MenuItem[] = [];

  constructor(
    private router: Router,
    private primengConfig: PrimeNGConfig,
    private menuService: MenuService
  ) {}

  ngOnInit() {
    this.primengConfig.ripple = true;

    this.menuService.getMainMenu().subscribe({
      next: (items) =>
        (this.menuItems = items.map((item) => this.getMenuItem(item))),
    });
  }

  getMenuItem(item: MenuEntry): MenuItem {
    return {
      id: item.id,
      label: item.label,
      items:
        item.children.length > 0
          ? item.children.map((item) => this.getMenuItem(item))
          : undefined,
      command: this.evalAction(item.action),
    };
  }

  evalAction(action: MenuAction): ((event?: any) => void) | undefined {
    if (action.type == 'GRID') {
      return (event) => {
        this.callGrid(event);
      };
    }
    return undefined;
  }

  callGrid(event?: any) {
    const menuItem = event.item as MenuItem;
    this.router.navigate(['table', menuItem.id]);
  }
}
