import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { TableSection } from 'src/app/model/content';
import { Column } from 'src/app/model/table';
import { ValueService } from 'src/app/services/value.service';

@Component({
  selector: 'app-table-section',
  templateUrl: './table-section.component.html',
  styleUrls: ['./table-section.component.scss'],
  standalone: false,
})
export class TableSectionComponent {
  _tableSection: TableSection | undefined;
  cols: any[] = [];
  elements: any[] = [];
  editable = false;

  constructor(
    private router: Router,
    private valueService: ValueService,
  ) {}

  @Input()
  set tableSection(tableSection: TableSection) {
    this._tableSection = tableSection;
    this.cols = tableSection.columns;
    this.elements = tableSection.values;
    this.editable = tableSection.editable;
    if (this.editable) {
      this.addEmptyRow();
    }
  }

  showLink(rowData: any, column: Column) {
    if (this.editable) {
      return false;
    }
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

  addEmptyRow() {
    this.elements.push([]);
    this.valueService.resize(
      this.elements.length,
      this.cols.map((column) => {
        return column.field;
      }),
    );
  }
}
