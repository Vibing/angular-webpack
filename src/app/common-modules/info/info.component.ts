import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { produce } from 'immer';

@Component({
  selector: 'common-info',
  templateUrl: './info.component.html',
})
export class InfoComponent implements OnInit {
  @Input() data: any;
  @Output() callbackEmit: EventEmitter<any> = new EventEmitter();

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

  constructor() {}

  ngOnInit() {}

  transformDataFn(value: any) {
    console.log('transform-->', value.info.name);
    this.transformData = value;
  }

  callback() {
    this.callbackEmit.emit('emit success!');
    for (let index = 0; index < 1000; index++) {
      this.originData = produce(this.originData, (draft: any) => {
        draft.info.name = { age: 'Tom' + index };
      });
    }
  }
}
