import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { Divider, DividerModule } from 'primeng/divider';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MenubarModule } from 'primeng/menubar';
import { TableModule } from 'primeng/table';

import { FormSectionComponent } from '../form-section/form-section.component';
import { Search, SearchResult } from 'src/app/model/search';
import { ExecService } from 'src/app/services/exec.service';
import { SearchService } from 'src/app/services/search.service';
import { ValueService } from 'src/app/services/value.service';

@Component({
  selector: 'app-search-content',
  templateUrl: './search-content.component.html',
  styleUrls: ['./search-content.component.scss'],
  imports: [
    ButtonModule,
    CheckboxModule,
    TableModule,
    FormSectionComponent,
    MenubarModule,
    DividerModule,
  ],
  standalone: true,
})
export class SearchContentComponent implements OnInit {
  searches: Search[];
  search: Search;
  menuItem: any;
  searchMenuItems: MenuItem[] = [];
  cols: any[] = [];
  elements: any[] = [];
  selectedElements: any[] = [];
  oid: string | undefined;
  values: Map<String, any> | undefined;

  constructor(
    private router: Router,
    private config: DynamicDialogConfig,
    private dialogRef: DynamicDialogRef,
    private valueService: ValueService,
    private searchService: SearchService,
    private execService: ExecService,
    private messageService: MessageService,
  ) {
    config.closable = true;
    if (config.data.restore) {
      const searchContent = this.searchService.restore();
      this.searchMenuItems = searchContent.search.menuItems;
      this.search = searchContent.search.current;
      this.cols = searchContent.result.cols;
      this.elements = searchContent.result.elements;
      this.searches = [];
      config.header = this.search.label;
      config.maximizable = true;
      config.draggable = true;
      this.searchService.clear();
    } else {
      this.searches = config.data.searches;
      this.search = this.searches
        .map((search) => {
          return [search, ...search.children];
        })
        .flat()
        .find((search) => {
          return (search.selected = true && search.formSection != null);
        })!!;
      this.menuItem = config.data.item;
      this.oid = config.data.oid;
      config.header = this.search.label;
      this.searchMenuItems = this.searches.map((search) =>
        this.getMenuItem(search),
      );
      if (!this.isConnect) {
        config.maximizable = true;
        config.draggable = true;
      }
    }
  }

  get isConnect(): boolean {
    return this.oid != null;
  }

  ngOnInit(): void {
    this.valueService.reset();
    this.values = this.valueService.values();
  }

  getMenuItem(item: Search): MenuItem {
    return {
      id: item.id,
      label: item.label,
      items:
        item.children.length > 0
          ? item.children.map((item) => this.getMenuItem(item))
          : undefined,
      command: this.evalAction(item),
    };
  }

  evalAction(item: Search): ((event?: any) => void) | undefined {
    return item.formSection == null
      ? undefined
      : () => {
          this.search = item;
          this.config.header = item.label;
          this.cols = [];
          this.elements = [];
        };
  }

  query() {
    this.searchService.query(this.search!!.id, this.values).subscribe({
      next: (searchResult) => {
        this.cols = searchResult.columns;
        this.elements = searchResult.values;
        this.evalMax(searchResult);
      },
    });
  }

  evalMax(searchResult: SearchResult) {
    const limit = searchResult.page?.pageSize;
    if (limit == searchResult.values.length) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Limite',
        detail: `Resultado llego al limite de ${limit}`,
      });
    }
  }

  submit() {
    const oids = this.selectedElements.map((element) => {
      return element.OID;
    });
    const map = new Map<string, any>();
    map.set('eFapsSelectedOids', oids);
    if (this.oid) {
      map.set('eFapsOID', this.oid);
    }
    this.execService.exec(this.menuItem.id, map).subscribe({
      next: (execResponse) => {
        this.dialogRef.close(execResponse);
      },
    });
  }

  followLink(rowData: any) {
    this.router.navigate(['content', rowData.OID]);

    this.searchService.persist({
      search: {
        current: this.search,
        menuItems: this.searchMenuItems,
      },
      result: {
        cols: this.cols,
        elements: this.elements,
      },
    });
    this.dialogRef.close();
  }
}
