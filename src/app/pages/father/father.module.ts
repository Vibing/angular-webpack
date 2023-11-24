import { NgModule } from '@angular/core';
import { LayoutMenuComponent } from './layout/menu.component';
import { NoDataComponent } from './layout/no-data.component';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ChildAComponent } from './child/child-a.component';
import { LayoutContainerComponent } from './layout/container.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: NoDataComponent,
  },
  {
    path: ':id',
    redirectTo: ':id/:cid',
  },
  {
    path: ':id/:cid',
    pathMatch: 'prefix',
    component: ChildAComponent,
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [],
  declarations: [
    LayoutMenuComponent,
    NoDataComponent,
    LayoutContainerComponent,
    LayoutMenuComponent,
  ],
  providers: [],
})
export class FatherModule {}
