import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { DashboardPage } from 'src/app/model/dashboard';
import { DashboardService } from 'src/app/services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  currentPage: DashboardPage | undefined;
  pages: DashboardPage[] = [];
  editMode = false;
  buttonClass = 'p-button-rounded';
  buttonIcon = 'pi pi-lock';
  steps: MenuItem[] = [];
  activeStepIdx: number = 0;
  deactivated = false;
  
  constructor(private dashboardService: DashboardService) { }

  ngOnInit(): void {
    this.dashboardService.getDashboard().subscribe({
      next: (dashboard) => {
        // dashboard is deactivated
        if (dashboard == null) {
          this.deactivated = true;
        } else {
          this.pages = dashboard.pages;
          if (this.pages && this.pages.length > 0) {
            this.currentPage = this.pages[0];
            if (this.pages.length > 1) {
              let tmpStep: MenuItem[] = [];
              this.pages.forEach((page) => {
                tmpStep.push({ label: page.label });
              });
              this.steps = tmpStep;
            }
          }
        }
      },
    });
  }

  toggleEditMode() {
    this.editMode = !this.editMode;
    this.buttonClass = 'p-button-rounded';
    if (this.editMode) {
      this.buttonClass = this.buttonClass + ' p-button-warning';
      this.buttonIcon = 'pi pi-lock-open';
    } else {
      this.buttonIcon = 'pi pi-lock';
      this.dashboardService.persist();
    }
  }

  onActiveStepChange(idx: number) {
    this.currentPage = this.pages[idx];
  }
}
