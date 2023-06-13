import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'common-info',
  templateUrl: './info.component.html',
})
export class InfoComponent implements OnInit {
  date = null;
  isEnglish = false;

  constructor() {}

  ngOnInit() {}

  onChange(result: Date): void {
    console.log('onChange: ', result);
  }
}
