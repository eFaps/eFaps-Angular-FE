import { Component, Input, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { MessageModule } from 'primeng/message';
import { TableModule } from 'primeng/table';

import { AttributeSetEntry, FormItem } from '../../model/content';
import { ValueService } from '../../services/value.service';
import { AttributeSetElementComponent } from '../attribute-set-element/attribute-set-element.component';

@Component({
  selector: 'app-attribute-set',
  templateUrl: './attribute-set.component.html',
  styleUrls: ['./attribute-set.component.scss'],
  imports: [
    MessageModule,
    ButtonModule,
    AttributeSetElementComponent,
    TableModule,
    FormsModule,
  ],
  standalone: true,
})
export class AttributeSetComponent {
  private valueService = inject(ValueService);

  _formItem: FormItem | undefined;
  cols: any[] = [];
  items: FormItem[] = [];
  elements: any[] = [];
  editable = false;

  @Input()
  set formItem(mainFormItem: FormItem | undefined) {
    this._formItem = mainFormItem;
    if (mainFormItem != null) {
      const values = mainFormItem.value as Array<AttributeSetEntry>;

      values[0].values.forEach((item) => {
        this.cols.push({ label: item.label, name: item.name });
      });

      values.forEach((entry, idx) => {
        entry.values.forEach((formItem) => {
          if (!this.editable) {
            this.editable = formItem.type != null;
          }

          if (entry.rowId > 0) {
            if (!this.elements[idx]) {
              this.elements.push({});
            }
            this.elements[idx][formItem.name] = {
              formItem: formItem,
              rowId: entry.rowId,
              setName: this._formItem?.name,
            };
          }
        });
      });
    }
  }

  get formItem() {
    return this._formItem;
  }

  addRow() {
    const values = this.formItem?.value as Array<AttributeSetEntry>;
    const idx = this.elements.length;
    const rowId = Math.random().toString(36).slice(2, 7);
    values[0].values.forEach((formItem) => {
      if (!this.editable) {
        this.editable = formItem.type != null;
      }

      if (!this.elements[idx]) {
        this.elements.push({});
      }
      this.elements[idx][formItem.name] = {
        formItem: formItem,
        rowId: rowId,
        setName: this._formItem?.name,
      };
    });
  }

  removeRow(rowData: any) {
    const fieldName = this.cols[0].name;
    const rowId = rowData[fieldName].rowId;

    this.elements = this.elements.filter((entry) => {
      return entry[fieldName].rowId != rowId;
    });

    this.valueService.removeSetEntry(this.formItem!.name, rowId);
  }
}
