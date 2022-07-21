import { Component, OnInit } from '@angular/core';
import { PageStoreService } from '../../store/store.service';

@Component({
  selector: 'app-comp2',
  template: `
    <div style="background:pink;padding:10px;">
      <h4>LazyLoaded：comp2!</h4>
      <p>store state 1：{{ store.title }}</p>
      <p>store state 2：{{ store.message }}</p>
      <button (click)="changeTitle()">change</button>
    </div>
  `,
})
export class Comp2Component implements OnInit {
  get store() {
    return this.pageStore.state;
  }

  constructor(public pageStore: PageStoreService) {}

  ngOnInit(): void {}

  changeTitle() {
    this.pageStore.setState({
      message: `${new Date().getTime()}`,
    });
  }
}
