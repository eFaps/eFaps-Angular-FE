import {
  Component,
  ElementRef,
  Input,
  viewChild,
  inject,
  output,
} from '@angular/core';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { PopoverModule } from 'primeng/popover';

import { Column } from 'src/app/model/table';

@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.scss'],
  imports: [PopoverModule, ButtonModule],
})
export class ColumnComponent {
  private router = inject(Router);

  @Input()
  rowData: any | undefined;
  @Input()
  column: Column | undefined;
  readonly navEvent = output();

  readonly overflowElement = viewChild<ElementRef>('overflowWrapper');

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
    const overflowElement = this.overflowElement();
    if (overflowElement) {
      return (
        overflowElement.nativeElement.offsetWidth <
        overflowElement.nativeElement.scrollWidth
      );
    }
    return false;
  }
}
