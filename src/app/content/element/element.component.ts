import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormItem } from 'src/app/model/content';
import { Option } from 'src/app/model/content';
import { AutoCompleteService } from 'src/app/services/auto-complete.service';
import { ValueService } from 'src/app/services/value.service';

@Component({
  selector: 'app-element',
  templateUrl: './element.component.html',
  styleUrls: ['./element.component.scss'],
})
export class ElementComponent {
  radioValue: any;
  dropdownValue: any;
  bitEnumValue: any;
  autoCompleteValue: any;

  _formItem: FormItem | undefined;

  showMultiSelectFilter = false;
  autoCompleteSuggestions: any[] = [];

  constructor(
    private valueService: ValueService,
    private autoCompleteService: AutoCompleteService
  ) {}

  @Input()
  set formItem(formItem: FormItem | undefined) {
    this._formItem = formItem;
    if (this.formItem?.type == 'DROPDOWN' && this.formItem.options) {
      this.dropdownValue = this.formItem.options[0].value;
      this.changeDropdown(this.formItem.options[0].value);
    }
    if (this.formItem?.type == 'BITENUM' && this.formItem.options) {
      this.showMultiSelectFilter = this.formItem.options.length > 10;
    }
  }

  get formItem(): FormItem | undefined {
    return this._formItem;
  }

  onKey(value: string) {
    this.valueService.addEntry({
      name: this.formItem!!.name,
      value: value,
    });
  }

  changeRadio(value: any) {
    this.valueService.addEntry({
      name: this.formItem!!.name,
      value: value,
    });
  }

  changeDropdown(value: any) {
    this.valueService.addEntry({
      name: this.formItem!!.name,
      value: value,
    });
  }

  changeBitEnum(value: any) {
    this.valueService.addEntry({
      name: this.formItem!!.name,
      value: value,
    });
  }

  search(query: string) {
    this.autoCompleteService.search(this.formItem!!.ref!!, query).subscribe({
      next: (result) => {
        this.autoCompleteSuggestions = result.options;
      },
    });
  }

  changeAutoComplete(option: Option) {
    this.valueService.addEntry({
      name: this.formItem!!.name,
      value: option.value,
    });
  }
}
