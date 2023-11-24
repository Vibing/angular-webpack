import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'layout-container',
  template: `
    <div style="display: flex;">
      <layout-menu></layout-menu>
      <router-outlet></router-outlet>
    </div>
  `,
})
export class LayoutContainerComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
