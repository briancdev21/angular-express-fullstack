import { Component, OnInit, Input } from '@angular/core';

declare const $: any;
declare const Morris: any;

@Component({
  selector: 'app-newleadline',
  templateUrl: './newleadline.component.html',
  styleUrls: ['./newleadline.component.css']
})
export class NewLeadLineComponent implements OnInit {
  @Input() morrisLineChartInfo;

  constructor() { }

  ngOnInit() {

    // Dashboard 1 Morris-chart
    Morris.Area({
      element: 'm_area_chart_active',
      data: this.morrisLineChartInfo,
      xkey: 'period',
      ykeys: ['lead'],
      labels: ['Lead'],
      pointSize: 4,
      fillOpacity: 0,
      pointStrokeColors: ['#70EACA'],
      behaveLikeLine: true,
      gridLineColor: '#e0e0e0',
      lineWidth: 2,
      hideHover: 'auto',
      lineColors: ['#70EACA'],
      resize: true,
      parseTime: false,
      preUnits: ''
    });
  }
}
