import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit, input } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';
import { FloatLabelModule } from 'primeng/floatlabel';
import { FormItem } from 'src/app/model/content';
import { ModuleData, UIModule } from 'src/app/model/module';
import { SafeHtmlPipe } from 'src/app/pipes/safe-html.pipe';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-filtered-report',
  imports: [
    ReactiveFormsModule,
    SafeHtmlPipe,
    DatePickerModule,
    FloatLabelModule,
    ButtonModule,
  ],
  templateUrl: './filtered-report.component.html',
  styleUrl: './filtered-report.component.scss',
})
export class FilteredReportComponent implements OnInit {
  readonly uimodule = input<UIModule>();
  readonly data = input<ModuleData>();

  formGroup: FormGroup;

  reportHtml: string = '';
  filters: FormItem[] = [];
  loading = false;

  constructor(private http: HttpClient, private utilService: UtilService) {
    this.formGroup = new FormGroup({});
  }

  ngOnInit(): void {
    this.loadData(new HttpParams());
  }

  loadData(httpParams: HttpParams) {
    this.loading = true;
    const module = this.uimodule();
    const url = `${this.utilService.evalApiUrl()}/ui/modules/filtered-report/${
      module?.id
    }`;
    this.http.get<any>(url, { params: httpParams }).subscribe({
      next: (reportDto) => {
        this.reportHtml = reportDto.report;
        if (reportDto.filters != null) {
          const filters: FormItem[] = reportDto.filters;
          this.formGroup = new FormGroup({});
          filters.forEach((formItem) => {
            switch (formItem.type) {
              case 'DATE':
                let value;
                if (formItem.value) {
                  value = new Date(formItem.value);
                } else {
                  value = null;
                }
                this.formGroup?.addControl(
                  formItem.name,
                  new FormControl<Date | null>(value, Validators.required)
                );
                break;
              case 'DATETIME':
              case 'DATETIMELABEL':
              case 'INPUT':
              case 'RADIO':
              case 'DROPDOWN':
              case 'BITENUM':
              case 'AUTOCOMPLETE':
              case 'SNIPPLET':
              case 'UPLOAD':
              case 'UPLOADMULTIPLE':
              case 'ATTRSET':
              case 'CHECKBOX':
              case 'TEXTAREA':
              case 'TIME':
              case 'BUTTON':
              case 'CLASSIFICATION':
            }
          });
          this.filters = filters;
        } else {
          this.filters = [];
          this.formGroup = new FormGroup({});
        }
        this.loading = false;
      },
      error: () => (this.loading = false),
    });
  }

  reload() {
    let params = new HttpParams();
    Object.entries(this.formGroup.value).forEach(([key, value]) => {
      let val: string | number;
      if (value instanceof Date) {
        val = value.toISOString().substring(0, 10);
      } else {
        val = value as string;
      }
      params = params.set(key, val);
    });

    this.loadData(params);
  }
}
