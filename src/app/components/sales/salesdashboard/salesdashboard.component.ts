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
  donutTimePeriod = 'month';
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

  public invoicingInfo = {
    openEstimate: 6,
    openInvoice: 5,
    proposalCount: 16
  };

  public proposalForecasting = {
    newProposal: 6,
    proposalInPipe: 10,
    approvalTime: 61,
    closed: 3
  };

  salesInfo = [
    {
      member: 'Michael Yue',
      proposalsValue: 63622.32,
      approvedValue: 23231,
      totalMargin: 43
    }, {
      member: 'Michael Yue',
      proposalsValue: 63622.32,
      approvedValue: 23231,
      totalMargin: 43
    },
    {
      member: 'Michael Yue',
      proposalsValue: 63622.32,
      approvedValue: 23231,
      totalMargin: 43
    }
  ];

  activitiesInfo = [
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

  public morrisDonutColors = ['#ffd97f', '#fab2c0', '#80dad8', '#a1abb8', '#38849B', '#6EB1DD', '#FF7E7E', '#F79E5D', '#6F7B83'];

  public morrisDonutInfo = [
    {
      label: 'New',
      value: 49,
    }, {
      label: 'Follow Up',
      value: 35
    }, {
      label: 'Seen',
      value: 29
    }, {
      label: 'Demo',
      value: 12
    }, {
      label: 'Negotiation',
      value: 8
    }, {
      label: 'Won',
      value: 58
    }, {
      label: 'Lost',
      value: 2
    }
  ];

  ngOnInit() {
    const arr = this.morrisDonutInfo.map( v => v.value);
    let total = 0;
    arr.forEach(element => {
      total = total + element;
    });
    this.morrisDonutInfo.forEach(ele => {
      ele.value = Math.floor(ele.value * 100 / total);
    });
  }
}
