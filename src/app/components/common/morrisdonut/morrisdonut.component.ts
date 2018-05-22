import { Component, OnInit, Input } from '@angular/core';

declare const $: any;
declare const Morris: any;

@Component({
  selector: 'app-morrisdonut',
  templateUrl: './morrisdonut.component.html',
  styleUrls: ['./morrisdonut.component.css']
})
export class MorrisDonutComponent implements OnInit {

@Input() morrisDonutInfo;
  constructor() { }
  ngOnInit() {
// Morris donut chart
      Morris.Donut({
          element: 'm_donut_chart',
          data: this.morrisDonutInfo,
          resize: true,
          colors: ['#ffd97f', '#fab2c0', '#80dad8', '#a1abb8']
      });
  }
}
