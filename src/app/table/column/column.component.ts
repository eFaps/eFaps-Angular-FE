import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
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
  @Output()
  navEvent = new EventEmitter();

  @ViewChild('overflowWrapper') overflowElement: ElementRef | undefined;

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
    this.navEvent.emit();
    const alternativeOid = this.rowData[this.column!!.field + '_AOID'];
    if (alternativeOid) {
      this.router.navigate(['content', alternativeOid]);
    } else {
      this.router.navigate(['content', this.rowData['OID']]);
    }
  }

  isOverflowing() {
    if (this.overflowElement) {
      return (
        this.overflowElement.nativeElement.offsetWidth <
        this.overflowElement.nativeElement.scrollWidth
      );
    }
    return false;
  }
}
