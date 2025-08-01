import { Component, Input, inject, input } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';

import { TableElementComponent } from '../table-element/table-element.component';
import { TableSection } from 'src/app/model/content';
import { Column } from 'src/app/model/table';
import { ValueService } from 'src/app/services/value.service';

@Component({
  selector: 'app-table-section',
  templateUrl: './table-section.component.html',
  styleUrls: ['./table-section.component.scss'],
  imports: [TableElementComponent, ButtonModule, TableModule],
  standalone: true,
})
export class TableSectionComponent {
  private router = inject(Router);
  private valueService = inject(ValueService);

  _tableSection: TableSection | undefined;

  stateKey: string | undefined;

  cols: any[] = [];
  elements: any[] = [];
  editable = false;

  @Input()
  set tableSection(tableSection: TableSection) {
    this._tableSection = tableSection;
    this.stateKey = tableSection.id;
    this.cols = tableSection.columns;
    this.elements = tableSection.values;
    this.editable = tableSection.editable;
    if (this.editable && this.elements.length == 0) {
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

  removeRow(index: number) {
    this.elements.splice(index, 1);
    this.valueService.resize(
      this.elements.length,
      this.cols.map((column) => {
        return column.field;
      }),
    );
  }
}
