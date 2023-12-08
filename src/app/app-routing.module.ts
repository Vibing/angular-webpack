import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutContainerComponent } from './pages/father/layout/container.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/dashboard' },
  {
    path: 'dashboard',
    loadChildren: () =>
      import(
        /* webpackChunkName: "DashboardModule" */ './pages/dashboard/dashboard.module'
      ).then((m) => m.DashboardModule),
  },
  {
    path: 'disabled',
    loadChildren: () =>
      import(
        /* webpackChunkName: "DashboardModule" */ './pages/dashboard/disabled/disabled.module'
      ).then((m) => m.DisabledTestModule),
  },
  {
    path: 'father',
    component: LayoutContainerComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import(
            /* webpackChunkName: "FatherModule" */ './pages/father/father.module'
          ).then((m) => m.FatherModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
