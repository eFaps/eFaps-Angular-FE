import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MenuItem } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { TabMenu } from 'primeng/tabmenu';
import { TabViewChangeEvent } from 'primeng/tabview';
import { Classification } from 'src/app/model/classification';
import { Content, Section, isOutline } from 'src/app/model/content';
import { MenuEntry } from 'src/app/model/menu';
import { ContentService } from 'src/app/services/content.service';
import { ExecService } from 'src/app/services/exec.service';

import { ModalContentComponent } from '../modal-content/modal-content.component';
import { ModalModuleContentComponent } from '../modal-module-content/modal-module-content.component';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss'],
  providers: [ConfirmationService],
})
export class ContentComponent implements OnInit {
  oid: string | undefined;
  tabs: MenuEntry[] = [];
  menuItems: MenuItem[] = [];
  mainHeader: string = '';
  sections: Section[] = [];
  activeItem: MenuItem | undefined = undefined;
  classifications: Classification[] | undefined;

  activeIndex: number = 0;

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private router: Router,
    private route: ActivatedRoute,
    private confirmationService: ConfirmationService,
    private dialogService: DialogService,
    private contentService: ContentService,
    private execService: ExecService
  ) {
    // work arround to force scrollable
    //this.tabs = Array.from({ length: 50 }, (_, i) => ({ label: '' }));
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
          this.menuItems = val.outline.menu
            ? val.outline.menu.map((item) => this.getMenuItem(item))
            : [];
          this.mainHeader = val.outline.header;
          this.sections = val.outline.sections;
          this.classifications = val.outline.classifications;
          if (val.selected != this.tabs[0].id) {
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
        } else {
          console.log(val);
        }
      },
    });
  }

  getMenuItem(item: MenuEntry): MenuItem {
    return {
      id: item.id,
      label: item.label,
      items:
        item.children && item.children.length > 0
          ? item.children.map((item) => this.getMenuItem(item))
          : undefined,
      command: this.evalAction(item),
    };
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

  evalAction(item: MenuEntry): ((event?: any) => void) | undefined {
    switch (item.action.type) {
      case 'EXEC':
        return (event) => {
          if (item.action.verify) {
            this.confirmationService.confirm({
              message: item.action.verify.question,
              header: 'Confirmation',
              icon: 'pi pi-exclamation-triangle',
              accept: () => {
                this.execService.exec(item.id).subscribe({
                  next: (_) => {
                    console.log('run exec');
                  },
                });
              },
              reject: () => {},
            });
          } else {
            this.execService.exec(item.id).subscribe({
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
    }
    return undefined;
  }

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
}
