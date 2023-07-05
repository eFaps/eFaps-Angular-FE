import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { GridsterModule } from 'angular-gridster2';
import { ButtonModule } from 'primeng/button';
import { ChartModule } from 'primeng/chart';
import { TableModule } from 'primeng/table';

import { ChartWidgetComponent } from './chart-widget/chart-widget.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ItemComponent } from './item/item.component';
import { PageComponent } from './page/page.component';
import { TableWidgetComponent } from './table-widget/table-widget.component';
import { StepsModule } from 'primeng/steps';

@NgModule({
  declarations: [
    DashboardComponent,
    PageComponent,
    ItemComponent,
    TableWidgetComponent,
    ChartWidgetComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    GridsterModule,
    TableModule,
    ChartModule,
    ButtonModule,
    StepsModule
  ],
})
export class DashboardModule {}
