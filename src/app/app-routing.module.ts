import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { canActivateAuth } from './guard/auth.guard';

export const routes: Routes = [
  {
    path: 'strctbrws',
    canActivate: [canActivateAuth],
    loadChildren: () =>
      import('./structure-browser/structure-browser.module').then(
        (m) => m.StructureBrowserModule,
      ),
  },
  {
    path: 'table',
    canActivate: [canActivateAuth],
    loadChildren: () =>
      import('./table/table.module').then((m) => m.TableModule),
  },
  {
    path: 'content',
    canActivate: [canActivateAuth],
    loadChildren: () =>
      import('./content/content.module').then((m) => m.ContentModule),
  },
  {
    path: 'dashboard',
    canActivate: [canActivateAuth],
    loadChildren: () =>
      import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
  },
  {
    path: 'first-time-user',
    loadComponent: () =>
      import('./standalone/first-time-user/first-time-user.component').then(
        (mod) => mod.FirstTimeUserComponent,
      ),
  },
  {
    path: '',
    canActivate: [canActivateAuth],
    loadChildren: () =>
      import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
