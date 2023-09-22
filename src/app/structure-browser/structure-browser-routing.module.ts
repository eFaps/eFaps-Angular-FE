import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StructureBrowserComponent } from './structure-browser/structure-browser.component';
import { AuthGuard } from '../guard/auth.guard';

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
  exports: [RouterModule]
})
export class StructureBrowserRoutingModule { }
