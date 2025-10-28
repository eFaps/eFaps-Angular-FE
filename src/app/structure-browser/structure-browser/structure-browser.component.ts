import { Component, OnInit, importProvidersFrom, inject } from '@angular/core';
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
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { MenuModule } from 'primeng/menu';
import { MenubarModule } from 'primeng/menubar';
import { TreeTableModule } from 'primeng/treetable';
import { combineLatest } from 'rxjs';

import { ColumnComponent } from '../column/column.component';
import { MenuEntry } from 'src/app/model/menu';
import { StructureBrowserEntry } from 'src/app/model/table';
import { ActionService } from 'src/app/services/action.service';
import { BreadcrumbService } from 'src/app/services/breadcrumb.service';
import { ExecService } from 'src/app/services/exec.service';
import { MenuActionProvider, toMenuItems } from 'src/app/services/menu.service';
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
  private tableService = inject(TableService);
  private execService = inject(ExecService);
  private breadcrumbService = inject(BreadcrumbService);

  private actionService = inject(ActionService);

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
        this.menuItems = toMenuItems(val.menu, this.actionProvider);
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

  actionProvider: MenuActionProvider = (item: MenuEntry) => {
    switch (item.action.type) {
      case 'EXEC':
        return (event) => {
          this.execAction(item);
        };
      case 'FORM':
        return (event) => {
          this.actionService
            .runFormAction(item, this.oid, this.selectedElements as any[])
            .subscribe({
              next: (execResponse) => {
                if (execResponse != null && execResponse.reload) {
                  this.loadData();
                }
              },
            });
        };
      case 'SEARCH':
        return (event) => {
          console.log(event);
        };
    }
    return undefined;
  };

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

  onNavEvent(event: any) {
    this.breadcrumbService.addEntry({
      label: this.title,
    });
  }
}
