import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../guard/auth.guard';
import { TableComponent } from '../table/table/table.component';
import { ContentComponent } from './content/content.component';
import { FormContentComponent } from './form-content/form-content.component';
import { ModuleContentComponent } from './module-content/module-content.component';

const routes: Routes = [
  {
    path: ':oid',
    canActivate: [AuthGuard],
    component: ContentComponent,

    children: [
      {
        path: 'table/:id',
        canActivate: [AuthGuard],
        component: TableComponent,
        outlet: 'contentOutlet',
      },
      {
        path: 'form/:id',
        canActivate: [AuthGuard],
        component: FormContentComponent,
        outlet: 'contentOutlet',
      },
    ],
  },
  {
    path: 'form/:id',
    canActivate: [AuthGuard],
    component: FormContentComponent,
  },
  {
    path: 'module/:id',
    canActivate: [AuthGuard],
    component: ModuleContentComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContentRoutingModule {}
