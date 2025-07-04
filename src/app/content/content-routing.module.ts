import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { canActivateAuth } from '../guard/auth.guard';
import { TableComponent } from '../table/table/table.component';

const routes: Routes = [
  {
    path: ':oid',
    canActivate: [canActivateAuth],
    loadComponent: () =>
      import('./content/content.component').then((m) => m.ContentComponent),

    children: [
      {
        path: 'table/:id',
        canActivate: [canActivateAuth],
        component: TableComponent,
        outlet: 'contentOutlet',
      },
      {
        path: 'form/:id',
        canActivate: [canActivateAuth],
        loadComponent: () =>
          import('./form-content/form-content.component').then(
            (m) => m.FormContentComponent,
          ),
        outlet: 'contentOutlet',
      },
    ],
  },
  {
    path: 'form/:id',
    canActivate: [canActivateAuth],
    loadComponent: () =>
      import('./form-content/form-content.component').then(
        (m) => m.FormContentComponent,
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContentRoutingModule {}
