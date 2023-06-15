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

  @Output() elementValue = new EventEmitter<{ name: string; value: any }>();


  _formItem: FormItem | undefined;

  constructor() {}

  @Input()
  set formItem(formItem: FormItem | undefined) {
    this._formItem = formItem
    if (this.formItem?.type == 'DROPDOWN' &&  this.formItem.options) {
      this.dropdownValue = this.formItem.options[0].value
      this.changeDropdown(this.formItem.options[0].value)
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
}
