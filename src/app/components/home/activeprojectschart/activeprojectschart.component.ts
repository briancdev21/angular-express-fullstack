import { Component, OnInit, Input } from '@angular/core';

declare const $: any;
declare const Morris: any;

@Component({
  selector: 'app-activeprojectschart',
  templateUrl: './activeprojectschart.component.html',
  styleUrls: ['./activeprojectschart.component.css']
})
export class ActiveProjectsChartComponent implements OnInit {
	@Input() morrisLineChartInfo;

  constructor() { }

  ngOnInit() {

		// Dashboard 1 Morris-chart
		Morris.Area({
			element: 'm_area_chart_active',
			data: this.morrisLineChartInfo,
			xkey: 'period',
			ykeys: ['project'],
			labels: ['Project'],
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
