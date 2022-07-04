import { Component, OnInit } from '@angular/core';
import { PageStoreService } from '../page-store.service';

@Component({
  selector: 'app-comp1',
  templateUrl: './comp1.component.html',
  styleUrls: ['./comp1.component.less'],
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
    console.log(this.store.title);
  }
}
