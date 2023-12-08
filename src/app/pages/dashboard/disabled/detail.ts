import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'disabled-detail',
  template: `
    <form [formGroup]="form">
      <input type="checkbox" formControlName="checkbox" />{{ item.name }}
    </form>
  `,
})
export class DisabledDetailComponent implements OnChanges {
  @Input() item: any;

  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({});
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.form = this.fb.group({
      name: [''],
      checkbox: [false],
    });

    if (this.item.name === 111) {
      this.form.get('checkbox')?.disable();
    }
    console.log(this.form);
  }
}
