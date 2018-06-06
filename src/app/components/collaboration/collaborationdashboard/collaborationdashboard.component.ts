import { Component, ChangeDetectorRef, Input, OnInit, HostListener, EventEmitter, Output, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import * as _ from 'lodash';
import * as moment from 'moment';

@Component({
  selector: 'app-collaborationdashboard',
  templateUrl: './collaborationdashboard.component.html',
  styleUrls: [
    './collaborationdashboard.component.css',
  ],
  providers: []
})


export class CollaborationDashboardComponent implements OnInit {
  public inventoryValues = {
    lessThirty: 12,
    thirtyToSixty: 24,
    overSixty: 16,
    turnover: 18
  };

  public orderTasks = {
    totalTasks: 356,
    taskCompleted: 348,
    averageTasks: 15,
    incompleteTasks: 8
  };

  public pendingOrders = [
    {
      orderNumber: 'WO 88031234',
      timeLapsed: '5'
    }, {
      orderNumber: 'PO 88031235',
      timeLapsed: '3'
    }, {
      orderNumber: 'PO 88031236',
      timeLapsed: '3'
    }, {
      orderNumber: 'PO 88031237',
      timeLapsed: '2'
    }, {
      orderNumber: 'PO 88031238',
      timeLapsed: '1'
    },
  ];

  public morrisMultiLineChartInfo = [
    {
        period: 'JAN',
        totalHour: 10,
        projectHour: 2,
        billableHour: 8
    }, {
        period: 'FEB',
        totalHour: 20,
        projectHour: 15,
        billableHour: 8
    }, {
        period: 'MAR',
        totalHour: 30,
        projectHour: 28,
        billableHour: 2
    }, {
        period: 'APR',
        totalHour: 20,
        projectHour: 20,
        billableHour: 0
    }, {
        period: 'MAY',
        totalHour: 10,
        projectHour: 2,
        billableHour: 0
    }, {
        period: 'JUN',
        totalHour: 10,
        projectHour: 21,
        billableHour: 18
    }, {
        period: 'JUL',
        totalHour: 10,
        projectHour: 2,
        billableHour: 8
    }, {
        period: 'AUG',
        totalHour: 10,
        projectHour: 4,
        billableHour: 8
    }, {
        period: 'SEP',
        totalHour: 16,
        projectHour: 2,
        billableHour: 4
    }, {
        period: 'OCT',
        totalHour: 25,
        projectHour: 25,
        billableHour: 8
    }, {
        period: 'NOV',
        totalHour: 35,
        projectHour: 35,
        billableHour: 0
    }, {
        period: 'DEC',
        totalHour: 20,
        projectHour: 20,
        billableHour: 0
    }];

  public morrisDonutInfo = [
    {
      label: 'Steve Rogers',
      value: 49,
    }, {
      label: 'James Toa',
      value: 35
    }, {
      label: 'Smith Will',
      value: 8
    }, {
      label: 'Alpha Beta',
      value: 12
    }, {
      label: 'Bruce Banner',
      value: 8
    }, {
      label: 'Other',
      value: 9
    }];

  public morrisDonutColors = ['#ffd97f', '#fab2c0', '#80dad8', '#a1abb8', '#38849B', '#6EB1DD', '#FF7E7E', '#F79E5D', '#6F7B83'];

  public morrisLineChartInfo = [
    {
      period: 'Jun',
      value: 2,
    }, {
      period: 'JUL',
      value: 3,
    }, {
      period: 'AUG',
      value: 3,
    }, {
      period: 'SEP',
      value: 2,
    }, {
      period: 'OCT',
      value: 1,
    }, {
      period: 'NOV',
      value: 2,
    }, {
      period: 'DEC',
      value: 3,
    }];

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

  ngOnInit() {
    this.pendingOrders.map( p => p.timeLapsed = moment(p.timeLapsed).format('MMMM DD, YYYY'));
  }
}
