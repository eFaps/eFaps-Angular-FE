import { Component, OnInit, inject } from '@angular/core';
import { LocalStorageService } from 'ngx-localstorage';
import { MenuItem, PrimeIcons } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DialogService } from 'primeng/dynamicdialog';
import { SpeedDialModule } from 'primeng/speeddial';
import { StepsModule } from 'primeng/steps';

import { EditPageComponent } from '../edit-page/edit-page.component';
import { PageComponent } from '../page/page.component';
import { DashboardPage } from 'src/app/model/dashboard';
import { DashboardService } from 'src/app/services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  imports: [PageComponent, StepsModule, ButtonModule, SpeedDialModule],
})
export class DashboardComponent implements OnInit {
  private dashboardService = inject(DashboardService);

  private dialogService = inject(DialogService);
  private readonly storageService = inject(LocalStorageService);
  private storedStepIdx = this.storageService.get<number>('dashboardStepIdx');

  currentPage: DashboardPage | undefined;
  pages: DashboardPage[] = [];
  editMode = false;
  buttonClass = 'p-button-rounded';
  buttonIcon = 'pi pi-lock';
  steps: MenuItem[] = [];

  activeStepIdx: number = this.storedStepIdx ? this.storedStepIdx : 0;

  deactivated = false;
  menuItems = [
    {
      icon: PrimeIcons.FILE_EDIT,
      label: 'Editar paginas',
      command: () => {
        this.editPages();
      },
    },
    {
      icon: PrimeIcons.PENCIL,
      label: 'Editar pagina actual',
      command: () => {
        this.editCurentPage();
      },
    },
  ];

  ngOnInit(): void {
    this.load();
  }

  load() {
    this.dashboardService.getDashboard().subscribe({
      next: (dashboard) => {
        // dashboard is deactivated
        if (dashboard == null) {
          this.deactivated = true;
        } else {
          this.pages = dashboard.pages;
          if (this.pages && this.pages.length > 0) {
            this.currentPage = this.pages[this.activeStepIdx];
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

  editCurentPage() {
    this.editMode = true;
  }

  save() {
    this.editMode = false;
    this.dashboardService.persist().subscribe((_) => {
      this.load();
    });
  }

  abort() {
    this.editMode = false;
    this.load();
  }

  onActiveStepChange(idx: number) {
    this.currentPage = this.pages[idx];
    this.storageService.set('dashboardStepIdx', idx);
  }

  editPages() {
    const dialogRef = this.dialogService.open(EditPageComponent, {
      maximizable: true,
      closable: true,
      header: 'Editar paginas',
      modal: true,
    });
    dialogRef.onClose.subscribe({
      next: () => {
        this.load();
      },
    });
  }
}
