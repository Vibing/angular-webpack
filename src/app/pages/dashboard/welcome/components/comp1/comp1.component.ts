import { Component, OnInit } from '@angular/core';
import { PageStoreService } from '../../store/store.service';

@Component({
  selector: 'app-comp1',
  template: `
    <div style="background:#BDD7F2;padding:10px;">
      <h4>LazyLoaded：comp1</h4>
      <p>store state 1：{{ store.title }}</p>
      <p>store state 2：{{ store.message }}</p>
      <button (click)="changeTitle()">change state1</button>
    </div>
  `,
})
export class Comp1Component implements OnInit {
  get store() {
    return this.pageStore.state;
  }

  constructor(public pageStore: PageStoreService) {}

  ngOnInit(): void {}

  changeTitle() {
    this.pageStore.setState({
      title: `${new Date().getTime()}`,
    });
  }
}
