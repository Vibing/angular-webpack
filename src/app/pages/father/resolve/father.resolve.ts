import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { GlobalService } from '../service/global.service';

@Injectable()
export class FatherResolver implements Resolve<any> {
  constructor(private globalService: GlobalService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<any> | Promise<any> | any {
    this.getMenuData().subscribe((data) => {
      this.globalService.menuData$.next(data);
    });
    return;
  }

  getMenuData() {
    return new Observable((observer) => {
      setTimeout(() => {
        observer.next(['菜单1', '菜单2', '菜单3', '菜单4', '菜单5', '菜单6']);
      }, 2000);
    });
  }
}
