import { Component, ChangeDetectorRef, Input, OnInit, HostListener, EventEmitter, Output, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import * as _ from 'lodash';


@Component({
  selector: 'app-crmdashboard',
  templateUrl: './crmdashboard.component.html',
  styleUrls: [
    './crmdashboard.component.css',
  ],
  providers: []
})


export class CrmDashboardComponent implements OnInit {

  public newLeadsLine = [
    {
      period: 'Jun',
      lead: 3,
    }, {
      period: 'JUL',
      lead: 4,
    }, {
      period: 'AUG',
      lead: 3,
    }, {
      period: 'SEP',
      lead: 5,
    }, {
      period: 'OCT',
      lead: 3,
    }, {
      period: 'NOV',
      lead: 6,
    }, {
      period: 'DEC',
      lead: 4,
    }];

  public morrisDonutColors = ['#ffd97f', '#fab2c0', '#80dad8', '#a1abb8', '#38849B', '#6EB1DD', '#FF7E7E', '#F79E5D', '#6F7B83'];

  public morrisDonutInfo = [
    {
      label: 'New Leads',
      value: 49,
    }, {
      label: 'Opportunity',
      value: 35
    }, {
      label: 'Won',
      value: 8
    }];

  public morrisSalesDonutColors = ['#ffd97f', '#fab2c0', '#80dad8', '#a1abb8', '#38849B', '#6EB1DD', '#FF7E7E', '#F79E5D', '#6F7B83'];

  public morrisSalesDonutInfo = [
    {
      label: 'New',
      value: 49,
    }, {
      label: 'Follow Up',
      value: 35
    }, {
      label: 'Seen',
      value: 8
    }, {
      label: 'Demo',
      value: 25
    }, {
      label: 'Negotiation',
      value: 35
    }, {
      label: 'Won',
      value: 15
    }, {
      label: 'Lost',
      value: 5
    }];

  public topCustomers = [
    {
      customerName: 'John Moss',
      customerRating: 93,
      totalValue: 25000
    },
    {
      customerName: 'Steve Rogers',
      customerRating: 95,
      totalValue: 22000
    },
    {
      customerName: 'Bruce Banner',
      customerRating: 85,
      totalValue: 21000
    },
    {
      customerName: 'Tony Stark',
      customerRating: 99,
      totalValue: 21500
    },
    {
      customerName: 'Tony Hawk',
      customerRating: 93,
      totalValue: 21000
    },
    {
      customerName: 'John Moss',
      customerRating: 93,
      totalValue: 20000
    }
  ];

  public salesConversion = [
    {
      member: 'Michael Yue',
      newLeads: 30,
      opportunity: 20,
      wonDeals: 5,
      conversionRate: 17
    },
    {
      member: 'Tyler labonte',
      newLeads: 100,
      opportunity: 30,
      wonDeals: 5,
      conversionRate: 5
    },
    {
      member: 'Sam Olson',
      newLeads: 400,
      opportunity: 150,
      wonDeals: 10,
      conversionRate: 4
    }
  ];

  public conversionRatio = {
    newLeads: 100,
    wonDeals: 5,
    lostDeals: 0
  };

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

  menuCollapsed = true;
  donutTimePeriod = 'month';
  conversionRate = undefined;
  conversionRatioTime = 'month';
  salesPipelineTime = 'month';
  salesConversionTime = 'month';
  wonVsLost = (this.conversionRatio.wonDeals - this.conversionRatio.lostDeals) * 100 / this.conversionRatio.newLeads;

  ngOnInit() {
    const arr = this.morrisDonutInfo.map( v => v.value);
    let total = 0;
    const wonLead = this.morrisDonutInfo.filter( e => e.label === 'Won');
    arr.forEach(element => {
      total = total + element;
    });
    if (total) {
      this.conversionRate = Math.floor(wonLead[0].value * 100 / total);
    }
    this.morrisDonutInfo.forEach(ele => {
      ele.value = Math.floor(ele.value * 100 / total);
    });
  }
}
