import { Component, OnInit, Input } from '@angular/core';

declare const $: any;
declare const Morris: any;

@Component({
  selector: 'app-morrismultilinechart',
  templateUrl: './morrismultilinechart.component.html',
  styleUrls: ['./morrismultilinechart.component.css']
})
export class MorrisMultiLineComponent implements OnInit {
  @Input() morrisMultiLineChartInfo;

  constructor() { }

  ngOnInit() {

    // Dashboard 1 Morris-chart
    Morris.Area({
      element: 'm_multi_area_chart',
      data: this.morrisMultiLineChartInfo,
      xkey: 'period',
      ykeys: ['totalHour', 'projectHour', 'billableHour'],
      labels: ['Total Hours', 'Project Hours', 'Billable Hours'],
      pointSize: 4,
      fillOpacity: 0,
      pointStrokeColors: ['#4A90E2', '#7ED421', '#E66A4D'],
      behaveLikeLine: true,
      gridLineColor: '#e0e0e0',
      lineWidth: 2,
      hideHover: 'auto',
      lineColors: ['#4A90E2', '#7ED421', '#E66A4D'],
      resize: true,
      parseTime: false,
      preUnits: ''
    });
  }
}
