import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { canActivateAuth } from './guard/auth.guard';

export const routes: Routes = [
  {
    path: 'strctbrws/:id',
    canActivate: [canActivateAuth],
    pathMatch: 'full',
    loadComponent: () =>
      import(
        './structure-browser/structure-browser/structure-browser.component'
      ).then((m) => m.StructureBrowserComponent),
  },
  {
    path: 'table/:id',
    canActivate: [canActivateAuth],
    pathMatch: 'full',
    loadComponent: () =>
      import('./table/table/table.component').then((m) => m.TableComponent),
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
    loadComponent: () =>
      import('./dashboard/dashboard/dashboard.component').then(
        (m) => m.DashboardComponent,
      ),
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
    loadComponent: () =>
      import('./dashboard/dashboard/dashboard.component').then(
        (m) => m.DashboardComponent,
      ),
  },
  { path: '**', redirectTo: '' },
];
