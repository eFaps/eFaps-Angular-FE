import { Component, OnInit } from '@angular/core';
import { DashboardPage } from 'src/app/model/dashboard';
import { DashboardService } from 'src/app/services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  pages: DashboardPage[] = [];
  editMode = false;

  buttonClass = 'p-button-rounded';

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.dashboardService.getDashboard().subscribe({
      next: (dashboard) => {
        this.pages = dashboard.pages;
      },
    });
  }

  toggleEditMode() {
    this.editMode = !this.editMode;
    this.buttonClass = 'p-button-rounded';
    if (this.editMode) {
      this.buttonClass = this.buttonClass + ' p-button-warning';
    }
  }
}
