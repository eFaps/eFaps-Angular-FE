import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {
  ConfirmationService,
  MenuItem,
  TreeNode,
  TreeTableNode,
} from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogService } from 'primeng/dynamicdialog';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { MenuModule } from 'primeng/menu';
import { MenubarModule } from 'primeng/menubar';
import { PopoverModule } from 'primeng/popover';
import { TreeTableModule } from 'primeng/treetable';
import { combineLatest } from 'rxjs';

import { ColumnComponent } from '../column/column.component';
import { ModalContentComponent } from 'src/app/content/modal-content/modal-content.component';
import { ModalModuleContentComponent } from 'src/app/content/modal-module-content/modal-module-content.component';
import { isOutline } from 'src/app/model/content';
import { MenuEntry } from 'src/app/model/menu';
import { StructureBrowserEntry } from 'src/app/model/table';
import { ContentService } from 'src/app/services/content.service';
import { ExecService } from 'src/app/services/exec.service';
import { TableService } from 'src/app/services/table.service';

@Component({
  selector: 'app-structure-browser',
  templateUrl: './structure-browser.component.html',
  styleUrls: ['./structure-browser.component.scss'],
  providers: [ConfirmationService],
  imports: [
    TreeTableModule,
    ButtonModule,
    ColumnComponent,
    FormsModule,
    ButtonModule,
    MenuModule,
    MenubarModule,
    ConfirmDialogModule,
    InputTextModule,
    InputGroupModule,
    InputGroupAddonModule,
  ],
})
export class StructureBrowserComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private confirmationService = inject(ConfirmationService);
  private dialogService = inject(DialogService);
  private tableService = inject(TableService);
  private contentService = inject(ContentService);
  private execService = inject(ExecService);

  loading: boolean;
  id: any;
  oid: any;
  title: string = '';
  cols: any[] = [];
  menuItems: MenuItem[] = [];
  globalSearch = '';
  selectionMode: 'single' | 'checkbox' | undefined;
  elements: TreeNode[] = [];
  selectedElements: TreeTableNode<any> | TreeTableNode<any>[] | null = [];
  togglerColIdx = 0;

  constructor() {
    this.loading = true;
  }

  ngOnInit(): void {
    combineLatest([this.route.queryParams, this.route.params]).subscribe(
      (parameters) => {
        this.id = parameters[1]['id'];
        this.oid = parameters[0]['oid'];

        this.loadData();
      },
    );
  }

  loadData() {
    this.tableService.getStructureBrowser(this.id!!, this.oid).subscribe({
      next: (val) => {
        this.title = val.header;
        this.cols = val.columns;
        this.elements = val.values.map((entry) => this.toTreeNode(entry));
        if ('multiple' == val.selectionMode) {
          this.selectionMode = 'checkbox';
        } else {
          this.selectionMode = val.selectionMode;
        }
        this.menuItems = val.menu
          ? val.menu.map((item) => this.toMenuItem(item))
          : [];
        const toggleIndex = this.cols.findIndex((col) => {
          return col.field === val.toggleColumn;
        });
        this.togglerColIdx = toggleIndex > -1 ? toggleIndex : 0;
      },
    });
  }

  toTreeNode(entry: StructureBrowserEntry): TreeNode {
    return {
      data: entry.values,
      children: entry.children.map((entry) => this.toTreeNode(entry)),
    };
  }

  toMenuItem(item: MenuEntry): MenuItem {
    return {
      id: item.id,
      label: item.label,
      items:
        item.children && item.children.length > 0
          ? item.children.map((item) => this.toMenuItem(item))
          : undefined,
      command: this.evalAction(item),
    };
  }

  evalAction(item: MenuEntry): ((event?: any) => void) | undefined {
    switch (item.action.type) {
      case 'EXEC':
        return (_event) => {
          this.execAction(item);
        };

      case 'FORM':
        return (_event) => {
          this.formAction(item);
        };

      case 'SEARCH':
        return (event) => {
          console.log(event);
        };
    }
    return undefined;
  }

  formAction(item: MenuEntry) {
    if (item.action.modal) {
      this.contentService.getContentWithCmd('none', item.id).subscribe({
        next: (outline) => {
          if (isOutline(outline)) {
            let eFapsSelectedOids: string[] | undefined;
            if (this.selectedElements != null) {
              eFapsSelectedOids = (
                this.selectedElements as TreeTableNode<any>[]
              ).map((element) => {
                return element.data.OID;
              });
            }
            const dialogRef = this.dialogService.open(ModalContentComponent, {
              data: {
                item,
                outline,
                eFapsSelectedOids,
              },
            });
            dialogRef.onClose.subscribe({
              next: (execResponse) => {
                if (execResponse.reload) {
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
                  parentOid: this.oid,
                },
              },
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

  execAction(item: MenuEntry) {
    if (item.action.verify) {
      this.confirmationService.confirm({
        message: item.action.verify.question,
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.exec(item.id);
        },
        reject: () => {},
      });
    } else {
      this.exec(item.id);
    }
  }

  exec(id: string) {
    const map = new Map<string, any>();

    if (this.selectedElements != null) {
      const oids = (this.selectedElements as TreeTableNode<any>[]).map(
        (element) => {
          return element.data.OID;
        },
      );
      map.set('eFapsSelectedOids', oids);
    }

    this.execService.exec(id, map).subscribe({
      next: (execResponse) => {
        if (execResponse.reload) {
          this.loadData();
        }
      },
      error: (_) => {
        this.selectedElements = [];
      },
    });
  }
}
