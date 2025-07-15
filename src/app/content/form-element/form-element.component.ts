import { CommonModule, DatePipe } from '@angular/common';
import {
  Component,
  Input,
  OnInit,
  ViewContainerRef,
  viewChild,
  inject,
  ViewChild,
  ElementRef,
  AfterViewInit,
  input,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastMessageOptions } from 'primeng/api';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { DatePickerModule } from 'primeng/datepicker';
import { DialogService } from 'primeng/dynamicdialog';
import {
  FileSelectEvent,
  FileUploadModule,
  UploadEvent,
} from 'primeng/fileupload';
import { ImageModule } from 'primeng/image';
import { InputTextModule } from 'primeng/inputtext';
import { SafeHtmlPipe } from 'primeng/menu';
import { MessageModule } from 'primeng/message';
import { MultiSelectModule } from 'primeng/multiselect';
import { RadioButtonModule } from 'primeng/radiobutton';
import { SelectModule } from 'primeng/select';
import { TextareaModule } from 'primeng/textarea';

import { AttributeSetComponent } from '../attribute-set/attribute-set.component';
import { ClassificationsComponent } from '../classifications/classifications.component';
import { FormItem, Option } from 'src/app/model/content';
import { FieldCommandResponse } from 'src/app/model/field-command';
import { AutoCompleteService } from 'src/app/services/auto-complete.service';
import { DynamicComponentService } from 'src/app/services/dynamic-component.service';
import { FieldCommandService } from 'src/app/services/field-command.service';
import { FieldUpdateService } from 'src/app/services/field-update.service';
import { UtilService } from 'src/app/services/util.service';
import { ValidationService } from 'src/app/services/validation.service';
import { ValueService } from 'src/app/services/value.service';
import { ProgressBarModule } from 'primeng/progressbar';

@Component({
  selector: 'app-form-element',
  templateUrl: './form-element.component.html',
  styleUrls: ['./form-element.component.scss'],
  imports: [
    MessageModule,
    ButtonModule,
    ImageModule,
    CheckboxModule,
    FormsModule,
    AttributeSetComponent,
    DatePickerModule,
    FileUploadModule,
    AutoCompleteModule,
    SafeHtmlPipe,
    MultiSelectModule,
    SelectModule,
    RadioButtonModule,
    DatePipe,
    CommonModule,
    InputTextModule,
    TextareaModule,
    ProgressBarModule
  ],
  standalone: true,
})
export class FormElementComponent implements OnInit, AfterViewInit {
  private router = inject(Router);
  private dialogService = inject(DialogService);
  private valueService = inject(ValueService);
  private validationService = inject(ValidationService);
  private autoCompleteService = inject(AutoCompleteService);
  private fieldUpdateService = inject(FieldUpdateService);
  private fieldCommandService = inject(FieldCommandService);
  private dynamicComponentService = inject(DynamicComponentService);
  private utilService = inject(UtilService);

  messages: ToastMessageOptions[] = [];

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

  @ViewChild('uploadMultiple') uploadMultiple: ElementRef | undefined | any;
  @ViewChild('upload') upload: ElementRef | undefined | any;

  uploadUrl: string | undefined;
  uploadKeys: string[] | undefined;
  uploadedFiles: any[] = [];

  readonly vcr = viewChild.required('dynamicComponent', {
    read: ViewContainerRef,
  });

  readonly moduleVcr = viewChild.required('moduleComponent', {
    read: ViewContainerRef,
  });

  ngOnInit(): void {
    this.validationService.registerValidation((values) => {
      let valid = true;
      if (this.formItem?.required) {
        valid = false;
        if (
          values.has(this.formItem.name) &&
          values.get(this.formItem.name) != null
        ) {
          if (
            this.formItem.type == 'UPLOAD' ||
            this.formItem.type == 'UPLOADMULTIPLE'
          ) {
            valid = values.has('eFapsUpload');
          } else {
            switch (typeof values.get(this.formItem.name)) {
              case 'string':
                valid = values.get(this.formItem.name).length > 0;
                break;
              case 'boolean':
              case 'number':
                valid = true;
                break;
              case 'bigint':
              case 'symbol':
              case 'undefined':
              case 'object':
              case 'function':
              default:
            }
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

  ngAfterViewInit(): void {
    if (this.formItem?.type == 'UIMODULE') {
      this.moduleVcr().clear();

      this.dynamicComponentService.loadUIModule(
        this.moduleVcr(),
        this.formItem?.value,
        { oid: undefined, parentOid: undefined },
      );
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
      case 'TEXTAREA':
        if (this.formItem?.value != null) {
          this.textareaValue = this.formItem?.value;
          this.addEntry(this.textareaValue);
        }
        break;
      case 'DROPDOWN':
        if (this.formItem.options) {
          if (this.formItem?.value != null) {
            if (Array.isArray(this.formItem.value)) {
              this.dropdownValue = this.formItem.value[0];
            } else {
              this.dropdownValue = this.formItem?.value;
            }
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
          if (Array.isArray(this.formItem.options[0].value)) {
            this.addEntry(this.autoCompleteValue?.value[0]);
          } else {
            this.addEntry(this.autoCompleteValue?.value);
          }
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
      case 'UIMODULE':
        break;
      case 'CHECKBOX':
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
    this.fieldUpdate();
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
            response.values.forEach((entry, index) => {
              Object.entries(entry).forEach(([key, value]) => {
                this.valueService.updateEntry({
                  name: key,
                  value,
                  index: index,
                });
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
    const vcr = this.vcr();
    if (
      fieldCmdResp &&
      vcr &&
      fieldCmdResp.values['targetField'] == this.formItem?.name
    ) {
      vcr.clear();
      this.dynamicComponentService.load(vcr, fieldCmdResp);
    }
  }

  classSel() {
    const dialogRef = this.dialogService.open(ClassificationsComponent, {
      data: {
        classUUIDs: this.formItem?.value,
      },
      maximizable: true,
      closable: true,
      modal: true,
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

  removeFile(event: any, index: number) {
    if (this.uploadMultiple) {
      this.uploadMultiple.remove(event, index);
    } else if (this.upload) {
      this.upload.remove(event, index);
    }
  }
}
