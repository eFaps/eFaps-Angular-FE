import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../guard/auth.guard';
import { StructureBrowserComponent } from './structure-browser/structure-browser.component';

const routes: Routes = [
  {
    path: ':id',
    pathMatch: 'full',
    canActivate: [AuthGuard],
    component: StructureBrowserComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StructureBrowserRoutingModule {}
