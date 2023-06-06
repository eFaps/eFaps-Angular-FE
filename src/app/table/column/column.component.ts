import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Column } from 'src/app/model/table';

@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.scss'],
})
export class ColumnComponent {
  @Input()
  rowData: any | undefined;
  @Input()
  column: Column | undefined;
  constructor(private router: Router) {}

  get value(): any {
    return this.rowData[this.column!!.field];
  }

  showLink() {
    if (this.column?.ref) {
      if (this.rowData.hasOwnProperty(this.column!!.field + '_AOID')) {
        if (this.rowData[this.column!!.field + '_AOID'] != null) {
          return true;
        }
        return false;
      }
      return true;
    }
    return false;
  }

  followLink() {
    const alternativeOid = this.rowData[this.column!!.field + '_AOID'];
    if (alternativeOid) {
      this.router.navigate(['form', alternativeOid]);
    } else {
      this.router.navigate(['form', this.rowData['OID']]);
    }
  }
}
