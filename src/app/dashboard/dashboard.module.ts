import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GridsterModule } from 'angular-gridster2';
import { AutoComplete } from 'primeng/autocomplete';
import { ButtonModule } from 'primeng/button';
import { ChartModule } from 'primeng/chart';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { StepsModule } from 'primeng/steps';
import { TableModule } from 'primeng/table';
import { TextareaModule } from 'primeng/textarea';

import { ChartWidgetComponent } from './chart-widget/chart-widget.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EditComponent } from './edit/edit.component';
import { ItemComponent } from './item/item.component';
import { PageComponent } from './page/page.component';
import { TableWidgetComponent } from './table-widget/table-widget.component';

@NgModule({
  imports: [
    DashboardRoutingModule,
  ],
})
export class DashboardModule {}
