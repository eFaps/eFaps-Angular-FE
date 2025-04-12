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
import { PickListModule } from 'primeng/picklist';
import { FormItem, Option } from 'src/app/model/content';
import { ModuleData, UIModule } from 'src/app/model/module';
import { SafeHtmlPipe } from 'src/app/pipes/safe-html.pipe';
import { DownloadService } from 'src/app/services/download.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-filtered-report',
  imports: [
    ReactiveFormsModule,
    SafeHtmlPipe,
    DatePickerModule,
    FloatLabelModule,
    ButtonModule,
    PickListModule,
  ],
  templateUrl: './filtered-report.component.html',
  styleUrl: './filtered-report.component.scss',
})
export class FilteredReportComponent implements OnInit {
  readonly uimodule = input.required<UIModule>();
  readonly data = input<ModuleData>();

  formGroup: FormGroup;

  reportHtml: string = '';
  filters: FormItem[] = [];
  loading = false;

  pickListElements: any = {};

  constructor(
    private http: HttpClient,
    private utilService: UtilService,
    private downloadService: DownloadService,
  ) {
    this.formGroup = new FormGroup({});
  }

  ngOnInit(): void {
    if (this.restore()) {
      this.reload();
    } else {
      this.loadData(new HttpParams());
    }
  }

  loadData(httpParams: HttpParams) {
    this.loading = true;
    const module = this.uimodule();
    const url = `${this.utilService.evalApiUrl()}/ui/modules/filtered-report/${
      module?.id
    }`;
    this.http.get<any>(url, { params: httpParams }).subscribe({
      next: (reportDto) => {
        if (reportDto.downloadKey) {
          this.downloadService.download(reportDto.downloadKey);
        } else {
          this.reportHtml = reportDto.report;
        }
        if (reportDto.filters != null) {
          const filters: FormItem[] = reportDto.filters;
          this.formGroup = new FormGroup({});
          this.applyFilters(filters);
          this.persist();
        } else {
          this.filters = [];
          this.formGroup = new FormGroup({});
        }
        this.loading = false;
      },
      error: () => (this.loading = false),
    });
  }

  private applyFilters(filters: FormItem[]) {
    filters.forEach((formItem) => {
      switch (formItem.type) {
        case 'DATE':
          let value;
          if (formItem.value) {
            // date parses "2025-05-20" to a date with timezone, but "2025/05/20" to a localdate
            value = new Date((formItem.value as string).replaceAll('-', '/'));
          } else {
            value = null;
          }
          this.formGroup?.addControl(
            formItem.name,
            new FormControl<Date | null>(value, Validators.required),
          );
          break;
        case 'PICKLIST':
          this.initPickList(formItem);
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
  }

  reload(mime?: string) {
    let params = new HttpParams();
    if (mime) {
      params = params.set('mime', mime);
    }
    Object.entries(this.formGroup.value).forEach(([key, value]) => {
      let val: string | number;
      if (value instanceof Date) {
        val = value.toISOString().substring(0, 10);
      } else {
        val = value as string;
      }
      params = params.set(key, val);
    });
    Object.entries(this.pickListElements).forEach(([key, value]) => {
      var keys: string[] = [];
      ((value as any).target as Option[]).forEach((option) => {
        keys.push(option.value);
      });
      keys.forEach((value, index) => {
        if (index == 0) {
          params = params.set(key, keys[0]);
        } else {
          params = params.append(key, value);
        }
      });
    });
    this.loadData(params);
  }

  initPickList(formItem: FormItem) {
    if (typeof this.pickListElements[formItem.name] == 'undefined') {
      this.pickListElements = {
        ...this.pickListElements,
        [formItem.name]: { source: [], target: [] },
      };
    }
    this.pickListElements[formItem.name].source = formItem.options;
    this.pickListElements[formItem.name].target = [];
    if (formItem.value != null) {
      (formItem.value as string[]).forEach((entry) => {
        const selected = formItem.options?.find((opt) => {
          return opt.value == entry;
        }) as Option;
        (this.pickListElements[formItem.name].target as Option[]).push(
          selected,
        );
        this.pickListElements[formItem.name].source = (
          this.pickListElements[formItem.name].source as Option[]
        ).filter((opt) => {
          return opt.value != selected.value;
        });
      });
    }
  }

  export(mime: string) {
    this.reload(mime);
  }

  private persist() {
    localStorage.setItem(
      this.uimodule()!.id,
      JSON.stringify({
        date: Date.now(),
        filters: this.filters,
      }),
    );
  }

  private restore() {
    let ret = false;
    const strVal = localStorage.getItem(this.uimodule()!.id);
    if (strVal) {
      const state: FilterReportState = JSON.parse(strVal);
      const elapsed = new Date().getTime() - state.date;
      if (elapsed < 3600000) {
        this.applyFilters(state.filters);
        ret = true;
      }
    }
    return ret;
  }
}

interface FilterReportState {
  date: number;
  filters: FormItem[];
}
