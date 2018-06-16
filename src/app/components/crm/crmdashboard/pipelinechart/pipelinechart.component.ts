import { Component, OnInit, Input } from '@angular/core';
declare const $: any;
declare const Morris: any;
@Component({
  selector: 'app-pipelinechart',
  templateUrl: './pipelinechart.component.html',
  styleUrls: ['./pipelinechart.component.css']
})
export class PipeLineChartComponent implements OnInit {

  @Input() morrisSalesDonutInfo;
  @Input() morrisSalesDonutColors;
  constructor() { }
  ngOnInit() {
// Morris donut chart
    Morris.Donut({
      element: 'm_donut_chart_pipeline',
      data: this.morrisSalesDonutInfo,
      resize: true,
      colors: this.morrisSalesDonutColors
    });
  }
}
