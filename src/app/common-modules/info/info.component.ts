import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'common-info',
  templateUrl: './info.component.html',
})
export class InfoComponent implements OnInit {
  @Input() data: any;
  @Output() callbackEmit: EventEmitter<any> = new EventEmitter();

  date = null;

  constructor() {}

  ngOnInit() {}

  callback() {
    this.callbackEmit.emit('emit success!');
  }
}
