import {
  Component,
  ComponentFactoryResolver,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';

export type TComponent = () => Promise<any>;

@Component({
  selector: 'app-welcome',
  template: `
    <h3>路由级别的 LazyLoad</h3>
    <p>
      以页面为单位的模块划分，每个路由对应一个模块，从而实现路由级别的 lazyLoad
    </p>
    <h3>组件级别的 LazyLoad</h3>
    <p>在页面中对某些组件进行 lazyLoad</p>
    <ng-template #dynamicContent></ng-template>
    <button (click)="loadComponent1()">LazyLoad comp1</button>
    <button (click)="loadComponent2()">LazyLoad comp2</button>
  `,
})
export class WelcomeComponent implements OnInit {
  @ViewChild('dynamicContent', { read: ViewContainerRef })
  dyncomp!: ViewContainerRef;

  constructor(private cfr: ComponentFactoryResolver) {}

  ngOnInit() {
    this.loadComponent(() =>
      import(
        /* webpackChunkName: "comp1" */ './components/comp1/comp1.component'
      ).then((c) => c.Comp1Component)
    );
  }

  async loadComponent(component: TComponent) {
    const loadedComponent = await component();
    return this.dyncomp.createComponent(
      this.cfr.resolveComponentFactory(loadedComponent)
    );
  }

  async loadComponent1() {
    // lazyLoad组件
    this.loadComponent(() =>
      import(
        /* webpackChunkName: "comp1" */ './components/comp1/comp1.component'
      ).then((c) => c.Comp1Component)
    );
  }

  async loadComponent2() {
    // lazyLoad组件
    this.loadComponent(() =>
      import(
        /* webpackChunkName: "comp2" */ './components/comp2/comp2.component'
      ).then((c) => c.Comp2Component)
    );
  }
}
