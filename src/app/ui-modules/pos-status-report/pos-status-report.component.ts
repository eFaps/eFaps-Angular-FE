import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, effect, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import TimeAgo from 'javascript-time-ago';
import es from 'javascript-time-ago/locale/es';
import { FloatLabelModule } from 'primeng/floatlabel';
import { SelectModule } from 'primeng/select';
import { interval, Subscription } from 'rxjs';
import { UtilService } from '../../services/util.service';

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
  status: Status;
}

export enum Status {
  UNKNOWN = 1,
  WARNING = 2,
  OK = 3,
}

@Component({
  selector: 'app-pos-status-report',
  imports: [FormsModule, DatePipe, SelectModule, FloatLabelModule],
  templateUrl: './pos-status-report.component.html',
  styleUrl: './pos-status-report.component.scss',
})
export class PosStatusReportComponent implements OnInit {
  private http = inject(HttpClient);
  private utilService = inject(UtilService);
  private router = inject(Router);

  x = new TimeAgo('es').format(new Date());

  report = signal<StatusReport | undefined>(undefined);

  timeFrames = [
    { label: 'deactivado', value: 0 },
    { label: '30s', value: 30 },
    { label: '60s', value: 60 },
    { label: '5m', value: 300 },
    { label: '10m', value: 600 },
  ];
  selectedTimeFrame = signal(0);

  timeFrameSubscription: Subscription | undefined;

  counter = signal(0);

  constructor() {
    effect(() => {
      const timeFrame = this.selectedTimeFrame();
      this.timeFrameSubscription?.unsubscribe();
      if (timeFrame > 0) {
        this.counter.set(timeFrame);
        this.timeFrameSubscription = interval(1000).subscribe((res) => {
          this.counter.update((counter) => {
            if (counter < 1) {
              counter = timeFrame;
              this.autoRefresh();
            } else {
              counter = counter - 1;
            }
            return counter;
          });
        });
      }
    });
  }

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
          val.status = this.evalStaus(val);
        });
        report.backendStatus.sort((a, b) => {
          const statusResult = a.status - b.status;
          return statusResult == 0
            ? a.name.localeCompare(b.name)
            : statusResult;
        });
        this.report.set(report);
      },
    });
  }

  autoRefresh() {
    this.load(false);
  }

  evalStaus(backendStatus: BackendStatus): Status {
    if (backendStatus.lastSeenAt) {
      var lastSeenAt = Date.parse(backendStatus.lastSeenAt);
      var date = Date.now();
      const minutes = Math.floor((date - lastSeenAt) / (1000 * 60));
      console.log(minutes);
      return minutes > 60 ? Status.WARNING : Status.OK;
    } else {
      return Status.UNKNOWN;
    }
  }

  navigate(oid: string) {
    this.router.navigate(['content', oid]);
  }
}
