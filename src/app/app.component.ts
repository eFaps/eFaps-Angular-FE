import {
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
  computed,
  effect,
  inject,
  signal,
} from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { KEYCLOAK_EVENT_SIGNAL, KeycloakEventType } from 'keycloak-angular';
import Keycloak from 'keycloak-js';
import localeEs from 'primelocale/es.json';
import { MenuItem } from 'primeng/api';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ButtonModule } from 'primeng/button';
import { PrimeNG } from 'primeng/config';
import { DividerModule } from 'primeng/divider';
import { DialogService } from 'primeng/dynamicdialog';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { Menubar, MenubarModule } from 'primeng/menubar';
import { Popover, PopoverModule } from 'primeng/popover';
import { ProgressBarModule } from 'primeng/progressbar';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';

import { environment } from 'src/environments/environment';
import { ModalContentComponent } from './content/modal-content/modal-content.component';
import { ModalModuleContentComponent } from './content/modal-module-content/modal-module-content.component';
import { SearchContentComponent } from './content/search-content/search-content.component';
import { isOutline } from './model/content';
import { ResultElement, SearchResult } from './model/index-search';
import { MenuEntry } from './model/menu';
import { Company, User } from './model/user';
import { BreadcrumbService } from './services/breadcrumb.service';
import { ContentService } from './services/content.service';
import { ExecService } from './services/exec.service';
import { IndexSearchService } from './services/index-search.service';
import { LoaderService } from './services/loader.service';
import {
  MenuActionProvider,
  MenuService,
  toMenuItem,
} from './services/menu.service';
import { SearchService } from './services/search.service';
import { StyleService } from './services/style.service';
import { ThemeService } from './services/theme.service';
import { UserService } from './services/user.service';
import { isQA } from './services/util.service';
import { CompanyChooserComponent } from './standalone/company-chooser/company-chooser.component';
import { ThemeChooserComponent } from './standalone/theme-chooser/theme-chooser.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [DialogService],
  imports: [
    RouterOutlet,
    ProgressBarModule,
    MenubarModule,
    ToastModule,
    TableModule,
    IconFieldModule,
    InputIconModule,
    InputTextModule,
    PopoverModule,
    ButtonModule,
    DividerModule,
    ThemeChooserComponent,
    BreadcrumbModule,
  ],
})
export class AppComponent implements OnInit {
  private router = inject(Router);
  private dialogService = inject(DialogService);
  private loaderService = inject(LoaderService);
  private menuService = inject(MenuService);
  private userService = inject(UserService);
  private execService = inject(ExecService);
  private contentService = inject(ContentService);
  private indexSearchService = inject(IndexSearchService);
  private searchService = inject(SearchService);
  private breadcrumbService = inject(BreadcrumbService);
  private styleService = inject(StyleService);

  private readonly primeng: PrimeNG = inject(PrimeNG);
  private readonly keycloak = inject(Keycloak);
  private readonly renderer = inject(Renderer2);
  private readonly themeService = inject(ThemeService);

  company = this.userService.company;

  currentCompany = this.company();

  title = 'eFaps-Angular-FE';

  mainMenu = signal<MenuEntry[]>([]);

  menuItems = computed(() => {
    return this.mainMenu()?.map((item) =>
      toMenuItem(item, this.actionProvider),
    );
  });

  isLoading = this.loaderService.isLoading;

  breadcrumbs = this.breadcrumbService.breadcrumbs;

  _user: User | undefined;

  userLookuped = false;

  showCompanySelector: boolean = false;
  searchResult: SearchResult | undefined;
  searchElements: any[] = [];
  version = environment.version;

  showRestoreSearch = this.searchService.hasPersistedSearch;

  constructor() {
    const userService = this.userService;

    const keycloakSignal = inject(KEYCLOAK_EVENT_SIGNAL);
    effect(() => {
      const keycloakEvent = keycloakSignal();
      if (keycloakEvent.type === KeycloakEventType.AuthSuccess) {
        userService.getCurrentUser(true).subscribe();
      }
    });
    effect(() => {
      if (this.userService.companySwitched()) {
        this.loadMenu();
        this.home();
      }
    });
  }

  ngOnInit() {
    this.userService.getCurrentUser().subscribe({
      next: (user) => {
        this.user = user;
        this.primeng.translation = localeEs.es;
        this.userLookuped = true;
      },
      error: () => {
        this.userLookuped = true;
      },
    });
    this.themeService.init();
    if (isQA()) {
      this.renderer.addClass(document.body, 'qa');
    }
  }

  @ViewChild(Menubar) set menuBar(element: Menubar) {
    if (element) {
      const observer = new ResizeObserver((_entries: ResizeObserverEntry[]) => {
        this.styleService.menuBarHeight.set(
          element.el.nativeElement.offsetHeight,
        );
      });
      observer.observe(element.el.nativeElement);
    }
  }

  @ViewChild('breadcrumbWrapper') set breadcrumb(element: ElementRef) {
    if (element) {
      const observer = new ResizeObserver((_entries: ResizeObserverEntry[]) => {
        this.styleService.breadcrumbHeight.set(
          element.nativeElement.offsetHeight,
        );
      });
      observer.observe(element.nativeElement);
    }
  }

  set user(user: User | undefined) {
    if (user && user.companies.length > 0) {
      if (user.companies.length > 1) {
        this.showCompanySelector = true;
      } else {
        this.userService.setCompany(user.companies[0]);
      }
    } else {
      this.showCompanySelector = false;
    }
    this._user = user;
    this.loadMenu();
  }

  get user(): User | undefined {
    return this._user;
  }

  actionProvider: MenuActionProvider = (item: MenuEntry) => {
    switch (item.action.type) {
      case 'GRID':
        return (_event) => {
          this.gridAction(item);
        };
      case 'EXEC':
        return (_event) => {
          this.execService.exec(item.id).subscribe({
            next: (_) => {
              console.log('run exec');
            },
          });
        };
      case 'FORM':
        return (_event) => {
          this.formAction(item);
        };
      case 'SEARCH':
        return (_event) => {
          this.searchAction(item);
        };
      case 'STRBRWSR':
        return (_event) => {
          this.strctBrwsrAction(item);
        };
    }
    return undefined;
  };

  loadMenu() {
    this.menuService.getMainMenu().subscribe({
      next: (entries) => this.mainMenu.set(entries),
    });
  }

  strctBrwsrAction(item: MenuEntry) {
    this.router.navigate(['strctbrws', item.id]);
  }

  gridAction(item: MenuEntry) {
    this.router.navigate(['table', item.id]);
  }

  switchCompany() {
    const ref = this.dialogService.open(CompanyChooserComponent, {
      header: 'Compania',
      width: '300px',
      modal: true,
    });
    ref!.onClose.subscribe((company: Company) => {
      if (company) {
        this.userService.setCompany(company);
      }
    });
  }

  formAction(item: MenuEntry) {
    if (item.action.modal) {
      this.contentService.getContentWithCmd('none', item.id).subscribe({
        next: (outline) => {
          if (isOutline(outline)) {
            const dialogRef = this.dialogService.open(ModalContentComponent, {
              data: {
                item,
                outline,
              },
            });
          } else {
            const dialogRef = this.dialogService.open(
              ModalModuleContentComponent,
              {
                data: {
                  item,
                  uimodule: outline,
                },
              },
            );
          }
        },
      });
    } else {
      this.router.navigate(['content', 'form', item.id]);
    }
  }

  searchAction(item: MenuEntry) {
    this.searchService.getSearch(item.id).subscribe({
      next: (searches) => {
        const dialogRef = this.dialogService.open(SearchContentComponent, {
          data: {
            item,
            searches,
          },
        });
      },
    });
  }

  indexSearch(event: Event, query: string, op: Popover) {
    this.indexSearchService.search(query).subscribe({
      next: (result) => {
        this.searchResult = result;
        this.searchElements = this.searchResult.elements;
        op.show(event);
      },
    });
  }

  focusSearch(event: Event, op: Popover) {
    if (this.searchResult != null && this.searchResult.hitCount > 0) {
      op.show(event);
    }
  }

  followLink(element: ResultElement) {
    this.router.navigate(['content', element.oid]);
  }

  home() {
    this.router.navigate(['/dashboard'], { onSameUrlNavigation: 'reload' });
  }

  restoreSearch() {
    const dialogRef = this.dialogService.open(SearchContentComponent, {
      data: {
        restore: true,
      },
    });
  }

  signOut() {
    this.keycloak.logout();
  }

  breadcrumbOnClick(menuItem: MenuItem) {
    if (menuItem.command) {
      menuItem.command({ item: menuItem });
    }
  }
}
