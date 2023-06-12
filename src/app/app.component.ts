import { Component, OnInit } from '@angular/core';
import { MenuItem, PrimeNGConfig } from 'primeng/api';
import { MenuService } from './services/menu.service';
import { MenuAction, MenuEntry } from './model/menu';
import { Router } from '@angular/router';
import { UserService } from './services/user.service';
import { User } from './model/user';
import { ExecService } from './services/exec.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'eFaps-Angular-FE';
  menuItems: MenuItem[] = [];
  _user: User | undefined;
  companyLabel: string  | undefined ;

  constructor(
    private router: Router,
    private primengConfig: PrimeNGConfig,
    private menuService: MenuService,
    private userService: UserService,
    private execService: ExecService
  ) {}

  ngOnInit() {
    this.primengConfig.ripple = true;
    this.userService.getCurrentUser().subscribe({
      next: (user) => {
        this.user = user;
        this.menuService.getMainMenu().subscribe({
          next: (items) =>
            (this.menuItems = items.map((item) => this.getMenuItem(item))),
        });
      },
    });
  }

  set user(user: User | undefined) {
    if (user) {
      this.companyLabel =  user.companies.find((element) => {
        return element.current == true;
      })?.name
    }
    this._user = user
  }

  get user(): User | undefined {
    return this._user
  }

  getMenuItem(item: MenuEntry): MenuItem {
    return {
      id: item.id,
      label: item.label,
      items:
        item.children.length > 0
          ? item.children.map((item) => this.getMenuItem(item))
          : undefined,
      command: this.evalAction(item),
    };
  }

  evalAction(item: MenuEntry): ((event?: any) => void) | undefined {
    switch (item.action.type) {
      case 'GRID':
        return (event) => {
          this.callGrid(event);
        };
      case 'EXEC':
        return (event) => {
          this.execService.exec(item.id).subscribe({
            next: (_) => {
              console.log('run exec');
            },
          });
        };
    }
    return undefined;
  }

  callGrid(event?: any) {
    const menuItem = event.item as MenuItem;
    this.router.navigate(['table', menuItem.id]);
  }
}
