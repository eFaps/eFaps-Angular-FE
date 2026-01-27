import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';

import { Dashboard, DashboardPage } from '../../model/dashboard';
import { DashboardService } from '../../services/dashboard.service';

@Component({
  selector: 'app-edit-page',
  imports: [FormsModule, ButtonModule, TableModule, InputTextModule],
  templateUrl: './edit-page.component.html',
  styleUrl: './edit-page.component.scss',
})
export class EditPageComponent implements OnInit {
  private dashboardService = inject(DashboardService);
  private dialogRef = inject(DynamicDialogRef);

  pages = signal<DashboardPage[]>([]);
  dashboard: Dashboard | undefined;

  ngOnInit(): void {
    this.dashboardService.getDashboard().subscribe({
      next: (dashboard) => {
        this.dashboard = dashboard;
        this.pages.set(dashboard.pages);
      },
    });
  }

  submit() {
    if (this.dashboard) {
      this.dashboardService.updateDashboard(this.dashboard).subscribe({
        next: () => {
          this.dialogRef.close();
        },
      });
    }
  }

  removePage(index: number) {
    this.pages.update((current) => {
      current.splice(index, 1);
      return current;
    });
  }

  addPage() {
    const key = Math.random().toString(36).slice(2, 7);
    this.pages.update((current) => {
      current.push({
        key: key,
        label: 'Nueva pagina',
        items: [],
      });
      return current;
    });
  }
}
