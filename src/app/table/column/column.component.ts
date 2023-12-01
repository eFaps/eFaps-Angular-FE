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
import { CheckoutService } from 'src/app/services/checkout.service';

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

  constructor(private router: Router, private checkoutService: CheckoutService) {}

  isCheckout(): boolean {
    return this.column?.field == 'checkout'
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
      next: blob => {
        const url = window.URL.createObjectURL(blob);
			  window.open(url);
      }
    })
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
