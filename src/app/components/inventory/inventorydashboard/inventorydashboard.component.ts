import { Component, ChangeDetectorRef, Input, OnInit, HostListener, EventEmitter, Output, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import * as _ from 'lodash';
import * as moment from 'moment';
import { SharedService } from '../../../services/shared.service';

@Component({
  selector: 'app-inventorydashboard',
  templateUrl: './inventorydashboard.component.html',
  styleUrls: [
    './inventorydashboard.component.css',
  ],
  providers: []
})


export class InventoryDashboardComponent implements OnInit {
  public inventoryValues = {
    lessThirty: 12,
    thirtyToSixty: 24,
    overSixty: 16,
    turnover: 18
  };

  public inventoryLevel = {
    noStock: 15530,
    placeOrder: 265,
    totalPhysical: 253230,
    belowLevel: 650
  };

  public pendingOrders = [
    {
      orderNumber: 'PO 88031234',
      dueDate: '2018-02-12'
    }, {
      orderNumber: 'PO 88031235',
      dueDate: '2018-03-12'
    }, {
      orderNumber: 'PO 88031236',
      dueDate: '2018-03-28'
    }, {
      orderNumber: 'PO 88031237',
      dueDate: '2018-04-12'
    }, {
      orderNumber: 'PO 88031238',
      dueDate: '2018-05-30'
    },
  ];

  public areaChartInfo = [
    {
        period: 'JAN',
        Actual: 35000,
        Estimate: 30000,

    }, {
        period: 'FEB',
        Actual: 15000,
        Estimate: 25000,

    }, {
        period: 'MAR',
        Actual: 31000,
        Estimate: 20000,

    }, {
        period: 'APR',
        Actual: 25000,
        Estimate: 25000,

    }, {
        period: 'MAY',
        Actual: 18000,
        Estimate: 20000,

    }, {
        period: 'JUN',
        Actual: 17000,
        Estimate: 15000,
    }, {
        period: 'JUL',
        Actual: 20000,
        Estimate: 14000,
    }, {
        period: 'AUG',
        Actual: 32000,
        Estimate: 30000,
    }, {
        period: 'SEP',
        Actual: 23000,
        Estimate: 20000,
    }, {
        period: 'OCT',
        Actual: 32000,
        Estimate: 19000,
    }, {
        period: 'NOV',
        Actual: 20000,
        Estimate: 34000,
    }, {
        period: 'DEC',
        Actual: 32000,
        Estimate: 30000,
    }];

  public morrisDonutInfo = [
    {
      label: 'Supplier 1',
      value: 49,
    }, {
      label: 'Supplier 2',
      value: 35
    }, {
      label: 'Supplier 3',
      value: 8
    }, {
      label: 'Supplier 4',
      value: 12
    }, {
      label: 'Supplier 5',
      value: 8
    }, {
      label: 'Others',
      value: 99
    }];

  public morrisDonutColors = ['#ffd97f', '#fab2c0', '#80dad8', '#a1abb8', '#38849B', '#6EB1DD', '#FF7E7E', '#F79E5D', '#6F7B83'];

  public morrisLineChartInfo: any;

  public activitiesInfo = [
    {
      imgUrl: 'assets/users/user1.png',
      userName: 'Michael Yue',
      description: 'posted a new ticket',
      createdTimeAt: '5:30 pm',
      createdDateAt: '27.05.2018',
      passedDays: 'Yesterday'
    },
    {
      imgUrl: 'assets/users/user1.png',
      userName: 'Michael Yue',
      description: 'posted a new acticle in knowledgebase',
      createdTimeAt: '5:28 pm',
      createdDateAt: '27.05.2018',
      passedDays: 'Yesterday'
    },
    {
      imgUrl: 'assets/users/user1.png',
      userName: 'Michael Yue',
      description: 'posted a new ticket',
      createdTimeAt: '5:30 pm',
      createdDateAt: '27.05.2018',
      passedDays: 'Yesterday'
    },
    {
      imgUrl: 'assets/users/user1.png',
      userName: 'Michael Yue',
      description: 'posted a new ticket',
      createdTimeAt: '5:30 pm',
      createdDateAt: '27.05.2018',
      passedDays: 'Yesterday'
    },
    {
      imgUrl: 'assets/users/user1.png',
      userName: 'Michael Yue',
      description: 'posted a new ticket',
      createdTimeAt: '5:30 pm',
      createdDateAt: '27.05.2018',
      passedDays: 'Yesterday'
    },
    {
      imgUrl: 'assets/users/user1.png',
      userName: 'Michael Yue',
      description: 'posted a new acticle in knowledgebase',
      createdTimeAt: '5:28 pm',
      createdDateAt: '27.05.2018',
      passedDays: 'Yesterday'
    },
    {
      imgUrl: 'assets/users/user1.png',
      userName: 'Michael Yue',
      description: 'posted a new ticket',
      createdTimeAt: '5:30 pm',
      createdDateAt: '27.05.2018',
      passedDays: 'Yesterday'
    },
    {
      imgUrl: 'assets/users/user1.png',
      userName: 'Michael Yue',
      description: 'posted a new ticket',
      createdTimeAt: '5:30 pm',
      createdDateAt: '27.05.2018',
      passedDays: 'Yesterday'
    }
  ];

  menuCollapsed = true;
  donutTimePeriod = 'month';

  constructor( private sharedService: SharedService) {
    this.sharedService.getInventoryStatistics(5, 0, 'MONTHLY', 'purchaseOrderValuesOverTime').subscribe(res => {
      this.morrisLineChartInfo = res.purchaseOrderValuesOverTime;
      this.morrisLineChartInfo.forEach(ele => {
        ele.period = ele.frameUnit.toUpperCase().slice(0, 3);
        ele.revenue = ele.frameValue;
      });
    });
  }

  ngOnInit() {
    // this.pendingOrders.map( p => p.dueDate = moment(p.dueDate).format('MMMM DD, YYYY'));
    // // change to percentage
    // const arr = this.morrisDonutInfo.map( v => v.value);
    // let total = 0;
    // arr.forEach(element => {
    //   total = total + element;
    // });
    // this.morrisDonutInfo.forEach(ele => {
    //   ele.value = Math.floor(ele.value * 100 / total);
    // });
  }
}
