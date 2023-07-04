import { Component, OnInit } from '@angular/core';
import { Page } from 'src/app/model/dashboard';
import { DashboardService } from 'src/app/services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  pages: Page[] = [];
  constructor(private dashboardService: DashboardService) {}
  ngOnInit(): void {
    this.dashboardService.getDashboard().subscribe({
      next: (dashboard) => {
        this.pages = dashboard.pages;
      },
    });
  }
}
