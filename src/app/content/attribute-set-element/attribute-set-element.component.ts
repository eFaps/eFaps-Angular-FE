import { Component, inject, Input, input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { RadioButtonModule } from 'primeng/radiobutton';
import { SelectModule } from 'primeng/select';
import { TableModule } from 'primeng/table';

import { FormItem } from '../../model/content';
import { ValueService } from '../../services/value.service';

@Component({
  selector: 'app-attribute-set-element',
  templateUrl: './attribute-set-element.component.html',
  styleUrl: './attribute-set-element.component.scss',
  imports: [
    TableModule,
    FormsModule,
    RadioButtonModule,
    SelectModule,
    InputTextModule,
  ],
  standalone: true,
})
export class AttributeSetElementComponent {
  private valueService = inject(ValueService);

  dropdownValue: any;
  readOnlyValue: string | undefined;
  private _elementData:
    | {
        formItem: FormItem;
        rowId: number;
        setName: string;
      }
    | undefined;
  inputValue: any;
  readonly rowId = input<number>();
  radioValue: any;

  get elementData():
    | {
        formItem: FormItem;
        rowId: number;
        setName: string;
      }
    | undefined {
    return this._elementData;
  }

  @Input()
  set elementData(
    elementData:
      | {
          formItem: FormItem;
          rowId: number;
          setName: string;
        }
      | undefined,
  ) {
    this._elementData = elementData;
    switch (this.elementData?.formItem.type) {
      case 'DROPDOWN':
        if (this.elementData.formItem.options) {
          if (this.elementData.formItem.value != null) {
            this.dropdownValue = this.elementData.formItem.value;
          } else {
            this.dropdownValue =
              this.elementData.formItem.options.length > 0
                ? this.elementData.formItem.options[0].value
                : 0;
          }
          this.addEntry(this.dropdownValue);
        }
        break;
      case 'INPUT':
        if (this.elementData.formItem.value != null) {
          this.inputValue = this.elementData.formItem.value;
          this.addEntry(this.inputValue);
        }
        break;
      case 'RADIO':
        if (this.elementData.formItem.value != null) {
          this.radioValue = this.elementData.formItem.value;
          this.addEntry(this.radioValue);
        }
        break;
      default:
        if (
          this.elementData?.formItem.value &&
          this.elementData.formItem?.value instanceof Array
        ) {
          this.readOnlyValue = this.elementData.formItem.value.join(', ');
        } else {
          this.readOnlyValue = this.elementData?.formItem?.value;
        }
    }
  }

  addEntry(value: any) {
    this.valueService.addSetEntry({
      name: this.elementData!!.formItem.name,
      value: value,
      setName: this.elementData!!.setName,
      rowId: this.elementData!!.rowId,
    });
  }

  changeDropdown(value: any) {
    this.addEntry(value);
  }

  onKey(value: string) {
    this.addEntry(value);
  }

  changeRadio(value: any) {
    this.addEntry(value);
  }
}
