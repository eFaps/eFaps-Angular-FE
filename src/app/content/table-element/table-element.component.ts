import {
  Component,
  Input,
  OnInit,
  input,
  inject,
  effect,
  OnDestroy,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  AutoCompleteModule,
  AutoCompleteSelectEvent,
} from 'primeng/autocomplete';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { Subscription } from 'rxjs';

import { Option, TableColumn } from 'src/app/model/content';
import { AutoCompleteService } from 'src/app/services/auto-complete.service';
import { FieldUpdateService } from 'src/app/services/field-update.service';
import { ValueService } from 'src/app/services/value.service';

@Component({
  selector: 'app-table-element',
  templateUrl: './table-element.component.html',
  styleUrls: ['./table-element.component.scss'],
  imports: [AutoCompleteModule, InputTextModule, FormsModule, SelectModule],
  standalone: true,
})
export class TableElementComponent implements OnInit, OnDestroy {
  private autoCompleteService = inject(AutoCompleteService);
  private fieldUpdateService = inject(FieldUpdateService);
  private valueService = inject(ValueService);

  readonly index = input<number>(0);
  column = input.required<TableColumn>();
  rowData = input<any>();

  dropdownValue = signal<any | undefined>(undefined);
  dropdownOptions = signal<Option[] | undefined>(undefined);

  inputValue: any;
  autoCompleteValue: any;
  autoCompleteSuggestions: any[] = [];

  readOnlyValue: any;
  valueSub: Subscription | undefined;

  constructor() {
    effect(() => {
      const rowData = this.rowData();
      this.updateValue(rowData[this.column().field]);
    });
  }

  ngOnInit(): void {
    //this.dropdownOptions.set(this.column().options)
    this.valueSub = this.valueService.update.subscribe({
      next: (entry) => {
        if (
          entry &&
          entry?.name == this.column().field &&
          this.index() == entry?.index
        ) {
          this.updateValue(entry?.value);
        }
      },
    });
  }

  ngOnDestroy(): void {
    if (this.valueSub) {
      this.valueSub.unsubscribe();
    }
  }

  updateValue(value: any) {
    switch (this.column().type) {
      case 'INPUT':
        if (
          typeof value == 'string' &&
          (value as string).startsWith('new Array')
        ) {
          this.convertToDropdown(value);
        } else {
          this.inputValue = value;
          this.addEntry(this.inputValue);
        }
        break;
      case 'DROPDOWN':
        if (value) {
          if (
            typeof value == 'string' &&
            (value as string).startsWith('new Array')
          ) {
            this.convertToDropdown(value);
          } else if (Array.isArray(value)) {
            let options: Option[] = [];
            value.forEach((val) => {
              if (val.selected == true) {
                this.dropdownValue.set(val.value);
              }
              options.push({
                label: val.option,
                value: val.value,
              });
            });
            this.addEntry(this.dropdownValue());
            this.dropdownOptions.set(options);
          } else {
            this.dropdownValue.set(value);
            this.addEntry(this.dropdownValue());
          }
        }
        break;
      case 'AUTOCOMPLETE':
        if (value) {
          this.autoCompleteValue = value;
          const aoid = this.rowData()[this.column().field + '_AOID'];
          this.addEntry(aoid);
        }
        break;
      default:
        this.readOnlyValue = value;
    }
  }

  addEntry(value: any) {
    this.valueService.addEntry({
      name: this.column().field,
      value: value,
      index: this.index(),
    });
  }

  onKey(value: string) {
    this.addEntry(value);
  }

  onInputBlur(event: FocusEvent) {
    this.fieldUpdate();
  }

  changeAutoComplete(event: AutoCompleteSelectEvent) {
    this.addEntry(event.value.value);
    if (event.value.display) {
      this.autoCompleteValue = event.value.display;
    }
    this.fieldUpdate();
  }

  changeDropdown(value: any) {
    this.addEntry(value);
    this.fieldUpdate();
  }

  search(query: string) {
    this.autoCompleteService.search(this.column().ref!!, query).subscribe({
      next: (result) => {
        this.autoCompleteSuggestions = result.options;
      },
    });
  }

  fieldUpdate() {
    if (this.column().updateRef) {
      this.fieldUpdateService
        .execute(this.column().updateRef!, this.index())
        .subscribe({
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

  convertToDropdown(jsString: string) {
    const regex = /\s*new\sArray\s*\((.*)\)/;
    const result = jsString.match(regex);
    if (result != null) {
      let item = this.column();
      item.type = 'DROPDOWN';
      const options = [];
      const entries = result[1].split(',');
      const defVal = entries[0].slice(1, -1);

      for (let i = 1; i < entries.length; i = i + 2) {
        options.push({
          label: entries[i + 1].slice(1, -1),
          value: entries[i].slice(1, -1),
        });
      }
      this.dropdownOptions.set(options);
      this.dropdownValue.set(defVal);
      this.addEntry(this.dropdownValue());
    }
  }
}
