import {
  Component,
  ComponentFactoryResolver,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { PageStoreService } from './store/store.service';

export type TComponent = () => Promise<any>;

@Component({
  selector: 'page-monitor',
  template: `<monitor-list></monitor-list>`,
})
export class MonitorComponent {
  constructor(public store: PageStoreService) {}
}
