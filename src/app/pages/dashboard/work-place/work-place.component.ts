import {
  Compiler,
  Component,
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
    const { InfoModule } = await import(
      '../../../common-modules/info/info.module'
    );

    const moduleFactory: NgModuleFactory<any> =
      await this.complier.compileModuleAsync(InfoModule);
    const moduleRef: NgModuleRef<any> = moduleFactory.create(this.injector);
    const componentFactory =
      moduleRef.componentFactoryResolver.resolveComponentFactory(InfoComponent);
    const instans = this.containerRef.createComponent(componentFactory);
  }
}
