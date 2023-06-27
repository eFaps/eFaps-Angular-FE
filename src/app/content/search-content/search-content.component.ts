import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Search } from 'src/app/model/search';
import { ExecService } from 'src/app/services/exec.service';
import { SearchService } from 'src/app/services/search.service';
import { ValueService } from 'src/app/services/value.service';

@Component({
  selector: 'app-search-content',
  templateUrl: './search-content.component.html',
  styleUrls: ['./search-content.component.scss'],
})
export class SearchContentComponent implements OnInit {
  searches: Search[];
  search: Search;
  menuItem: any;
  cols: any[] = [];
  elements: any[] = [];
  selectedElements: any[] = [];
  oid: string | undefined;
  values: Map<String, any> | undefined;

  constructor(
    config: DynamicDialogConfig,
    private dialogRef: DynamicDialogRef,
    private valueService: ValueService,
    private searchService: SearchService,
    private execService: ExecService
  ) {
    this.searches = config.data.searches;
    this.search = this.searches.find((search) => {
      return (search.selected = true);
    })!!;
    this.menuItem = config.data.item;
    this.oid = config.data.oid;
  }
  ngOnInit(): void {
    this.valueService.reset();
    this.valueService.values.subscribe({
      next: (values) => (this.values = values),
    });
  }

  query() {
    this.searchService.query(this.search!!.id, this.values).subscribe({
      next: (searchResult) => {
        this.cols = searchResult.columns;
        this.elements = searchResult.values;
      },
    });
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
}
