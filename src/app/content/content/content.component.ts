import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MenuItem } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { Section } from 'src/app/model/content';
import { MenuEntry } from 'src/app/model/menu';
import { ContentService } from 'src/app/services/content.service';
import { ExecService } from 'src/app/services/exec.service';

import { ModalContentComponent } from '../modal-content/modal-content.component';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss'],
  providers: [ConfirmationService],
})
export class ContentComponent implements OnInit {
  oid: string | undefined;
  tabs: MenuItem[] = [];
  menuItems: MenuItem[] = [];
  mainHeader: string = '';
  sections: Section[] = [];
  activeItem: MenuItem | undefined = undefined;
  showSections = true;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private confirmationService: ConfirmationService,
    private dialogService: DialogService,
    private contentService: ContentService,
    private execService: ExecService
  ) {
    // work arround to force scrollable
    this.tabs = Array.from({ length: 50 }, (_, i) => ({ label: '' }));
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
        this.tabs = val.nav.map((item, index) => this.getTabItem(item, index));
        this.activeItem = this.tabs[0];
        this.menuItems = val.outline.menu
          ? val.outline.menu.map((item) => this.getMenuItem(item))
          : [];
        this.mainHeader = val.outline.header;
        this.sections = val.outline.sections;
        if (val.selected != this.tabs[0].id) {
          var defaultItem = this.tabs.find((item) => {
            return item.id == val.selected;
          });
          if (defaultItem) {
            this.showSections = false;
            const cmds = ['content', this.oid, ...defaultItem.routerLink];
            const url = this.router.createUrlTree(cmds, {
              queryParams: defaultItem.queryParams,
            });
            this.router.navigateByUrl(url.toString());
            this.activeItem = defaultItem;
          }
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

  getTabItem(item: MenuEntry, index: number): MenuItem {
    return {
      id: item.id,
      label: index == 0 ? undefined : item.label,
      icon: index == 0 ? 'pi pi-fw pi-map-marker' : undefined,
      routerLink: index == 0 ? undefined : this.evalRouterLink(item),
      command:
        index == 0
          ? (event) => {
              this.mainClick();
            }
          : (event) => {
              this.showSections = false;
            },
      queryParams: index == 0 ? undefined : { oid: this.oid },
    };
  }

  evalRouterLink(item: MenuEntry): any | undefined {
    if (item.action) {
      switch (item.action.type) {
        case 'GRID':
          return [{ outlets: { contentOutlet: ['table', item.id] } }];
        case 'FORM':
          return [{ outlets: { contentOutlet: ['form', item.id] } }];
        default:
      }
    }
    return undefined;
  }

  mainClick() {
    this.router.navigate(['../../content', this.oid]);
    this.showSections = true;
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
        },
      });
    }
  }
}
