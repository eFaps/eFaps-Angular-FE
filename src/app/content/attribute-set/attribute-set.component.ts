import { Component, Input } from '@angular/core';
import { FormItem } from 'src/app/model/content';

@Component({
  selector: 'app-attribute-set',
  templateUrl: './attribute-set.component.html',
  styleUrls: ['./attribute-set.component.scss'],
})
export class AttributeSetComponent {
  _formItem: FormItem | undefined;
  cols: any[] = [];
  items: FormItem[] = [];
  elements: any[] = [];

  @Input()
  set formItem(formItem: FormItem | undefined) {
    this._formItem = formItem;
    if (formItem != null) {
      this.items = formItem.value as Array<FormItem>;
      this.items.forEach((item) => {
        this.cols.push({ label: item.label, name: item.name });
        let values = item.value as Array<any>;
        values.forEach((val, idx) => {
          if (!this.elements[idx]) {
            this.elements.push({});
          }
          this.elements[idx][item.name] = val;
        });
      });
    }
  }
}
