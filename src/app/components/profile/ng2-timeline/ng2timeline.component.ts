import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-ng2timeline',
  templateUrl: './ng2timeline.component.html',
  styleUrls: [
    './ng2timeline.component.css'
  ]
})

export class Ng2TimelineComponent {

  @Input() timelineData;
  @Input() oneSide;
  dataset: any[];

  constructor() {
  }

  doAction(myFunc: String) {
    switch (myFunc) {
      case 'downloadDoc': {
        this.downloadDoc();
      } break;
      case 'getMoreInfo': {
        this.getMoreInfo();
      } break;
      case 'readMoreCoffee': {
        this.readMoreCoffee();
      } break;
    default:
    }
  }

  // Custom Actions
  downloadDoc() {
    window.alert('download Doc');
  }

  getMoreInfo() {
    window.alert('getMoreInfo');
  }

  readMoreCoffee() {
    window.alert('readMoreCoffee');
  }
}

