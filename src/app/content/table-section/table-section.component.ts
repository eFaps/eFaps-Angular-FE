import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TableSection } from 'src/app/model/content';
import { Column } from 'src/app/model/table';

@Component({
  selector: 'app-table-section',
  templateUrl: './table-section.component.html',
  styleUrls: ['./table-section.component.scss'],
})
export class TableSectionComponent {
  _tableSection: TableSection | undefined;
  cols: any[] = [];
  elements: any[] = [];

  constructor(private router: Router) {}

  @Input()
  set tableSection(tableSection: TableSection) {
    this._tableSection = tableSection;
    this.cols = tableSection.columns;
    this.elements = tableSection.values;
  }

  showLink(rowData: any, column: Column) {
    if (column?.ref) {
      if (rowData.hasOwnProperty(column!!.field + '_AOID')) {
        if (rowData[column!!.field + '_AOID'] != null) {
          return true;
        }
        return false;
      }
      return true;
    }
    return false;
  }

  followLink(rowData: any, column: Column) {
    const alternativeOid = rowData[column!!.field + '_AOID'];
    if (alternativeOid) {
      this.router.navigate(['content', alternativeOid]);
    } else {
      this.router.navigate(['content', rowData['OID']]);
    }
  }
}
