import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../guard/auth.guard';
import { FormComponent } from './form/form.component';

const routes: Routes = [
  {
    path: ':oid',
    canActivate: [AuthGuard],
    component: FormComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormRoutingModule {}
