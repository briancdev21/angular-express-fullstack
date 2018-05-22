import { Component, OnInit } from '@angular/core';

declare const $: any;
declare const Morris: any;

@Component({
  selector: 'app-morrisareachart',
  templateUrl: './morrisareachart.component.html',
  styleUrls: ['./morrisareachart.component.css']
})
export class MorrisAreaComponent implements OnInit {

  constructor() { }

  ngOnInit() {
      Morris.Area({
          element: 'm_area_chart2',
          data: [{
              period: '2012',
              SiteA: 10,
              SiteB: 0,

          }, {
              period: '2013',
              SiteA: 126,
              SiteB: 78,

          }, {
              period: '2014',
              SiteA: 78,
              SiteB: 58,

          }, {
              period: '2015',
              SiteA: 89,
              SiteB: 185,

          }, {
              period: '2016',
              SiteA: 175,
              SiteB: 124,

          }, {
              period: '2017',
              SiteA: 126,
              SiteB: 102  ,

          }
          ],
          xkey: 'period',
          ykeys: ['SiteA', 'SiteB'],
          labels: ['Site A', 'Site B'],
          pointSize: 0,
          fillOpacity: 0.4,
          pointStrokeColors: ['#9e9e9e', '#457fca'],
          behaveLikeLine: true,
          gridLineColor: '#e0e0e0',
          lineWidth: 0,
          smooth: false,
          hideHover: 'auto',
          lineColors: ['#9e9e9e', '#457fca'],
          resize: true

      });
    }

}
