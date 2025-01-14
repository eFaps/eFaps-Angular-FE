import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { canActivateAuth } from '../guard/auth.guard';
import { TableComponent } from './table/table.component';

const routes: Routes = [
  {
    path: ':id',
    pathMatch: 'full',
    canActivate: [canActivateAuth],
    component: TableComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TableRoutingModule {}
