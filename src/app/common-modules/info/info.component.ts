import {
  Compiler,
  Component,
  ComponentRef,
  EventEmitter,
  Injector,
  Input,
  NgModuleFactory,
  NgModuleRef,
  OnInit,
  Output,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { produce } from 'immer';
import { NzProgressComponent } from 'ng-zorro-antd/progress';

@Component({
  selector: 'common-info',
  templateUrl: './info.component.html',
})
export class InfoComponent implements OnInit {
  @Input() data: any;
  @Output() callbackEmit: EventEmitter<any> = new EventEmitter();
  @ViewChild('viewContainer', { read: ViewContainerRef })
  containerRef!: ViewContainerRef;

  _originData: any = {
    info: {
      name: 'Jack',
    },
  };

  transformData: any = {};

  set originData(value: any) {
    this._originData = value;
    this.transformDataFn(value);
  }

  get originData() {
    return this._originData;
  }

  date = null;

  constructor(private complier: Compiler, private injector: Injector) {}

  ngOnInit() {}

  transformDataFn(value: any) {
    this.transformData = value;
  }

  callback() {
    this.callbackEmit.emit('emit success!');
    this.originData = produce(this.originData, (draft: any) => {
      draft.info.name = { age: 'Tom' };
    });

    this.loadThirdModule();
  }

  /**
   * 按需加载第三方模块和组件
   */
  loadThirdModule() {
    import('ng-zorro-antd/progress').then(async (module) => {
      const moduleFactory: NgModuleFactory<any> =
        await this.complier.compileModuleAsync(module.NzProgressModule);

      const moduleRef: NgModuleRef<any> = moduleFactory.create(this.injector);
      // 解析组件
      const componentFactory: any =
        moduleRef.componentFactoryResolver.resolveComponentFactory(
          module.NzProgressComponent
        );
      // 清除container
      this.containerRef.clear();
      // 创建组件
      const componentRef: ComponentRef<NzProgressComponent> =
        this.containerRef.createComponent(componentFactory);

      componentRef.instance.nzPercent = 75;
    });
  }
}
