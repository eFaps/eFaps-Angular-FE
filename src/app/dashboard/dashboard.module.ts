import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CarouselModule } from 'primeng/carousel';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PageComponent } from './page/page.component';
@NgModule({
  declarations: [DashboardComponent, PageComponent],
  imports: [CommonModule, DashboardRoutingModule, CarouselModule],
})
export class DashboardModule {}
