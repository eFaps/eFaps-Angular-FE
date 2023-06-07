import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../guard/auth.guard';
import { ContentComponent } from './content/content.component';
import { TableComponent } from '../table/table/table.component';

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
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContentRoutingModule {}
