import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AuthGuard } from './guard/auth.guard';

const routes: Routes = [
  {
    path: 'table',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./table/table.module').then((m) => m.TableModule),
  },
  {
    path: 'form',
    canActivate: [AuthGuard],
    loadChildren: () => import('./form/form.module').then((m) => m.FormModule),
  },
  {
    path: '',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
