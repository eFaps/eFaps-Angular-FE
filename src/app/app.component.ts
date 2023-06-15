import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem, PrimeNGConfig } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';

import { MenuEntry } from './model/menu';
import { Company, User } from './model/user';
import { ExecService } from './services/exec.service';
import { LoaderService } from './services/loader.service';
import { MenuService } from './services/menu.service';
import { UserService } from './services/user.service';
import { CompanyChooserComponent } from './standalone/company-chooser/company-chooser.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [DialogService],
})
export class AppComponent implements OnInit {
  title = 'eFaps-Angular-FE';
  menuItems: MenuItem[] = [];
  _user: User | undefined;
  company: Company | undefined;
  showCompanySelector: boolean = false;
  isLoading = false;

  constructor(
    private router: Router,
    private primengConfig: PrimeNGConfig,
    private dialogService: DialogService,
    private loaderService: LoaderService,
    private menuService: MenuService,
    private userService: UserService,
    private execService: ExecService
  ) {}

  ngOnInit() {
    this.loaderService.isLoading.subscribe({
      next: (isLoading) => (this.isLoading = isLoading),
    });
    this.primengConfig.ripple = true;
    this.userService.company.subscribe({
      next: (company) => (this.company = company),
    });
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
    if (user && user.companies.length > 0) {
      if (user.companies.length > 1) {
        this.showCompanySelector = true;
      } else {
        this.company = user.companies[0];
      }
    } else {
      this.showCompanySelector = false;
    }
    this._user = user;
  }

  get user(): User | undefined {
    return this._user;
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

  switchCompany() {
    const ref = this.dialogService.open(CompanyChooserComponent, {
      header: 'Compania',
      width: '300px',
    });
    ref.onClose.subscribe((company: Company) => {
      if (company) {
        if (company.uuid != this.company?.uuid) {
          this.userService.setCompany(company).subscribe({
            next: () => {
              this.router.navigateByUrl('/').then(() => {
                this.menuService.getMainMenu().subscribe({
                  next: (items) =>
                    (this.menuItems = items.map((item) =>
                      this.getMenuItem(item)
                    )),
                });
              });
            },
          });
        }
      }
    });
  }
}
