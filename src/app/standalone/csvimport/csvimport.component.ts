import { HttpClient } from '@angular/common/http';
import { Component, input, viewChild } from '@angular/core';
import Papa, { ParseResult } from 'papaparse';
import { ToastMessageOptions } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import {
  FileSelectEvent,
  FileUpload,
  FileUploadModule,
} from 'primeng/fileupload';
import { MessagesModule } from 'primeng/messages';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { TableModule } from 'primeng/table';
import { ModuleData, UIModule } from 'src/app/model/module';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-csvimport',
  imports: [
    ButtonModule,
    FileUploadModule,
    MessagesModule,
    TableModule,
    ScrollPanelModule,
  ],
  templateUrl: './csvimport.component.html',
  styleUrl: './csvimport.component.scss',
})
export class CSVImportComponent {
  readonly uimodule = input<UIModule>();
  readonly data = input<ModuleData>();

  cols: string[] = [];
  items: any[] = [];

  readonly upload = viewChild<FileUpload>('upload');

  results: ParseResult<any> | undefined;
  dialogData: any;
  verified: Boolean = false;
  messages: ToastMessageOptions[] = [];

  constructor(
    config: DynamicDialogConfig,
    private http: HttpClient,
    private dialogRef: DynamicDialogRef,
    private utilService: UtilService
  ) {
    config.maximizable = true;
    this.dialogData = config.data;
  }

  readCSV(file: File) {
    var self = this;
    Papa.parse(file, {
      header: this.uimodule()?.properties.Header == 'true',
      complete: function (results: ParseResult<any>) {
        self.results = results;
        self.updateTable(results.meta.fields, results.data);
      },
    });
  }

  updateTable(cols: string[] | undefined, items: any[]) {
    if (cols) {
      this.cols = cols;
      this.items = items;
    }
  }

  onSelect(event: FileSelectEvent) {
    if (event.currentFiles.length == 1) {
      this.readCSV(event.currentFiles[0]);
    }
  }

  clear() {
    this.verified = false;
    this.cols = [];
    this.items = [];
    this.upload()?.clear();
    this.messages = [];
  }

  verify() {
    const url = `${this.utilService.evalApiUrl()}/ui/modules/csvimport/${
      this.dialogData.item.id
    }/validate`;
    this.http
      .post<any>(url, {
        parentOid: this.data()?.parentOid,
        result: this.results,
      })
      .subscribe({
        next: (body) => {
          console.log(body);
          if (body.length == 0) {
            this.verified = true;
          } else {
            (body as string[]).forEach((msg) => {
              this.messages.push({ severity: 'error', detail: msg });
            });
          }
        },
      });
  }

  execute() {
    const url = `${this.utilService.evalApiUrl()}/ui/modules/csvimport/${
      this.dialogData.item.id
    }/execute`;
    this.http
      .post<any>(url, {
        parentOid: this.data()?.parentOid,
        result: this.results,
      })
      .subscribe({
        next: (body) => {
          if (body && body.message) {
            this.messages.push({ severity: 'error', detail: body.message });
          } else {
            this.dialogRef.close({ reload: true });
          }
        },
      });
  }
}
