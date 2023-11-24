import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'no-data',
  template: ` <h3>无数据</h3> `,
})
export class NoDataComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
