import { Component, Input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';
import { DatePickerModule } from 'primeng/datepicker';
import { FluidModule } from 'primeng/fluid';
import { InputTextModule } from 'primeng/inputtext';
import { ToggleSwitchModule } from 'primeng/toggleswitch';

import { Option } from '../../model/content';
import { Filter } from '../../model/table';

@Component({
  selector: 'app-filter-element',
  templateUrl: './filter-element.component.html',
  styleUrl: './filter-element.component.scss',
  imports: [
    DatePickerModule,
    FormsModule,
    CheckboxModule,
    InputTextModule,
    ToggleSwitchModule,
    FluidModule,
  ],
})
export class FilterElementComponent {
  _filter: Filter | undefined;
  _rangeDates: Date[] = [];

  _selectedStatus: Option[] = [];
  statusList: Option[] = [];

  _text: string | undefined;
  _ignoreCase: boolean = true;

  readonly filterEvent = output<Filter>();

  @Input()
  set filter(filter: Filter) {
    this._filter = filter;
    switch (filter.kind) {
      case 'DATE':
        const date1 = this.toDate(filter.value1!);
        const date2 = this.toDate(filter.value2!);
        this.rangeDates = [date1, date2];
        break;
      case 'STATUS':
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
      case 'TEXT':
        this.text = filter.value1;
        this.ignoreCase = filter.value2;
        break;
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
        required: this._filter!!.required,
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
      required: this._filter!!.required,
    });
  }

  get text(): string | undefined {
    return this._text;
  }

  set text(value: string) {
    this._text = value;
    this.filterEvent.emit({
      kind: this._filter!!.kind,
      attribute: this._filter!!.attribute,
      field: this._filter!!.field,
      value1: this.text,
      value2: this.ignoreCase,
      required: this._filter!!.required,
    });
  }

  get ignoreCase(): boolean {
    return this._ignoreCase;
  }

  set ignoreCase(ic: boolean) {
    this._ignoreCase = ic;
    this.filterEvent.emit({
      kind: this._filter!!.kind,
      attribute: this._filter!!.attribute,
      field: this._filter!!.field,
      value1: this.text,
      value2: this.ignoreCase,
      required: this._filter!!.required,
    });
  }
}
