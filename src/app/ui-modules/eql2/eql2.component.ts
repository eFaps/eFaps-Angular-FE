import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { FloatLabelModule } from 'primeng/floatlabel';
import { TextareaModule } from 'primeng/textarea';

import { HttpClient } from '@angular/common/http';
import { PanelModule } from 'primeng/panel';
import { TableModule } from 'primeng/table';
import { UtilService } from 'src/app/services/util.service';
import {
  CIDisplayComponent,
  EQL2CIResponse,
} from './cidisplay/cidisplay.component';
import { EQL2HistoryComponent } from './eql2-history/eql2-history.component';

interface StmtEntry {
  stmt: string;
  status?: string;
  result?: string;
}

@Component({
  selector: 'app-eql2',
  imports: [
    FormsModule,
    TextareaModule,
    FloatLabelModule,
    ButtonModule,
    TableModule,
    CIDisplayComponent,
    EQL2HistoryComponent,
    PanelModule,
  ],
  templateUrl: './eql2.component.html',
  styleUrl: './eql2.component.scss',
})
export class EQL2Component {
  private http = inject(HttpClient);
  private utilService = inject(UtilService);

  _stmt: string | undefined;

  stmts = signal<StmtEntry[]>([]);

  valid = false;

  results = signal<any[]>([]);
  resultColumns = signal<{ header: string; field: string }[]>([]);

  ciResponse = signal<EQL2CIResponse | undefined>(undefined);

  msgs = signal<{ msg: string }[]>([]);

  constructor() {
    const config = inject(DynamicDialogConfig);
    config.header = 'Execute EQL2';
    config.closable = true;
    config.maximizable = true;
    config.resizable = true;
    config.width = '90vw';
    config.height = '90vh';
  }

  set stmt(stmt: string) {
    this.valid = stmt != null && stmt.length > 3;
    this._stmt = stmt;

    this.stmts.set([]);
    const tmpStmts: StmtEntry[] = [];
    stmt.split(/;/).forEach((st) => {
      if (st.length > 10 && !st.trim().startsWith('print')) {
        tmpStmts.push({
          stmt: st.trim(),
        });
      }
    });

    if (tmpStmts.length > 1 && tmpStmts.length < 11) {
      this.stmts.set(tmpStmts);
    }
  }

  get stmt(): string | undefined {
    return this._stmt;
  }

  execute() {
    this.clear();
    const url = `${this.utilService.evalApiUrl()}/ui/modules/console-eql2`;
    if (this.stmts().length > 0) {
      this.stmts().forEach((stmt, index) => {
        this.stmts.update((current) => {
          current[index].status = 'Started';
          return [...current];
        });

        this.http.post<any>(url, stmt.stmt).subscribe({
          next: (resp) => {
            this.stmts.update(current => {
              current[index].result = resp.msg;
              current[index].status = 'OK';
              return [...current]
            }
            );
          },
          error: (err) => {
            this.stmts.update((current) => {
              current[index].status = err.code;
              return [...current];
            });
          },
        });
      });
    } else {
      this.http.post(url, this.stmt).subscribe({
        next: (resp) => {
          this.evalResponse(resp);
        },
      });
    }
  }

  clear() {
    this.ciResponse.set(undefined);
    this.results.set([]);
    this.msgs.set([]);
  }

  evalResponse(response: any) {
    if (Array.isArray(response)) {
      if (response.length > 0 && 'msg' in response[0]) {
        this.msgs.set(response);
      }
    } else {
      if (response.keys) {
        this.resultColumns.set(
          (response.keys as Array<string>).map((key) => {
            return { header: key, field: key };
          }),
        );
        this.results.set(response.values);
      } else if (response.id) {
        this.ciResponse.set(response);
      } else if (response.msg) {
        this.msgs.set([response]);
      }
    }
  }
}
