import { HttpClient } from '@angular/common/http';
import { Component, OnInit, input, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { SelectModule } from 'primeng/select';
import { TableEditCompleteEvent, TableModule } from 'primeng/table';

import { ModuleData, UIModule } from 'src/app/model/module';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-logback',
  imports: [ButtonModule, SelectModule, FormsModule, TableModule],
  templateUrl: './logback.component.html',
  styleUrls: ['./logback.component.scss'],
})
export class LogbackComponent implements OnInit {
  private dialogRef = inject(DynamicDialogRef);
  private http = inject(HttpClient);
  private utilService = inject(UtilService);

  readonly uimodule = input<UIModule>();
  readonly data = input<ModuleData>();

  loggers: [] = [];

  levels: string[] = [
    '',
    'ALL',
    'TRACE',
    'INFO',
    'DEBUG',
    'WARN',
    'ERROR',
    'OFF',
  ];

  alteredLoggers: any[] = [];

  constructor() {
    const config = inject(DynamicDialogConfig);

    config.header = 'Logger Configuration';
  }

  ngOnInit(): void {
    const url = `${this.utilService.evalApiUrl()}/logback/configuration`;
    this.http.get<any>(url).subscribe({
      next: (loggers) => {
        this.loggers = loggers;
      },
    });
  }

  afterEdit(event: TableEditCompleteEvent) {
    if (event.data) {
      this.alteredLoggers.push(event.data);
    }
  }

  submit() {
    if (this.alteredLoggers.length > 0) {
      const url = `${this.utilService.evalApiUrl()}/logback/configuration`;
      this.http.put<any>(url, this.alteredLoggers).subscribe({
        next: (_) => {
          this.dialogRef.close({ reload: true });
        },
      });
    }
  }
}
