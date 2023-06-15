import { AfterViewInit, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormItem } from 'src/app/model/content';

@Component({
  selector: 'app-element',
  templateUrl: './element.component.html',
  styleUrls: ['./element.component.scss'],
})
export class ElementComponent  {
  radioValue: any;
  dropdownValue: any;
  bitEnumValue: any;

  _formItem: FormItem | undefined;

  showMultiSelectFilter = false;
  

  @Output() elementValue = new EventEmitter<{ name: string; value: any }>();

  constructor() {}

  @Input()
  set formItem(formItem: FormItem | undefined) {
    this._formItem = formItem
    if (this.formItem?.type == 'DROPDOWN' &&  this.formItem.options) {
      this.dropdownValue = this.formItem.options[0].value
      this.changeDropdown(this.formItem.options[0].value)
    }
    if (this.formItem?.type == 'BITENUM' && this.formItem.options) {
      this.showMultiSelectFilter = this.formItem.options.length > 10
    }
  }

  get formItem(): FormItem | undefined {
    return this._formItem
  }

  onKey(value: string) {
    this.elementValue.emit({
      name: this.formItem!!.name,
      value: value,
    });
  }

  changeRadio(value: any) {
    this.elementValue.emit({
      name: this.formItem!!.name,
      value: value,
    });
  }

  changeDropdown(value: any) {
    this.elementValue.emit({
      name: this.formItem!!.name,
      value: value,
    });
  }
  changeBitEnum(value: any) {
    this.elementValue.emit({
      name: this.formItem!!.name,
      value: value,
    });
  }
}
