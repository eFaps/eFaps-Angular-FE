import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Option } from 'src/app/model/content';
import { Filter } from 'src/app/model/table';

@Component({
    selector: 'app-filter-element',
    templateUrl: './filter-element.component.html',
    styleUrl: './filter-element.component.scss',
    standalone: false
})
export class FilterElementComponent {
  _filter: Filter | undefined;
  _rangeDates: Date[] = [];

  _selectedStatus: Option[] = [];
  statusList: Option[] = [];

  @Output()
  filterEvent = new EventEmitter<Filter>();

  @Input()
  set filter(filter: Filter) {
    this._filter = filter;
    switch (filter.kind) {
      case 'DATE': {
        const date1 = this.toDate(filter.value1!);
        const date2 = this.toDate(filter.value2!);
        this.rangeDates = [date1, date2];
        break;
      }
      case 'STATUS': {
        this.statusList = filter.value1! as Option[];
        this.statusList.sort((a, b) => (a.label! > b.label! ? 1 : -1));
        if (filter.value2 != null) {
          const selectedKeys = filter.value2 as string[];
          this.statusList.forEach((opt) => {
            if (selectedKeys.findIndex((key) => opt.value == key) > -1) {
              this._selectedStatus.push(opt);
            }
          });
        }
        break;
      }
    }
  }

  private toDate(isoLocalDate: string): Date {
    const aDate = new Date();
    aDate.setDate(+isoLocalDate.split('-')[2]);
    aDate.setMonth(+isoLocalDate.split('-')[1] - 1);
    aDate.setFullYear(+isoLocalDate.split('-')[0]);
    return aDate;
  }

  get filter(): Filter | undefined {
    return this._filter;
  }

  get rangeDates(): Date[] {
    return this._rangeDates;
  }

  set rangeDates(rangeDates: Date[]) {
    this._rangeDates = rangeDates;
    if (
      rangeDates.length == 2 &&
      rangeDates[0] != null &&
      rangeDates[1] != null
    ) {
      this.filterEvent.emit({
        kind: this._filter!!.kind,
        attribute: this._filter!!.attribute,
        field: this._filter!!.field,
        value1: rangeDates[0].toISOString().substring(0, 10),
        value2: rangeDates[1].toISOString().substring(0, 10),
      });
    }
  }

  get selectedStatus(): Option[] {
    return this._selectedStatus;
  }

  set selectedStatus(selectedStatus: Option[]) {
    this._selectedStatus = selectedStatus;
    this.filterEvent.emit({
      kind: this._filter!!.kind,
      attribute: this._filter!!.attribute,
      field: this._filter!!.field,
      value1: this.statusList,
      value2: this.selectedStatus.map((opt) => opt.value),
    });
  }
}
