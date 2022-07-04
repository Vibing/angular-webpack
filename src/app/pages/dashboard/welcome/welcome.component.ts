import {
  ChangeDetectionStrategy,
  Component,
  ComponentFactoryResolver,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';

import { PageStoreService } from './page-store.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.less'],
  providers: [PageStoreService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WelcomeComponent implements OnInit {
  @ViewChild('dynamicContent', { read: ViewContainerRef })
  dyncomp!: ViewContainerRef;

  constructor(private cfr: ComponentFactoryResolver) {}

  async ngOnInit() {}

  async loadComponent1() {
    // lazyLoad组件
    const { Comp1Component } = await import(
      /* webpackChunkName: "comp1" */ './comp1/comp1.component'
    );

    // 将组件载入到ng-template中
    const loadedComponent = this.dyncomp.createComponent(
      this.cfr.resolveComponentFactory(Comp1Component)
    );
  }

  async loadComponent2() {
    // lazyLoad组件
    const { Comp2Component } = await import(
      /* webpackChunkName: "comp2" */ './comp2/comp2.component'
    );

    // 将组件载入到ng-template中
    const loadedComponent = this.dyncomp.createComponent(
      this.cfr.resolveComponentFactory(Comp2Component)
    );
  }
}
