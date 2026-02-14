import { HttpClient } from '@angular/common/http';
import { Component, inject, input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FloatLabelModule } from 'primeng/floatlabel';
import { SelectModule } from 'primeng/select';
import { ModuleData, UIModule } from 'src/app/model/module';
import { DownloadService } from 'src/app/services/download.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-jasper-report-create-report',
  imports: [FormsModule, ButtonModule, SelectModule, FloatLabelModule],
  templateUrl: './jasper-report-create-report.component.html',
  styleUrl: './jasper-report-create-report.component.scss',
})
export class JasperReportCreateReportComponent {
  private http = inject(HttpClient);
  private config = inject(DynamicDialogConfig);
  private dialogRef = inject(DynamicDialogRef);
  private downloadService = inject(DownloadService);
  private utilService = inject(UtilService);

  readonly uimodule = input.required<UIModule>();
  readonly data = input.required<ModuleData>();

  mimes = [
    { value: 'pdf', label: 'PDF' },
    { value: 'xls', label: 'Spreadsheet' },
  ];
  mime: String = 'xls';

  constructor() {
    const config = this.config;
    config.header = 'Exportar reporte';
    config.closable = true;
  }

  close() {
    this.dialogRef.close();
  }

  submit() {
    const body = { mime: this.mime };

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
