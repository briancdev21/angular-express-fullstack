import { Component, ChangeDetectorRef, Input, OnInit, HostListener, EventEmitter, Output, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import * as _ from 'lodash';


@Component({
  selector: 'app-salesdashboard',
  templateUrl: './salesdashboard.component.html',
  styleUrls: [
    './salesdashboard.component.css',
  ],
  providers: []
})


export class SalesDashboardComponent implements OnInit {

  revenueTime = 'month';
  menuCollapsed = true;

  public revenueAreaChartInfo = [
    {
        period: 'JAN',
        revenue: 30000,
    }, {
        period: 'FEB',
        revenue: 25000,
    }, {
        period: 'MAR',
        revenue: 20000,
    }, {
        period: 'APR',
        revenue: 25000,
    }, {
        period: 'MAY',
        revenue: 20000,
    }, {
        period: 'JUN',
        revenue: 15000,
    }, {
        period: 'JUL',
        revenue: 14000,
    }, {
        period: 'AUG',
        revenue: 30000,
    }, {
        period: 'SEP',
        revenue: 20000,
    }, {
        period: 'OCT',
        revenue: 19000,
    }, {
        period: 'NOV',
        revenue: 34000,
    }, {
        period: 'DEC',
        revenue: 30000,
    }];
  ngOnInit() {

  }
}
