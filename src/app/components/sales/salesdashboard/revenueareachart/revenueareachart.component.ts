import { Component, OnInit, Input } from '@angular/core';

declare const $: any;
declare const Morris: any;

@Component({
  selector: 'app-revenueareachart',
  templateUrl: './revenueareachart.component.html',
  styleUrls: ['./revenueareachart.component.css']
})
export class RevenueAreaChartComponent implements OnInit {
  @Input() revenueAreaChartInfo;
  constructor() { }

  ngOnInit() {
      Morris.Area({
          element: 'm_area_chart3',
          data: this.revenueAreaChartInfo,
          xkey: 'period',
          ykeys: ['revenue'],
          labels: ['Revenue'],
          pointSize: 4,
          fillOpacity: 0.4,
          pointStrokeColors: ['#4FE3C3'],
          behaveLikeLine: true,
          gridLineColor: '#e0e0e0',
          lineWidth: 0,
          smooth: false,
          hideHover: 'auto',
          lineColors: ['#4FE3C3'],
          resize: true,
					parseTime: false,
					preUnits: '$',
      });
    }

}
