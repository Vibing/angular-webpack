import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { WelcomeModule } from './welcome/welcome.module';

@NgModule({
  imports: [CommonModule, WelcomeModule],
  exports: [RouterModule],
})
export class DashboardModule {}
