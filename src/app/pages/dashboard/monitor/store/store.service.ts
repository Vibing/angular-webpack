import { Injectable } from '@angular/core';
import { StateService } from '@store';

const initialState = {
  count: 0,
};

@Injectable()
export class PageStoreService extends StateService<any> {
  constructor() {
    super(initialState);
  }
}
