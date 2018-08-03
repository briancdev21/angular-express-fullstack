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

  @Input() set barInfo (val) {
    this._barInfo = val;
    this.init();
  }

  _barInfo: any;

  ngOnInit() {

  }

  init() {
    if (this._barInfo.completeness < 60) {
      this._barInfo.filledColor = '#FF7E7E';
      this._barInfo.backgroundColor = '#FFF2F2';
    } else if (this._barInfo.completeness < 80) {
      this._barInfo.filledColor = '#FFAC58';
      this._barInfo.backgroundColor = '#FFF6EE';
    } else {
      this._barInfo.filledColor = '#C5D92D';
      this._barInfo.backgroundColor = '#F9FBEA';
    }
  }

}
