该库中主要对 Angular 项目做了一些优化：

- 页面级代码分割
- 组件级代码分割
- 使用 webpack DLL
- 使用 service 配合 rxjs 做状态管理及状态共享
- 按需加载模块和组件

### 页面级代码分割

开发中经常一个 `module` 有很多组件，目前 Angular 的路由使用代码分割只支持以 module 为单位，这会有一个问题：一个 `module` 可能包含多个页面，当用户只访问`页面A`时，打包出来的 module 代码却包含没有被访问的其他页面。

理想情况是让用户在访问每个路由时只 lazyLoad 当前页面的代码，而非整个 module 的代码，避免造成用户等待时间加长的体验问题、流量问题等。

好消息是这个方案是可以实现的：Angular 内部支持动态组件的功能，可以通过该功能配合 `import()`方法达到组件级别的代码分割。

但是！！！！

虽然可以将组件进行懒加载，**但组件被懒加载时，其代码中并不包含所使用的外部引用的组件库代码，被引用的组件库代码全都在当前模块中**，这样会造成当前模块越来越大，最好把这些 UI 组件也分到对应的页面里，**否则打包出来的`main.js`越来越大**。

**最好的解决方案就是：将每个路由对应的页面进行模块化**。也就是一个页面就是一个`module`，每个页面所使用的 UI 库组件可以在当前 `module` 里进行 `import`，再配合路由的 `loadChild` 和使用 `import()` 做代码分割，就能达到页面级的 `lazyLoad`

![image-20220721143344437](https://tva1.sinaimg.cn/large/e6c9d24egy1h4ejd7aux7j20is07gq3d.jpg)

上图中在 `dashboard`作为一个大模块，其中包含两个页面：`monitor`、`welcome`

![image-20220721143604663](https://tva1.sinaimg.cn/large/e6c9d24egy1h4ejffny21j20hg0ewwfe.jpg)

展开后 monitor 和 welcome 两个页面都模块化，这样就可以达到页面级代码分割。（具体的看 github 里的代码吧）

### 组件级代码分割

核心代码：

```typescript
import { ChangeDetectionStrategy, Component, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef } from "@angular/core";

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
    const { Comp1Component } = await import(/* webpackChunkName: "comp1" */ "./comp1/comp1.component");

    // 将组件载入到ng-template中
    const loadedComponent = this.dyncomp.createComponent(this.cfr.resolveComponentFactory(Comp1Component));
  }
}
```

### 使用 webpack + DLL

前端优化点之一就是使用 webpack 的 DLL 来把 Angular 相关的库比如 rxjs、router 等缓存起来，因为这些库几乎不会跟着业务版本迭代去变化，除非公司要求升级 Angular 才会动它们。

这些库每次都会被打包，每次打包后 hash 可能都会变，不仅让打包时间变长，而且用户要从新从远程拉取，导致页面等待时间长用户体验差。

可以把这些库集中到一个 js 文件中，而且不会每次打包都变更这个 js 文件，这样打包时只打包业务代码，缩小打包时间，用户除了第一次访问时要拉取 dll ，以后再访问会直接从缓存里拉取，减少页面加载时间，提升用户体验。

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

### 状态管理及共享

使用 `service` 注入，配合 rxjs 做状态管理和共享

先封装一个 `Store` 基类

```ts
import { BehaviorSubject, Observable } from "rxjs";
import { distinctUntilChanged, map } from "rxjs/operators";

export class StateService<T> {
  private state$: BehaviorSubject<T>;

  get state(): T {
    return this.state$.getValue();
  }

  constructor(initialState: T) {
    this.state$ = new BehaviorSubject<T>(initialState);
  }

  select<K>(mapFn: (state: T) => K): Observable<K> {
    return this.state$.asObservable().pipe(
      map((state: T) => mapFn(state)),
      distinctUntilChanged()
    );
  }

  setState(newState: Partial<T>) {
    this.state$.next({ ...this.state, ...newState });
  }
}
```

在继承该基类

```ts
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { StateService } from "@store";

const initialState = {
  title: "here",
  message: "hello",
  count: 0,
};

@Injectable()
export class PageStoreService extends StateService<any> {
  store$: Observable<any> = this.select((state) => {
    return state;
  });

  constructor() {
    super(initialState);
    this.store$.subscribe((state) => {
      console.log("listening-->", state);
    });
  }

  setStore(newState: any) {
    this.setState(newState);
  }
}
```

在需要的地方进行依赖注入，比如`PageStoreService`是页面级的，所以在页面对应的`module`里引入

```ts
@NgModule({
  declarations: [WelcomeComponent],
  imports: [RouterModule.forChild(routes), CommonModule],
  providers: [PageStoreService],
})
export class WelcomeModule {}
```
