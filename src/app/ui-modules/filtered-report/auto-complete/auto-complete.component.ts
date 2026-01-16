import { HttpClient } from '@angular/common/http';
import { Component, effect, inject, input, signal, viewChild } from '@angular/core';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { FloatLabelModule } from 'primeng/floatlabel';
import { FormItem } from 'src/app/model/content';
import { UIModule } from 'src/app/model/module';
import { AutoComplete as AutoCompleteResponse} from 'src/app/model/auto-complete';
import { Option } from 'src/app/model/content';
import { UtilService } from 'src/app/services/util.service';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-auto-complete',
  imports: [   ReactiveFormsModule, AutoCompleteModule,FloatLabelModule],
  templateUrl: './auto-complete.component.html',
  styleUrl: './auto-complete.component.scss',
})
export class AutoCompleteComponent {
  private readonly http = inject(HttpClient);
  private readonly utilService = inject(UtilService);

  readonly uimodule = input.required<UIModule>();
  readonly formGroup = input.required<FormGroup>();
  readonly formItem = input<FormItem>()
  
  autoCompleteSuggestions = signal<Option[]>([]);
  selectedOption: Option | undefined

constructor() {
    effect(() => {
      var item = this.formItem()
     if (item && item.options && item.options.length == 1) {
      this.selectedOption = item.options[0]
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
    });;
  }
}
