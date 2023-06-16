import { NgModule } from '@angular/core';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { InfoComponent } from './info.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

export { InfoComponent } from './info.component';

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, NzDatePickerModule],
  exports: [InfoComponent],
  declarations: [InfoComponent],
  providers: [],
})
export class InfoModule {
  getInfoComponent() {
    return InfoComponent;
  }
}
