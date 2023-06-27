import { Component } from '@angular/core';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { Search } from 'src/app/model/search';
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
  constructor(config: DynamicDialogConfig, private searchService: SearchService) {
    this.searches = config.data.searches;
    this.search = this.searches.find(search => {
      return search.selected = true
    })
    this.menuItem = config.data.item
  }

  submit() {
    this.searchService.query(this.search!!.id).subscribe({
      next: searchResult => {
        this.cols = searchResult.columns
        this.elements = searchResult.values
      }
    })
  }
}
