import {
  Component,
  ElementRef,
  Input,
  output,
  viewChild,
  inject,
} from '@angular/core';
import { Router } from '@angular/router';
import { saveAs } from 'file-saver';

import { Column } from 'src/app/model/table';
import { CheckoutService } from 'src/app/services/checkout.service';

@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.scss'],
  standalone: false,
})
export class ColumnComponent {
  private router = inject(Router);
  private checkoutService = inject(CheckoutService);

  @Input()
  rowData: any | undefined;
  @Input()
  column: Column | undefined;
  readonly navEvent = output();

  readonly overflowElement = viewChild<ElementRef>('overflowWrapper');

  isCheckout(): boolean {
    return this.column?.field == 'checkout';
  }

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

  checkout() {
    this.checkoutService.checkout(this.rowData['OID']).subscribe({
      next: (downloadFile) => {
        saveAs(downloadFile.blob, downloadFile.fileName);
      },
    });
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
