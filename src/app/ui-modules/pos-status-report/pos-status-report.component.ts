import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import TimeAgo from 'javascript-time-ago';
import es from 'javascript-time-ago/locale/es';
import { delay, interval } from 'rxjs';

import { UtilService } from 'src/app/services/util.service';

TimeAgo.addDefaultLocale(es);

interface StatusReport {
  dateTime: string;
  reloadInterval: number;
  backendStatus: BackendStatus[];
  date: number;
}

interface BackendStatus {
  oid: string;
  name: string;
  lastSeenAt: string;
  timeAgo: string;
}

export enum Status {
  OK = 'OK',
  UNKNOWN = 'UNKNOWN',
}

@Component({
  selector: 'app-pos-status-report',
  imports: [DatePipe],
  templateUrl: './pos-status-report.component.html',
  styleUrl: './pos-status-report.component.scss',
})
export class PosStatusReportComponent implements OnInit {
  private http = inject(HttpClient);
  private utilService = inject(UtilService);
  private router = inject(Router);

  x = new TimeAgo('es').format(new Date());

  report = signal<StatusReport | undefined>(undefined);

  ngOnInit(): void {
    this.load(true);
  }

  load(init: boolean) {
    const url = `${this.utilService.evalApiUrl()}/ui/modules/pos-status`;
    this.http.get<StatusReport>(url).subscribe({
      next: (report) => {
        report.date = Date.parse(report.dateTime);
        report.backendStatus.forEach((val) => {
          if (val.lastSeenAt) {
            var date = Date.parse(val.lastSeenAt);
            val.timeAgo = new TimeAgo('es').format(date);
          }
        });
        report.backendStatus.sort((a, b) => {
          return a.name.localeCompare(b.name);
        });
        this.report.set(report);
        if (init) {
          interval(report.reloadInterval * 1000 * 60).subscribe((res) =>
            this.autoRefresh(),
          );
        }
      },
    });
  }

  autoRefresh() {
    this.load(false);
  }

  evalStaus(backendStatus: BackendStatus): Status {
    if (backendStatus.lastSeenAt) {
      return Status.OK;
    } else {
      return Status.UNKNOWN;
    }
  }

  navigate(oid: string) {
    this.router.navigate(['content', oid]);
  }
}
