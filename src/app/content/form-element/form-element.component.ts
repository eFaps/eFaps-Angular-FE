import {
  Component,
  Input,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { Router } from '@angular/router';
import { Message } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { UploadEvent } from 'primeng/fileupload';
import { FormItem } from 'src/app/model/content';
import { Option } from 'src/app/model/content';
import { FieldCommandResponse } from 'src/app/model/field-command';
import { AutoCompleteService } from 'src/app/services/auto-complete.service';
import { DynamicComponentService } from 'src/app/services/dynamic-component.service';
import { FieldCommandService } from 'src/app/services/field-command.service';
import { FieldUpdateService } from 'src/app/services/field-update.service';
import { UtilService } from 'src/app/services/util.service';
import { ValidationService } from 'src/app/services/validation.service';
import { ValueService } from 'src/app/services/value.service';

import { ClassificationsComponent } from '../classifications/classifications.component';

@Component({
  selector: 'app-form-element',
  templateUrl: './form-element.component.html',
  styleUrls: ['./form-element.component.scss'],
})
export class FormElementComponent implements OnInit {
  messages: Message[] = [];

  inputValue: any;
  radioValue: any;
  dropdownValue: any;
  bitEnumValue: any;
  autoCompleteValue: any;
  snippletValue: any;
  dateValue: any;
  dateTimeValue: any;
  timeValue: any;
  checkboxValue: any;
  textareaValue: any;

  readOnlyValue: any;

  _formItem: FormItem | undefined;

  showMultiSelectFilter = false;
  autoCompleteSuggestions: any[] = [];
  uploadUrl: string | undefined;
  uploadKeys: string[] | undefined;

  @ViewChild('dynamicComponent', { read: ViewContainerRef })
  vcr!: ViewContainerRef;

  constructor(
    private router: Router,
    private dialogService: DialogService,
    private valueService: ValueService,
    private validationService: ValidationService,
    private autoCompleteService: AutoCompleteService,
    private fieldUpdateService: FieldUpdateService,
    private fieldCommandService: FieldCommandService,
    private dynamicComponentService: DynamicComponentService,
    private utilService: UtilService
  ) {}

  ngOnInit(): void {
    this.validationService.registerValidation((values) => {
      let valid = true;
      if (this.formItem?.required) {
        valid = false;
        if (
          values.has(this.formItem.name) &&
          values.get(this.formItem.name) != null
        ) {
          switch (typeof values.get(this.formItem.name)) {
            case 'string':
              valid = values.get(this.formItem.name).length > 0;
              break;
            case 'number':
              valid = true;
              break;
            case 'bigint':
            case 'boolean':
            case 'symbol':
            case 'undefined':
            case 'object':
            case 'function':
            default:
          }
        }
      }
      if (valid) {
        this.messages = [];
      } else {
        this.messages = [{ severity: 'error', summary: 'Valor requerido' }];
      }
      return valid;
    });

    this.valueService.update.subscribe({
      next: (entry) => {
        if (entry?.name == this.formItem?.name) {
          this.updateValue(entry?.value);
        }
      },
    });
    this.fieldCommandService.response.subscribe({
      next: (cmdResp) => {
        this.evalFieldCmdResp(cmdResp);
      },
    });
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
      case 'TEXTAREA':
        if (this.formItem?.value != null) {
          this.textareaValue = this.formItem?.value;
          this.addEntry(this.textareaValue);
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
          const formValue = this.formItem?.value;
          if (formValue.length > 10) {
            this.dateValue = new Date(formValue);
          } else {
            const hours = -Math.floor(new Date().getTimezoneOffset() / 60);
            const minutes = new Date().getTimezoneOffset() % 60;
            const dateStr = `${this.formItem?.value}GMT${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
            this.dateValue = new Date(dateStr);
          }
          this.changeDate(this.dateValue);
        }
        break;
      case 'DATETIME':
        if (this.formItem?.value != null) {
          let dateTime = new Date(this.formItem?.value);
          dateTime.setSeconds(0);
          this.dateTimeValue = dateTime;
          this.addEntry(this.dateTimeValue);
        }
        break;
      case 'TIME':
        if (this.formItem?.value != null) {
          const timeArray = this.formItem?.value.split(':');
          let dateTime = new Date();
          dateTime.setHours(timeArray[0]);
          dateTime.setMinutes(timeArray[1]);
          dateTime.setSeconds(timeArray[2]);
          this.timeValue = dateTime;
          this.changeTime(this.timeValue);
        }
        break;
      default:
        if (this.formItem?.value && this.formItem?.value instanceof Array) {
          this.readOnlyValue = this.formItem.value.join(', ');
        } else {
          this.readOnlyValue = this.formItem?.value;
        }
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
    this.fieldUpdate();
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

  changeDateTime(value: any) {
    if (value instanceof Date) {
      this.addEntry(value.toISOString());
    } else {
      this.addEntry(null);
    }
  }

  changeTime(value: any) {
    if (value instanceof Date) {
      this.addEntry(`${value.getHours()}:${value.getMinutes()}`);
    } else {
      this.addEntry(null);
    }
  }

  changeCheckbox(value: any) {
    this.addEntry(value);
  }

  search(query: string) {
    this.autoCompleteService.search(this.formItem!!.ref!!, query).subscribe({
      next: (result) => {
        this.autoCompleteSuggestions = result.options;
      },
    });
  }

  changeAutoComplete(option: Option) {
    if (typeof option.value === 'object') {
      this.addEntry(option.value['value']);
    } else {
      this.addEntry(option.value);
    }
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

  executeFieldCmd() {
    if (this._formItem && this._formItem.ref) {
      this.fieldCommandService.execute(this._formItem.ref);
    }
  }

  evalFieldCmdResp(fieldCmdResp: FieldCommandResponse | undefined) {
    if (
      fieldCmdResp &&
      this.vcr &&
      fieldCmdResp.values['targetField'] == this.formItem?.name
    ) {
      this.vcr.clear();
      this.dynamicComponentService.load(this.vcr, fieldCmdResp);
    }
  }

  classSel() {
    const dialogRef = this.dialogService.open(ClassificationsComponent, {
      data: {
        classUUIDs: this.formItem?.value,
      },
      maximizable: true,
    });
  }

  followLink() {
    this.router.navigate(['..', 'content', this._formItem?.navRef]);
  }

  updateValue(value: any) {
    switch (this.formItem?.type) {
      case 'INPUT':
        if (
          typeof value == 'string' &&
          (value as string).startsWith('new Array')
        ) {
          this.convertToDropdown(value);
        } else {
          this.readOnlyValue = value;
        }
        break;
      case 'DROPDOWN':
        if (
          typeof value == 'string' &&
          (value as string).startsWith('new Array')
        ) {
          this.convertToDropdown(value);
        }
        break;
      default:
        this.readOnlyValue = value;
    }
  }

  convertToDropdown(jsString: string) {
    const regex = /\s*new\sArray\s*\((.*)\)/;
    const result = jsString.match(regex);
    if (result != null) {
      let item = this.formItem!!;
      item.type = 'DROPDOWN';
      item.options = [];
      const entries = result[1].split(',');
      const defVal = entries[0].slice(1, -1);

      for (let i = 1; i < entries.length; i = i + 2) {
        item.options.push({
          label: entries[i + 1].slice(1, -1),
          value: entries[i].slice(1, -1),
        });
      }

      this.dropdownValue = defVal;
      this.addEntry(this.dropdownValue);
    }
  }

  evalImageUrl(): string {
    const url = `${this.utilService.evalApiUrl()}${this.readOnlyValue}`;
    return url;
  }
}
