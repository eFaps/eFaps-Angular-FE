import { canActivateAuth } from '../guard/auth.guard';
import { StructureBrowserComponent } from './structure-browser/structure-browser.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: ':id',
    pathMatch: 'full',
    canActivate: [canActivateAuth],
    component: StructureBrowserComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StructureBrowserRoutingModule {}
