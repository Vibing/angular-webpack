开发中经常一个 `module` 有很多组件，目前 Angular 的路由使用代码分割只支持以 module 为单位，这会有一个问题：一个 `module` 可能包含多个页面，当用户只访问`页面A`时，打包出来的 module 代码却包含没有被访问的其他页面。

理想情况是让用户在访问每个路由时只 lazyLoad 当前页面的代码，而非整个 module 的代码，避免造成用户等待时间加长的体验问题、流量问题等。

好消息是这个方案是可以实现的：Angular 内部支持动态组件的功能，可以通过该功能配合 `import()`方法达到组件级别的代码分割。

### 动态组件配合 import()做组件级别代码分割

核心代码：

```typescript
import {
  ChangeDetectionStrategy,
  Component,
  ComponentFactoryResolver,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from "@angular/core";

@Component({
  selector: "app-welcome",
  template: `
    <ng-template #dynamicContent></ng-template>
    <button (click)="loadComponent()">lazyLoad component</button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WelcomeComponent implements OnInit {
  @ViewChild("dynamicContent", { read: ViewContainerRef })
  dyncomp!: ViewContainerRef;

  constructor(private cfr: ComponentFactoryResolver) {}

  async loadComponent() {
    // lazyLoad组件
    const { Comp1Component } = await import(
      /* webpackChunkName: "comp1" */ "./comp1/comp1.component"
    );

    // 将组件载入到ng-template中
    const loadedComponent = this.dyncomp.createComponent(
      this.cfr.resolveComponentFactory(Comp1Component)
    );
  }
}
```

### 使用 webpack + DLL

​ 前端优化点之一就是使用 webpack 的 DLL 来把 Angular 相关的库比如 rxjs、router 等缓存起来，因为这些库几乎不会跟着业务版本迭代去变化，除非公司要求升级 Angular 才会动它们。

​ 这些库每次都会被打包，每次打包后 hash 可能都会变，不仅让打包时间变长，而且用户要从新从远程拉取，导致页面等待时间长用户体验差。

​ 可以把这些库集中到一个 js 文件中，而且不会每次打包都变更这个 js 文件，这样打包时只打包业务代码，缩小打包时间，用户除了第一次访问时要拉取 dll ，以后再访问会直接从缓存里拉取，减少页面加载时间，提升用户体验。

#### Angular 使用 webpack

Angular 默认的配置对我们来说是黑盒子，要拓展 webpack 配置，要安装`@angular-builders/custom-webpack`，然后在 `angular.json`里配置：

```ts
 ......
    "architect": {
        ......
        "build": {
          	// 配置 builder 方式
            "builder": "@angular-builders/custom-webpack:browser",
            "options": {
              	// 配置要拓展的 webpack config
                "customWebpackConfig": {
                    "path": "./webpack.extra.config.js"
                },
                  //打包出来的 DLL 文件，需要在 angular.json 里引用
                "scripts": [
                  {
                    "input": "./dll/vendor.dll.js",
                    "inject": true,
                    "bundleName": "vendor_library"
                  }
                ]
            }
        },
        "serve": {
          	// 配置 builder 方式
            "builder": "@angular-builders/custom-webpack:dev-server"
        }
    }
```
