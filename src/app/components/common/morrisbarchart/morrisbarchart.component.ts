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
			data: [{
					y: '2011',
					a: 80,
					b: 56,
					c: 89
			}, {
					y: '2012',
					a: 75,
					b: 65,
					c: 38
			}, {
					y: '2013',
					a: 59,
					b: 30,
					c: 37
			}, {
					y: '2014',
					a: 75,
					b: 65,
					c: 40
			}, {
					y: '2015',
					a: 55,
					b: 40,
					c: 45
			}, {
					y: '2016',
					a: 75,
					b: 65,
					c: 40
			}, {
					y: '2017',
					a: 87,
					b: 88,
					c: 36
			}],
			xkey: 'y',
			ykeys: ['a', 'b', 'c'],
			labels: ['A', 'B', 'C'],
			barColors: ['#757575', '#26c6da', '#ffcc80'],
			hideHover: 'auto',
			gridLineColor: '#eef0f2',
			resize: true
		});
	}
}
