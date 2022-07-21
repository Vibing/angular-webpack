import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MonitorComponent } from './monitor.component';
import { PageStoreService } from './store/store.service';
import { MonitorListComponent } from './components/list/monitor-list.component';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTreeViewModule } from 'ng-zorro-antd/tree-view';

const routes: Routes = [
  {
    path: '',
    component: MonitorComponent,
  },
];

@NgModule({
  declarations: [MonitorComponent, MonitorListComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    NzTableModule,
    NzTreeViewModule,
  ],
  providers: [PageStoreService],
})
export class MonitorModule {}
