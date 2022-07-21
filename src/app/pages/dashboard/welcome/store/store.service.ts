import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StateService } from '@store';

const initialState = {
  title: 'here',
  message: 'hello',
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
      console.log('listening-->', state);
    });
  }

  setStore(newState: any) {
    this.setState(newState);
  }
}
