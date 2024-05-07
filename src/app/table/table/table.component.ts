import { Component, EventEmitter, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  ConfirmationService,
  FilterMetadata,
  MenuItem,
  TableState,
} from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { combineLatest } from 'rxjs';
import { ModalContentComponent } from 'src/app/content/modal-content/modal-content.component';
import { ModalModuleContentComponent } from 'src/app/content/modal-module-content/modal-module-content.component';
import { SearchContentComponent } from 'src/app/content/search-content/search-content.component';
import { isOutline } from 'src/app/model/content';
import { MenuEntry } from 'src/app/model/menu';
import { Column } from 'src/app/model/table';
import { BreadcrumbService } from 'src/app/services/breadcrumb.service';
import { ContentService } from 'src/app/services/content.service';
import { ExecService } from 'src/app/services/exec.service';
import { MenuActionProvider, toMenuItems } from 'src/app/services/menu.service';
import { SearchService } from 'src/app/services/search.service';
import { TableService } from 'src/app/services/table.service';

import { FilterComponent } from '../filter/filter.component';
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  providers: [ConfirmationService, DialogService],
})
export class TableComponent implements OnInit {
  id: string | undefined;
  oid: string | undefined;
  cols: any[] = [];
  columnOrder: string[] = [];
  elements: any[] = [];
  selectionMode: 'single' | 'multiple' | null | undefined = null;
  selectedElements: any[] = [];
  title: string = '';
  loading = true;
  menuItems: MenuItem[] = [];
  storageKey = 'temp';
  globalSearch = '';
  filtered: boolean = false;

  idEmitter = new EventEmitter<string>();

  constructor(
    private route: ActivatedRoute,
    private confirmationService: ConfirmationService,
    private dialogService: DialogService,
    private contentService: ContentService,
    private tableService: TableService,
    private execService: ExecService,
    private searchService: SearchService,
    private breadcrumbService: BreadcrumbService
  ) {}

  ngOnInit(): void {
    this.loading = true;
    combineLatest([this.route.queryParams, this.route.params]).subscribe(
      (parameters) => {
        this.id = parameters[1]['id'];
        this.oid = parameters[0]['oid'];
        this.storageKey = this.id!!;
        this.loadData();
        this.idEmitter.emit(this.id);
      }
    );
  }

  stateRestore(event: TableState) {
    if (event.filters && event.filters['global']) {
      this.globalSearch = (event.filters['global'] as FilterMetadata).value;
    }
    if (event.columnOrder) {
      this.columnOrder = event.columnOrder;
    }
  }

  loadData() {
    this.selectedElements = [];
    this.tableService.getTable(this.id!!, this.oid).subscribe({
      next: (val) => {
        this.title = val.header;
        this.evalColumns4Order(val.columns);
        this.filtered = val.filtered;
        this.elements = val.values;
        this.selectionMode = val.selectionMode;
        this.loading = false;
        this.menuItems = toMenuItems(val.menu, this.actionProvider);
      },
    });
  }

  private evalColumns4Order(columns: Column[]) {
    const co = this.columnOrder;
    if (
      this.columnOrder.length > 0 &&
      this.columnOrder.length == columns.length
    ) {
      columns.sort(function (a, b) {
        return co.indexOf(a.field) - co.indexOf(b.field);
      });
    }
    this.cols = columns;
  }

  actionProvider: MenuActionProvider = (item: MenuEntry) => {
    switch (item.action.type) {
      case 'EXEC':
        return (event) => {
          this.execAction(item);
        };

      case 'FORM':
        return (event) => {
          this.formAction(item);
        };

      case 'SEARCH':
        return (event) => {
          this.searchAction(item);
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
    const oids = this.selectedElements.map((element) => {
      return element.OID;
    });
    const map = new Map<string, any>();
    map.set('eFapsSelectedOids', oids);
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

  formAction(item: MenuEntry) {
    if (item.action.modal) {
      this.contentService.getContentWithCmd('none', item.id).subscribe({
        next: (outline) => {
          if (isOutline(outline)) {
            const dialogRef = this.dialogService.open(ModalContentComponent, {
              data: {
                item,
                outline,
                parentOid: this.oid,
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

  searchAction(item: MenuEntry) {
    if (item.action.modal) {
      this.searchService.getSearch(item.id).subscribe({
        next: (searches) => {
          const dialogRef = this.dialogService.open(SearchContentComponent, {
            data: {
              item,
              searches,
              oid: this.oid,
            },
          });
          dialogRef.onClose.subscribe({
            next: (execResponse) => {
              if (execResponse.reload) {
                this.loadData();
              }
            },
          });
        },
      });
    }
  }

  onNavEvent(event: any) {
    this.breadcrumbService.addEntry({
      label: this.title,
    });
  }

  filter() {
    const cmdId = this.id;
    const dialogRef = this.dialogService.open(FilterComponent, {
      data: {
        cmdId,
      },
    });
    dialogRef.onClose.subscribe({
      next: (_) => {
        this.loadData();
      },
    });
  }

  log(content: any) {
console.log(content)
  }
}
