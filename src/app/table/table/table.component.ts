import { Component, EventEmitter, OnInit, inject, signal, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import FileSaver from 'file-saver';
import {
  ConfirmationService,
  FilterMetadata,
  MenuItem,
  TableState,
} from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogService } from 'primeng/dynamicdialog';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
import { Table, TableModule } from 'primeng/table';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { combineLatest } from 'rxjs';
import { Scroller, ScrollerModule } from 'primeng/scroller';


import { ColumnComponent } from '../column/column.component';
import { FilterComponent } from '../filter/filter.component';
import { SearchContentComponent } from 'src/app/content/search-content/search-content.component';
import { MenuEntry } from 'src/app/model/menu';
import { Column, Page } from 'src/app/model/table';
import { ActionService } from 'src/app/services/action.service';
import { BreadcrumbService } from 'src/app/services/breadcrumb.service';
import { ExecService } from 'src/app/services/exec.service';
import { MenuActionProvider, toMenuItems } from 'src/app/services/menu.service';
import { SearchService } from 'src/app/services/search.service';
import { StyleService } from 'src/app/services/style.service';
import { TableService } from 'src/app/services/table.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  providers: [ConfirmationService, DialogService],
  imports: [
    TableModule,
    PaginatorModule,
    ColumnComponent,
    ButtonModule,
    FormsModule,
    InputGroupModule,
    InputGroupAddonModule,
    TieredMenuModule,
    ConfirmDialogModule,
    ButtonModule,
  ],
})
export class TableComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private confirmationService = inject(ConfirmationService);
  private dialogService = inject(DialogService);
  private tableService = inject(TableService);
  private execService = inject(ExecService);
  private searchService = inject(SearchService);
  private breadcrumbService = inject(BreadcrumbService);
  private styleService = inject(StyleService);
  private actionService = inject(ActionService);

  tableRef = viewChild(Table);

  tableLoaded = signal(false);

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

  page: Page | undefined = undefined;

  idEmitter = new EventEmitter<string>();

  scrollHeight = signal<string>('500px');

  ngOnInit(): void {
    this.loading = true;
    combineLatest([this.route.queryParams, this.route.params]).subscribe(
      (parameters) => {
        this.id = parameters[1]['id'];
        this.oid = parameters[0]['oid'];
        this.storageKey = this.id!!;
        this.loadData();
        this.idEmitter.emit(this.id);
      },
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
        this.page = val.page;
        this.evalContentHeight();
        this.title = val.header;
        this.evalColumns4Order(val.columns);
        this.filtered = val.filtered;
        this.elements = val.values;
        this.selectionMode = val.selectionMode;
        this.loading = false;
        this.tableLoaded.set(true);
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
          this.actionService
            .runFormAction(item, this.oid, this.selectedElements as any[])
            .subscribe({
              next: (execResponse) => {
                if (execResponse != null && execResponse.reload) {
                  this.tableLoaded.set(false);
                  this.loadData();
                }
              },
            });
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
          dialogRef!.onClose.subscribe({
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
        cmdId: cmdId,
        cols: this.cols,
      },
      closable: true,
      modal: true,
    });
    dialogRef!.onClose.subscribe({
      next: (_) => {
        this.loadData();
      },
    });
  }

  onFilter(event: any) {
    const table = this.tableRef()
    if (table && table.scroller) {
      table.scroller.scrollHeight = this.scrollHeight();
    }
  }

  exportPdf() {
    import('jspdf').then((jspdf) => {
      import('jspdf-autotable').then((jspdfAutoTable) => {
        const exportColumns = this.cols.map((col) => ({
          header: col.header,
          dataKey: col.field,
        }));
        const doc = new jspdf.jsPDF('landscape');
        const totalPagesExp = '{total_pages_count_string}';
        jspdfAutoTable.autoTable(doc, {
          columns: exportColumns,
          body: this.elements,
          rowPageBreak: 'auto',
          didDrawPage: function (data) {
            let str =
              'Pagina ' + doc.getNumberOfPages() + ' de ' + totalPagesExp;
            doc.setFontSize(10);
            const pageSize = doc.internal.pageSize;
            const pageHeight = pageSize.getHeight();
            doc.text(str, data.settings.margin.left, pageHeight - 10);
          },
          margin: { top: 30 },
        });
        doc.putTotalPages(totalPagesExp);
        doc.save(this.title + '.pdf');
      });
    });
  }

  exportExcel() {
    import('xlsx').then((xlsx) => {
      const data: any[] = [];
      this.elements.forEach((element) => {
        const row: any = {};
        data.push(row);
        this.cols.forEach((col) => {
          row[col.header] = element[col.field];
        });
      });
      const worksheet = xlsx.utils.json_to_sheet(data);
      const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, {
        bookType: 'xlsx',
        type: 'array',
      });
      this.saveAsExcelFile(excelBuffer, this.title);
    });
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    let EXCEL_TYPE =
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    let EXCEL_EXTENSION = '.xlsx';
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE,
    });
    FileSaver.saveAs(data, fileName + EXCEL_EXTENSION);
  }

  get paginated(): boolean {
    return this.page != null;
  }

  onPageChange(event: PaginatorState) {
    this.loading = true;
    this.tableService
      .getPageData(this.id!!, event.rows!!, event.page!!, this.oid)
      .subscribe({
        next: (val) => {
          this.elements = val.values;
          const pageOptTemp = this.page?.pageOptions!;
          this.page = val.page;
          this.page.pageOptions = pageOptTemp;
          this.loading = false;
        },
      });
  }

  evalContentHeight() {
    let height = window.innerHeight;

    const menuBarHeight = Math.round(this.styleService.menuBarHeight());
    const breadcrumbHeight = Math.round(this.styleService.breadcrumbHeight());
    const contenHeaderHeight = Math.round(
      this.styleService.contentHeaderHeight(),
    );

    const tableCaption = 78;
    const paginatorHeight = 58;

    height =
      height -
      menuBarHeight -
      breadcrumbHeight -
      contenHeaderHeight -
      tableCaption;

    if (this.page) {
      height = height - paginatorHeight;
    }

    this.scrollHeight.set(`${height}px`);
    /**
    console.log(`innerHeight: ${window.innerHeight}
      menuBarHeight: ${menuBarHeight}, 
      breadcrumbHeight: ${breadcrumbHeight}, 
      contenHeaderHeight: ${contenHeaderHeight},
      scrollHeight: ${this.scrollHeight}`);
     */
  }
}
