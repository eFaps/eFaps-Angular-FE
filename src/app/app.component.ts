import {
  Component,
  ElementRef,
  OnInit,
  Signal,
  ViewChild,
  computed,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';
import { DialogService } from 'primeng/dynamicdialog';
import { Menubar } from 'primeng/menubar';
import { Popover } from 'primeng/popover';
import { environment } from 'src/environments/environment';

import { default as translation } from '../assets/es.json';
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

  mainMenu: Signal<MenuEntry[] | undefined> = toSignal(
    this.menuService.getMainMenu()
  );
  menuItems = computed(() => {
    return this.mainMenu()?.map((item) =>
      toMenuItem(item, this.actionProvider)
    );
  });

  isLoading = this.loaderService.isLoading;
  company = this.userService.company;
  breadcrumbs = this.breadcrumbService.breadcrumbs;

  _user: User | undefined;

  showCompanySelector: boolean = false;
  searchResult: SearchResult | undefined;
  searchElements: any[] = [];
  version = environment.version;

  constructor(
    private router: Router,
    private dialogService: DialogService,
    private loaderService: LoaderService,
    private keycloakService: KeycloakService,
    private menuService: MenuService,
    private userService: UserService,
    private execService: ExecService,
    private contentService: ContentService,
    private indexSearchService: IndexSearchService,
    private searchService: SearchService,
    private breadcrumbService: BreadcrumbService,
    private styleService: StyleService
  ) {}

  ngOnInit() {

    this.userService.getCurrentUser().subscribe({
      next: (user) => {
        this.user = user;
      },
    });
  }

  @ViewChild(Menubar) set menuBar(element: Menubar) {
    if (element) {
      const observer = new ResizeObserver((_entries: ResizeObserverEntry[]) => {
        this.styleService.menuBarHeight.set(
          element.el.nativeElement.offsetHeight
        );
      });
      observer.observe(element.el.nativeElement.childNodes[0]);
    }
  }

  @ViewChild('breadcrumbWrapper') set breadcrumb(element: ElementRef) {
    if (element) {
      const observer = new ResizeObserver((_entries: ResizeObserverEntry[]) => {
        this.styleService.breadcrumbHeight.set(
          element.nativeElement.offsetHeight
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
        this.company.set(user.companies[0]);
      }
    } else {
      this.showCompanySelector = false;
    }
    this._user = user;
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
    });
    ref.onClose.subscribe((company: Company) => {
      if (company) {
        if (company.uuid != this.company()?.uuid) {
          this.userService.setCompany(company).subscribe({
            next: () => {
              this.router
                .navigateByUrl('/', { onSameUrlNavigation: 'reload' })
                .then(() => {
                  this.menuService.getMainMenu().subscribe();
                });
            },
          });
        }
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
              }
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
    this.router.navigate(['/dashboard']);
  }

  showRestoreSearch(): boolean {
    return this.searchService.hasPersistedSearch();
  }

  restoreSearch() {
    const dialogRef = this.dialogService.open(SearchContentComponent, {
      data: {
        restore: true,
      },
    });
  }

  signOut() {
    this.keycloakService.logout();
  }
}
