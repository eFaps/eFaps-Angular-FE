import { HttpClient } from '@angular/common/http';
import { Component, effect, inject, input, signal } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { FloatLabelModule } from 'primeng/floatlabel';

import { AutoComplete as AutoCompleteResponse } from '../../../model/auto-complete';
import { FormItem, Option } from '../../../model/content';
import { UIModule } from '../../../model/module';
import { UtilService } from '../../../services/util.service';

@Component({
  selector: 'app-auto-complete',
  imports: [ReactiveFormsModule, AutoCompleteModule, FloatLabelModule],
  templateUrl: './auto-complete.component.html',
  styleUrl: './auto-complete.component.scss',
})
export class AutoCompleteComponent {
  private readonly http = inject(HttpClient);
  private readonly utilService = inject(UtilService);

  readonly uimodule = input.required<UIModule>();
  readonly formGroup = input.required<FormGroup>();
  readonly formItem = input<FormItem>();

  autoCompleteSuggestions = signal<Option[]>([]);
  selectedOption: Option | undefined;

  constructor() {
    effect(() => {
      var item = this.formItem();
      if (item && item.options && item.options.length == 1) {
        this.selectedOption = item.options[0];
      }
    });
  }
  search(query: string) {
    const url = `${this.utilService.evalApiUrl()}/ui/modules/filtered-report/${this.uimodule().id}/autocomplete/${this.formItem()!!.name}`;
    const values: any = {};
    values['query'] = query;
    this.http.post<AutoCompleteResponse>(url, { values }).subscribe({
      next: (result) => {
        this.autoCompleteSuggestions.set(result.options);
      },
    });
  }
}
