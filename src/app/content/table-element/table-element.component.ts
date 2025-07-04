import { Component, Input, OnInit, input, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { InputTextModule } from 'primeng/inputtext';

import { Option, TableColumn } from 'src/app/model/content';
import { AutoCompleteService } from 'src/app/services/auto-complete.service';
import { FieldUpdateService } from 'src/app/services/field-update.service';
import { ValueService } from 'src/app/services/value.service';

@Component({
  selector: 'app-table-element',
  templateUrl: './table-element.component.html',
  styleUrls: ['./table-element.component.scss'],
  imports: [AutoCompleteModule, InputTextModule, FormsModule],
  standalone: true,
})
export class TableElementComponent implements OnInit {
  private autoCompleteService = inject(AutoCompleteService);
  private fieldUpdateService = inject(FieldUpdateService);
  private valueService = inject(ValueService);

  inputValue: any;
  autoCompleteValue: any;

  readOnlyValue: any;

  _column: TableColumn | undefined;

  autoCompleteSuggestions: any[] = [];

  readonly index = input<number>(0);

  ngOnInit(): void {
    this.valueService.update.subscribe({
      next: (entry) => {
        if (entry?.name == this.column?.field && this.index() == entry?.index) {
          this.updateValue(entry?.value);
        }
      },
    });
  }

  updateValue(value: any) {
    switch (this.column?.type) {
      case 'INPUT':
        this.inputValue = value;
        this.addEntry(this.inputValue);
        break;
      default:
        this.readOnlyValue = value;
    }
  }

  @Input()
  set column(column: TableColumn | undefined) {
    this._column = column;
    switch (this.column?.type) {
    }
  }

  get column(): TableColumn | undefined {
    return this._column;
  }

  addEntry(value: any) {
    this.valueService.addEntry(
      {
        name: this._column!!.field,
        value: value,
      },
      this.index(),
    );
  }

  onKey(value: string) {
    this.addEntry(value);
  }

  changeAutoComplete(option: Option) {
    this.addEntry(option.value);
  }

  search(query: string) {
    this.autoCompleteService.search(this.column!!.ref!!, query).subscribe({
      next: (result) => {
        this.autoCompleteSuggestions = result.options;
      },
    });
  }

  fieldUpdate() {
    if (this._column && this._column.updateRef) {
      this.fieldUpdateService
        .execute(this._column.updateRef, this.index())
        .subscribe({
          next: (response) => {
            if (response.values) {
              Object.entries(response.values).forEach(([key, value]) => {
                this.valueService.updateEntry({
                  name: key,
                  value,
                  index: this.index(),
                });
              });
            }
          },
        });
    }
  }
}
