import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { canActivateAuth } from '../guard/auth.guard';


const routes: Routes = [
  {
    path: '',
    canActivate: [canActivateAuth],
    loadComponent: () => import('./dashboard/dashboard.component').then(m => m.DashboardComponent),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
