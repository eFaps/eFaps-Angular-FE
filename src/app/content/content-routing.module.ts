import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { canActivateAuth } from '../guard/auth.guard';
import { TableComponent } from '../table/table/table.component';
import { ContentComponent } from './content/content.component';
import { FormContentComponent } from './form-content/form-content.component';

const routes: Routes = [
  {
    path: ':oid',
    canActivate: [canActivateAuth],
    component: ContentComponent,

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
        component: FormContentComponent,
        outlet: 'contentOutlet',
      },
    ],
  },
  {
    path: 'form/:id',
    canActivate: [canActivateAuth],
    component: FormContentComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContentRoutingModule {}
