import { HttpClient } from '@angular/common/http';
import { Component, inject, input, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { ModuleData, UIModule } from 'src/app/model/module';
import { DownloadService } from 'src/app/services/download.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-jasper-report-create-report',
  imports: [
    ReactiveFormsModule,
    ButtonModule,
    SelectModule,
    FloatLabelModule,
    InputTextModule,
  ],
  templateUrl: './jasper-report-create-report.component.html',
  styleUrl: './jasper-report-create-report.component.scss',
})
export class JasperReportCreateReportComponent implements OnInit {
  private http = inject(HttpClient);
  private config = inject(DynamicDialogConfig);
  private dialogRef = inject(DynamicDialogRef);
  private downloadService = inject(DownloadService);
  private utilService = inject(UtilService);

  readonly uimodule = input.required<UIModule>();
  readonly data = input.required<ModuleData>();

  jrParameters = signal<JRParameter[]>([]);

  mimes = [
    { value: 'pdf', label: 'PDF' },
    { value: 'xls', label: 'Spreadsheet' },
  ];

  formGroup = new FormGroup({});

  constructor() {
    const config = this.config;
    config.header = 'Exportar reporte';
    config.closable = true;
  }

  ngOnInit(): void {
    this.formGroup?.addControl('mime', new FormControl<string>('pdf'));

    const url = `${this.utilService.evalApiUrl()}/ui/modules/jasper-report/${this.data().oid}/parameters`;
    this.http.get<JRParameter[]>(url).subscribe({
      next: (jrParameters) => {
        jrParameters.forEach((jrParameter) =>
          this.formGroup?.addControl(
            jrParameter.name,
            new FormControl<string | undefined>(
              jrParameter.defaultValueExpression,
            ),
          ),
        );
        this.jrParameters.set(jrParameters);
      },
    });
  }

  close() {
    this.dialogRef.close();
  }

  submit() {
    const body = this.formGroup.value;

    const url = `${this.utilService.evalApiUrl()}/ui/modules/jasper-report/export/${this.data().oid}`;
    this.http.post<any>(url, body).subscribe({
      next: (result) => {
        if (result.downloadKey != null) {
          this.downloadService.download(result.downloadKey);
        }
      },
    });
  }
}

interface JRParameter {
  name: string;
  description?: string;
  defaultValueExpression?: string;
  class: string;
}
