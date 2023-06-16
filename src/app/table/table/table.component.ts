import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, FilterMetadata, MenuItem, TableState } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { combineLatest } from 'rxjs';
import { ModalContentComponent } from 'src/app/content/modal-content/modal-content.component';
import { MenuEntry } from 'src/app/model/menu';
import { ContentService } from 'src/app/services/content.service';
import { ExecService } from 'src/app/services/exec.service';
import { TableService } from 'src/app/services/table.service';

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
  elements: any[] = [];
  selectionMode: 'single' | 'multiple' | null | undefined = null;
  selectedElements: any[] = [];
  title: string = '';
  loading = true;
  menuItems: MenuItem[] = [];
  storageKey = "temp"
  globalSearch = ""

  constructor(
    private route: ActivatedRoute,
    private confirmationService: ConfirmationService,
    private dialogService: DialogService,
    private contentService: ContentService,
    private tableService: TableService,
    private execService: ExecService
  ) { }

  ngOnInit(): void {
    this.loading = true;
    combineLatest([this.route.queryParams, this.route.params]).subscribe(
      (parameters) => {
        this.id = parameters[1]['id'];
        this.oid = parameters[0]['oid'];
        this.storageKey = this.id!!
        this.loadData();
      }
    );
  }

  stateRestore(event:   TableState) {
    console.log(event)
    if (event.filters && event.filters["global"]) {
      this.globalSearch = (event.filters["global"] as FilterMetadata).value
    }
  }

  loadData() {
    this.tableService.getTable(this.id!!, this.oid).subscribe({
      next: (val) => {
        this.title = val.header;
        this.cols = val.columns;
        this.elements = val.values;
        this.selectionMode = val.selectionMode;
        this.loading = false;
        this.menuItems = val.menu
          ? val.menu.map((item) => this.getMenuItem(item))
          : [];
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

  evalAction(item: MenuEntry): ((event?: any) => void) | undefined {
    switch (item.action.type) {
      case 'EXEC':
        return (event) => {
          this.execAction(item);
        };

      case 'FORM':
        return (event) => {
          this.formAction(item);
        };
    }
    return undefined;
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
    });
  }

  formAction(item: MenuEntry) {
    if (item.action.modal) {
      this.contentService.getContentWithCmd('none', item.id).subscribe({
        next: (outline) => {
          const dialogRef = this.dialogService.open(ModalContentComponent, {
            data: {
              item,
              outline,
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
}
