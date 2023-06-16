import {
  Compiler,
  Component,
  ComponentRef,
  Injector,
  NgModuleFactory,
  NgModuleRef,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { InfoComponent } from 'src/app/common-modules/info/info.component';

@Component({
  selector: 'work-place',
  templateUrl: './work-place.component.html',
})
export class WorkPlaceComponent implements OnInit {
  @ViewChild('viewContainer', { read: ViewContainerRef })
  containerRef!: ViewContainerRef;

  constructor(private complier: Compiler, private injector: Injector) {}

  ngOnInit() {}

  async lazyLoadModuleAndComponent() {
    const module = await import('../../../common-modules/info/info.module');

    const moduleFactory: NgModuleFactory<any> =
      await this.complier.compileModuleAsync(module.InfoModule);

    const moduleRef: NgModuleRef<any> = moduleFactory.create(this.injector);

    // 解析组件
    const componentFactory: any =
      moduleRef.componentFactoryResolver.resolveComponentFactory(
        module.InfoComponent
      );
    // 清除container
    this.containerRef.clear();
    // 创建组件
    const componentRef: ComponentRef<InfoComponent> =
      this.containerRef.createComponent(componentFactory);
    // 给组件传递参数
    componentRef.instance.data = { name: 'Jack', age: 32 };
    // 子组件emit到父组件
    componentRef.instance.callbackEmit.subscribe((res) => {
      console.log(res);
    });
  }
}
