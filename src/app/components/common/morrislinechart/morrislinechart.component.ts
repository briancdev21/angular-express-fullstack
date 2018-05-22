import { Component, OnInit } from '@angular/core';

declare const $: any;
declare const Morris: any;

@Component({
  selector: 'app-morrislinechart',
  templateUrl: './morrislinechart.component.html',
  styleUrls: ['./morrislinechart.component.css']
})
export class MorrisLineComponent implements OnInit {

  constructor() { }

  ngOnInit() {

		// Dashboard 1 Morris-chart
		Morris.Area({
			element: 'm_area_chart',
			data: [{
					period: '2011',
					iphone: 45,
					ipad: 75,
					itouch: 18
			}, {
					period: '2012',
					iphone: 130,
					ipad: 110,
					itouch: 82
			}, {
					period: '2013',
					iphone: 80,
					ipad: 60,
					itouch: 85
			}, {
					period: '2014',
					iphone: 78,
					ipad: 205,
					itouch: 135
			}, {
					period: '2015',
					iphone: 180,
					ipad: 124,
					itouch: 140
			}, {
					period: '2016',
					iphone: 105,
					ipad: 100,
					itouch: 85
			},
					{
							period: '2017',
							iphone: 210,
							ipad: 180,
							itouch: 120
					}
			],
			xkey: 'period',
			ykeys: ['iphone', 'ipad', 'itouch'],
			labels: ['iPhone', 'iPad', 'iPod Touch'],
			pointSize: 3,
			fillOpacity: 0,
			pointStrokeColors: ['#222222', '#cccccc', '#379c94'],
			behaveLikeLine: true,
			gridLineColor: '#e0e0e0',
			lineWidth: 2,
			hideHover: 'auto',
			lineColors: ['#222222', '#cccccc', '#379c94'],
			resize: true

		});
	}
}
