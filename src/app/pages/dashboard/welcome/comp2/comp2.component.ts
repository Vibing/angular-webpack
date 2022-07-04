import { Component, OnInit } from '@angular/core';
import { PageStoreService } from '../page-store.service';

@Component({
  selector: 'app-comp2',
  templateUrl: './comp2.component.html',
  styleUrls: ['./comp2.component.less'],
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
    console.log(this.store.message);
  }
}
