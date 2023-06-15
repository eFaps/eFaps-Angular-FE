import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormItem } from 'src/app/model/content';

@Component({
  selector: 'app-element',
  templateUrl: './element.component.html',
  styleUrls: ['./element.component.scss'],
})
export class ElementComponent {
  radioValue: any
  
  @Output() elementValue = new EventEmitter<{name: string, value: any}>();

  @Input()
  formItem: FormItem | undefined;

  constructor() {
    
  }

  onKey(value: string) {
    this.elementValue.emit({
      name: this.formItem!!.name,
      value: value
    })
  }

  changeRadio(value: any) {
    this.elementValue.emit({
      name: this.formItem!!.name,
      value: value
    })
  }
}
