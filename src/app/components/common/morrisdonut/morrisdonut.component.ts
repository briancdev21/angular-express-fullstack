import { Component, OnInit, Input } from '@angular/core';

declare const $: any;
declare const Morris: any;

@Component({
  selector: 'app-morrisdonut',
  templateUrl: './morrisdonut.component.html',
  styleUrls: ['./morrisdonut.component.css']
})
export class MorrisDonutComponent implements OnInit {

  @Input() set morrisDonutInfo(val) {
    this._morrisDonutInfo = val;
    console.log('donut ***: ', this._morrisDonutInfo);
  }
  @Input() morrisDonutColors;
  _morrisDonutInfo: any;

  constructor() { }
  ngOnInit() {
// Morris donut chart
    Morris.Donut({
      element: 'm_donut_chart',
      data: this._morrisDonutInfo,
      resize: true,
      colors: this.morrisDonutColors,
      formatter: function (x) { return x + '%'; }
    });
  }
}
