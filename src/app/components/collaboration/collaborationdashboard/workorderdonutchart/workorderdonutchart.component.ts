import { Component, OnInit, Input } from '@angular/core';
declare const $: any;
declare const Morris: any;
@Component({
  selector: 'app-workorderdonutchart',
  templateUrl: './workorderdonutchart.component.html',
  styleUrls: ['./workorderdonutchart.component.css']
})
export class WorkOrderDonutChartComponent implements OnInit {

  @Input() workOrderDonutInfo;
  @Input() workOrderDonutColors;
  constructor() { }
  ngOnInit() {
// Morris donut chart
    Morris.Donut({
      element: 'm_donut_chart_work_order',
      data: this.workOrderDonutInfo,
      resize: true,
      colors: this.workOrderDonutColors
    });
  }
}
