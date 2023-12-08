import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'disabled-list',
  template: `
    <div *ngFor="let item of list" (click)="click(item)">{{ item.name }}</div>
    <disabled-detail [item]="item"></disabled-detail>
  `,
})
export class DisabledListComponent implements OnInit {
  list = [
    { name: 111 },
    { name: 222 },
    { name: 333 },
    { name: 444 },
    { name: 555 },
  ];

  item: any = null;

  constructor() {}

  ngOnInit() {
    this.item = this.list[0];
  }

  click(item: any) {
    this.item = item;
  }
}
