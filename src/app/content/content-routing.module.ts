import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../guard/auth.guard';
import { ContentComponent } from './content/content.component';

const routes: Routes = [
  {
    path: ':oid',
    canActivate: [AuthGuard],
    component: ContentComponent,
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContentRoutingModule { }
