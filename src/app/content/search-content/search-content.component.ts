import { Component } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Search } from 'src/app/model/search';
import { ExecService } from 'src/app/services/exec.service';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-search-content',
  templateUrl: './search-content.component.html',
  styleUrls: ['./search-content.component.scss']
})
export class SearchContentComponent {
  searches: Search[];
  search: Search | undefined;
  menuItem: any;
  cols: any[] = [];
  elements: any[] = [];
  selectedElements: any[] = [];
  oid: string | undefined;

  constructor(config: DynamicDialogConfig, 
    private dialogRef: DynamicDialogRef,
    private searchService: SearchService, 
    private execService: ExecService) {
    this.searches = config.data.searches;
    this.search = this.searches.find(search => {
      return search.selected = true
    })
    this.menuItem = config.data.item
    this.oid = config.data.oid
  }

  query() {
    this.searchService.query(this.search!!.id).subscribe({
      next: searchResult => {
        this.cols = searchResult.columns
        this.elements = searchResult.values

      }
    })
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
      next: execResponse => {
        this.dialogRef.close(execResponse)
      }
    })
  }
}
