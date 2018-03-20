import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-horizontalbar',
  templateUrl: './horizontalbar.component.html',
  styleUrls: [
    './horizontalbar.component.css',
  ]
})

export class HorizontalBarComponent implements OnInit {

  @Input() barInfo;

  ngOnInit() {
    if (this.barInfo.completeness < 60) {
      this.barInfo.filledColor = '#FF7E7E';
      this.barInfo.backgroundColor = '#FFF2F2';
    } else if (this.barInfo.completeness < 80) {
      this.barInfo.filledColor = '#FFAC58';
      this.barInfo.backgroundColor = '#FFF6EE';
    } else {
      this.barInfo.filledColor = '#C5D92D';
      this.barInfo.backgroundColor = '#F9FBEA';
    }
  }

}
