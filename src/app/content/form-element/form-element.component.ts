import { Component, Input, OnInit } from '@angular/core';
import { UploadEvent } from 'primeng/fileupload';
import { FormItem } from 'src/app/model/content';
import { Option } from 'src/app/model/content';
import { AutoCompleteService } from 'src/app/services/auto-complete.service';
import { FieldUpdateService } from 'src/app/services/field-update.service';
import { UtilService } from 'src/app/services/util.service';
import { ValueService } from 'src/app/services/value.service';

@Component({
  selector: 'app-form-element',
  templateUrl: './form-element.component.html',
  styleUrls: ['./form-element.component.scss'],
})
export class FormElementComponent implements OnInit {
  inputValue: any;
  radioValue: any;
  dropdownValue: any;
  bitEnumValue: any;
  autoCompleteValue: any;
  snippletValue: any;
  dateValue: any;

  readOnlyValue: any;

  _formItem: FormItem | undefined;

  showMultiSelectFilter = false;
  autoCompleteSuggestions: any[] = [];
  uploadUrl: string | undefined;
  uploadKeys: string[] | undefined;

  constructor(
    private valueService: ValueService,
    private autoCompleteService: AutoCompleteService,
    private fieldUpdateService: FieldUpdateService,
    private utilService: UtilService
  ) {}
  ngOnInit(): void {
    this.valueService.update.subscribe({
      next: (entry) => {
        if (entry?.name == this.formItem?.name) {
          this.updateValue(entry?.value);
        }
      },
    });
  }

  updateValue(value: any) {
    switch (this.formItem?.type) {
      default:
        this.readOnlyValue = value;
    }
  }

  @Input()
  set formItem(formItem: FormItem | undefined) {
    this._formItem = formItem;

    switch (this.formItem?.type) {
      case 'INPUT':
        if (this.formItem?.value != null) {
          this.inputValue = this.formItem?.value;
          this.addEntry(this.inputValue);
        }
        break;
      case 'DROPDOWN':
        if (this.formItem.options) {
          if (this.formItem?.value != null) {
            this.dropdownValue = this.formItem?.value;
          } else {
            this.dropdownValue = this.formItem.options[0].value;
          }
          this.addEntry(this.dropdownValue);
        }
        break;
      case 'BITENUM':
        if (this.formItem.options) {
          this.showMultiSelectFilter = this.formItem.options.length > 10;
          if (this.formItem?.value != null) {
            this.bitEnumValue = this.formItem?.value;
            this.addEntry(this.bitEnumValue);
          }
        }
        break;

      case 'RADIO':
        if (this.formItem?.value != null) {
          this.radioValue = this.formItem?.value;
          this.addEntry(this.radioValue);
        }
        break;
      case 'AUTOCOMPLETE':
        if (this.formItem.options) {
          this.autoCompleteSuggestions = this.formItem.options;
          this.autoCompleteValue = this.formItem.options[0];
          this.addEntry(this.autoCompleteValue?.value);
        }
        break;

      case 'SNIPPLET':
        this.snippletValue = this.formItem?.value;
        break;

      case 'UPLOAD':
        this.uploadUrl = `${this.utilService.evalApiUrl()}/ui/upload`;
        break;

      case 'UPLOADMULTIPLE':
        this.uploadUrl = `${this.utilService.evalApiUrl()}/ui/upload`;
        break;

      case 'DATE':
        if (this.formItem?.value != null) {
          this.dateValue = new Date(this.formItem?.value);
          this.addEntry(this.formItem?.value);
        }
        break;
      default:
        this.readOnlyValue = this.formItem?.value;
    }
  }

  get formItem(): FormItem | undefined {
    return this._formItem;
  }

  addEntry(value: any) {
    this.valueService.addEntry({
      name: this.formItem!!.name,
      value: value,
    });
  }

  onKey(value: string) {
    this.addEntry(value);
  }

  changeRadio(value: any) {
    this.addEntry(value);
  }

  changeDropdown(value: any) {
    this.addEntry(value);
  }

  changeBitEnum(value: any) {
    this.addEntry(value);
  }

  changeDate(value: any) {
    if (value instanceof Date) {
      this.addEntry(value.toISOString().substring(0, 10));
    } else {
      this.addEntry(null);
    }
  }

  search(query: string) {
    this.autoCompleteService.search(this.formItem!!.ref!!, query).subscribe({
      next: (result) => {
        this.autoCompleteSuggestions = result.options;
      },
    });
  }

  changeAutoComplete(option: Option) {
    this.addEntry(option.value);
  }

  onUpload(event: UploadEvent) {
    const result = (event.originalEvent as any).body;
    this.uploadKeys = result.keys;
    this.addEntry(this.uploadKeys);
    this.valueService.addEntry({
      name: 'eFapsUpload',
      value: this.formItem!!.name,
    });
  }

  fieldUpdate() {
    if (this._formItem && this._formItem.updateRef) {
      this.fieldUpdateService.execute(this._formItem.updateRef).subscribe({
        next: (response) => {
          if (response.values) {
            Object.entries(response.values).forEach(([key, value]) => {
              this.valueService.updateEntry({
                name: key,
                value,
              });
            });
          }
        },
      });
    }
  }
}