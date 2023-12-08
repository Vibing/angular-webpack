import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { WorkPlaceComponent } from './work-place/work-place.component';
import { TestPageComponent } from './test-page/test-page.component';

export const routes: Routes = [
  {
    path: 'welcome',
    loadChildren: () =>
      import(
        /* webpackChunkName: "m_welcome" */ './welcome/welcome.module'
      ).then((m) => m.WelcomeModule),
  },
  {
    path: 'monitor',
    loadChildren: () =>
      import(
        /* webpackChunkName: "m_monitor" */ './monitor/monitor.module'
      ).then((m) => m.MonitorModule),
  },
  {
    path: 'workplace',
    component: WorkPlaceComponent,
  },
  {
    path: 'test',
    component: TestPageComponent,
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
  declarations: [TestPageComponent],
})
export class DashboardModule {}
