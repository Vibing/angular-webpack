import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WelcomeComponent } from './welcome.component';
import { RouterModule, Routes } from '@angular/router';
import { PageStoreService } from './store/store.service';

const routes: Routes = [{ path: '', component: WelcomeComponent }];
@NgModule({
  declarations: [WelcomeComponent],
  imports: [RouterModule.forChild(routes), CommonModule],
  providers: [PageStoreService],
})
export class WelcomeModule {}
