import { Component, OnInit, Input } from '@angular/core';

declare const $: any;
declare const Morris: any;

@Component({
  selector: 'app-morrisbarchart',
  templateUrl: './morrisbarchart.component.html',
  styleUrls: ['./morrisbarchart.component.css']
})
export class MorrisBarChartComponent implements OnInit {
  @Input() morrisBarChartInfo;

  constructor() { }

  ngOnInit() {

// Morris bar chart
    Morris.Bar({
      element: 'm_bar_chart',
      data: this.morrisBarChartInfo,
      xkey: 'y',
      ykeys: ['revenue'],
      labels: ['Revenue'],
      barColors: ['#a9f2df'],
      hideHover: 'auto',
      gridLineColor: '#eef0f2',
      resize: true
    });
  }
}
