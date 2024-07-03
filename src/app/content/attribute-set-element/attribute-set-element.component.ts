import { Component, Input, input } from '@angular/core';
import { FormItem } from 'src/app/model/content';
import { ValueService } from 'src/app/services/value.service';

@Component({
  selector: 'app-attribute-set-element',
  templateUrl: './attribute-set-element.component.html',
  styleUrl: './attribute-set-element.component.scss',
})
export class AttributeSetElementComponent {
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
  @Input() rowId: number | undefined;
  radioValue: any;

  constructor(private valueService: ValueService) {}

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
      | undefined
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
