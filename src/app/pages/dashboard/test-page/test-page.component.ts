import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';

@Component({
  selector: 'test-page',
  templateUrl: './test-page.component.html',
  styleUrls: ['./test-page.less'],
})
export class TestPageComponent implements OnInit, AfterViewInit {
  @ViewChildren('anchorContainer') anchorContainers!: QueryList<ElementRef>;
  @ViewChild('content') content!: ElementRef;

  offset = 50;
  menus = ['menu1', 'menu2', 'menu3', 'menu4'];
  numbers: any[] = ['', '', '', ''];
  sections: any;
  activityIndex: number = 0;

  constructor() {}

  ngOnInit() {}

  ngAfterViewInit() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionId = entry.target;
            console.log(sectionId);
          }
        });
      },
      { threshold: 0.5 }
    );

    this.sections = this.anchorContainers.toArray();
    // this.sections.forEach((section) => {
    //   observer.observe(section.nativeElement);
    // });
  }

  onScroll(e: any) {
    window.requestAnimationFrame(() => {
      this.sections.forEach((section: any, i: number) => {
        const element = section.nativeElement;
        const client = element.getBoundingClientRect();
        const containerClient =
          this.content.nativeElement.getBoundingClientRect();

        this.numbers[i] = client.top - containerClient.top;

        if (client.top - containerClient.top <= this.offset) {
          this.activityIndex = i;
        }
      });
    });
  }

  scrollToSection(i: number) {
    const section = this.sections[i].nativeElement;
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
