import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { GridsterModule } from 'angular-gridster2';
import { CarouselModule } from 'primeng/carousel';
import { TableModule } from 'primeng/table';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ItemComponent } from './item/item.component';
import { PageComponent } from './page/page.component';
import { TableWidgetComponent } from './table-widget/table-widget.component';

@NgModule({
  declarations: [
    DashboardComponent,
    PageComponent,
    ItemComponent,
    TableWidgetComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    CarouselModule,
    GridsterModule,
    TableModule,
  ],
})
export class DashboardModule {}
