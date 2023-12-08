import { NgModule } from '@angular/core';
import { DisabledDetailComponent } from './detail';
import { DisabledListComponent } from './list';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: DisabledListComponent },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [],
  declarations: [DisabledDetailComponent, DisabledListComponent],
  providers: [],
})
export class DisabledTestModule {}
