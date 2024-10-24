import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
  effect,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MenuItem } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { TabViewChangeEvent } from 'primeng/tabview';
import { Subscription } from 'rxjs';
import { Classification } from 'src/app/model/classification';
import { Section, isOutline } from 'src/app/model/content';
import { MenuEntry } from 'src/app/model/menu';
import { BreadcrumbService } from 'src/app/services/breadcrumb.service';
import { ContentService } from 'src/app/services/content.service';
import { ExecService } from 'src/app/services/exec.service';
import { MenuActionProvider, toMenuItems } from 'src/app/services/menu.service';
import { StyleService } from 'src/app/services/style.service';
import { TableComponent } from 'src/app/table/table/table.component';

import { FormContentComponent } from '../form-content/form-content.component';
import { ModalContentComponent } from '../modal-content/modal-content.component';
import { ModalModuleContentComponent } from '../modal-module-content/modal-module-content.component';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss'],
  providers: [ConfirmationService],
})
export class ContentComponent implements OnInit, OnDestroy {
  oid: string | undefined;
  tabs: MenuEntry[] = [];
  menuItems: MenuItem[] = [];
  mainHeader: string = '';
  sections: Section[] = [];
  activeItem: MenuItem | undefined = undefined;
  classifications: Classification[] | undefined;
  hasBreadcrumbs = false;

  activeIndex: number = 0;
  private subscribtions = new Subscription();

  contentOutletId: string | undefined;
  contentHeight: string = '500px';

  constructor(
    breadcrumbService: BreadcrumbService,
    private changeDetectorRef: ChangeDetectorRef,
    private router: Router,
    private route: ActivatedRoute,
    private confirmationService: ConfirmationService,
    private dialogService: DialogService,
    private contentService: ContentService,
    private execService: ExecService,
    private styleService: StyleService
  ) {
    effect(() => {
      this.hasBreadcrumbs = breadcrumbService.breadcrumbs().length > 0;
    });
  }
  ngOnDestroy(): void {
    this.subscribtions.unsubscribe();
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.oid = params['oid'];
      this.loadData();
    });
  }

  loadData() {
    this.contentService.getContent(this.oid!!).subscribe({
      next: (val) => {
        if ('nav' in val) {
          this.activeIndex = 0;
          this.tabs = [];
          this.changeDetectorRef.detectChanges();

          this.tabs = val.nav;
          this.menuItems = toMenuItems(val.outline.menu, this.actionProvider);
          this.mainHeader = val.outline.header;
          this.sections = val.outline.sections;
          this.classifications = val.outline.classifications;
          if (this.contentOutletId != null) {
            const newIndex = this.tabs.findIndex((entry) => {
              return entry.id == this.contentOutletId;
            });
            if (newIndex > -1) {
              this.activeIndex = newIndex;
            }
          } else if (val.selected != this.tabs[0].id) {
            let navIndex;
            this.tabs.forEach((item, index) => {
              if (item.id == val.selected) {
                navIndex = index;
              }
            });
            if (navIndex) {
              this.navigate(navIndex);
            }
          }
          this.evaluateContentHeight();
        } else {
          console.log(val);
        }
      },
    });
  }

  evalRouterLink(item: MenuEntry): any | undefined {
    if (item.action) {
      switch (item.action.type) {
        case 'GRID':
          return { outlets: { contentOutlet: ['table', item.id] } };
        case 'FORM':
          return { outlets: { contentOutlet: ['form', item.id] } };
        default:
      }
    }
    return undefined;
  }

  actionProvider: MenuActionProvider = (item: MenuEntry) => {
    switch (item.action.type) {
      case 'EXEC':
        return (event) => {
          var valueMap = new Map<String, any>();
          if (this.oid) {
            valueMap.set('eFapsOID', this.oid);
          }
          if (item.action.verify) {
            this.confirmationService.confirm({
              message: item.action.verify.question,
              header: 'Confirmation',
              icon: 'pi pi-exclamation-triangle',
              accept: () => {
                this.execService.exec(item.id, valueMap).subscribe({
                  next: (_) => {
                    console.log('run exec');
                  },
                });
              },
              reject: () => {},
            });
          } else {
            this.execService.exec(item.id, valueMap).subscribe({
              next: (_) => {
                console.log('run exec');
              },
            });
          }
        };
      case 'FORM':
        return (event) => {
          this.formAction(item);
        };
      default:
        console.log('No item action type?');
    }
    return undefined;
  };

  formAction(item: MenuEntry) {
    if (item.action.modal) {
      this.contentService.getContentWithCmd(this.oid!!, item.id).subscribe({
        next: (outline) => {
          if (isOutline(outline)) {
            const dialogRef = this.dialogService.open(ModalContentComponent, {
              data: {
                item,
                outline,
              },
            });
            dialogRef.onClose.subscribe({
              next: (execResponse) => {
                if (execResponse != null && execResponse.reload) {
                  this.loadData();
                }
              },
            });
          } else {
            const dialogRef = this.dialogService.open(
              ModalModuleContentComponent,
              {
                data: {
                  item,
                  uimodule: outline,
                  oid: this.oid,
                },
              }
            );
            dialogRef.onClose.subscribe({
              next: (execResponse) => {
                if (execResponse != null && execResponse.reload) {
                  this.loadData();
                }
              },
            });
          }
        },
      });
    }
  }

  onTabChange(event: TabViewChangeEvent) {
    this.navigate(event.index);
  }

  navigate(index: number) {
    if (index > 0) {
      const link = this.evalRouterLink(this.tabs[index]);
      this.router.navigate(['../../content', this.oid, link], {
        queryParams: { oid: this.oid },
      });
    } else {
      this.router.navigate(['../../content', this.oid]);
    }
  }

  onActivate(event: any) {
    if (event instanceof TableComponent) {
      (event as TableComponent).idEmitter.subscribe({
        next: (id: string) => {
          this.contentOutletId = id;
        },
      });
    } else if (event instanceof FormContentComponent) {
    }
  }

  @ViewChild('contentHeader') set contentHeader(element: ElementRef) {
    if (element) {
      const observer = new ResizeObserver((_entries: ResizeObserverEntry[]) => {
        this.styleService.contentHeaderHeight.set(
          element.nativeElement.offsetHeight
        );
      });
      observer.observe(element.nativeElement);
    }
  }

  evaluateContentHeight() {
    let height = window.innerHeight;

    const menuBarHeight = Math.round(this.styleService.menuBarHeight());
    const breadcrumbHeight = Math.round(this.styleService.breadcrumbHeight());
    const contenHeaderHeight = Math.round(
      this.styleService.contentHeaderHeight()
    );

    height = height - menuBarHeight - breadcrumbHeight - 2;

    this.contentHeight = `${height}px`;
    /**
    console.log(`innerHeight: ${window.innerHeight}
      menuBarHeight: ${menuBarHeight}, 
      breadcrumbHeight: ${breadcrumbHeight}, 
      contenHeaderHeight: ${contenHeaderHeight},
      contentHeight: ${this.contentHeight}`);
    */
  }
}
