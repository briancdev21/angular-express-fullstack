import { Component, OnInit, Input } from '@angular/core';

declare const $: any;
declare const Morris: any;

@Component({
  selector: 'app-morrisareachart',
  templateUrl: './morrisareachart.component.html',
  styleUrls: ['./morrisareachart.component.css']
})
export class MorrisAreaComponent implements OnInit {
  @Input() areaChartInfo;
  constructor() { }

  ngOnInit() {
      Morris.Area({
        element: 'm_area_chart2',
        data: this.areaChartInfo,
        xkey: 'period',
        ykeys: ['Actual', 'Estimate'],
        labels: ['Actual', 'Estimate'],
        pointSize: 4,
        fillOpacity: 0.4,
        pointStrokeColors: ['#4FE3C3', '#F5A622'],
        behaveLikeLine: true,
        gridLineColor: '#e0e0e0',
        lineWidth: 0,
        smooth: false,
        hideHover: 'auto',
        lineColors: ['#4FE3C3', '#F5A622'],
        resize: true,
        parseTime: false,
        preUnits: '$',
      });
    }

}
