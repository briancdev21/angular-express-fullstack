import { Component, ChangeDetectorRef, Input, OnInit, HostListener, EventEmitter, Output, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import * as _ from 'lodash';
import * as moment from 'moment';

@Component({
  selector: 'app-pmdashboard',
  templateUrl: './pmdashboard.component.html',
  styleUrls: [
    './pmdashboard.component.css',
  ],
  providers: []
})


export class PmDashboardComponent implements OnInit {

  public projectTasks = {
    dueToday: 12,
    dueThisWeek: 24,
    dueNextWeek: 16,
    overDue: 5
  };

  public projectsInfo = {
    newProject: 3,
    activeProject: 5,
    completedproject: 2,
    pendingProject: 2
  };

  public activeProjects = [
    {
      projectName: 'Project 1',
      dueDate: '2018-02-12'
    }, {
      projectName: 'Project 1',
      dueDate: '2018-03-12'
    }, {
      projectName: 'Project 1',
      dueDate: '2018-03-28'
    }, {
      projectName: 'Project 1',
      dueDate: '2018-04-12'
    }, {
      projectName: 'Project 1',
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
      label: '8802-0212',
      value: 49,
    }, {
      label: '8802-0213',
      value: 35
    }, {
      label: '8802-0214',
      value: 8
    }, {
      label: '8802-0215',
      value: 12
    }, {
      label: '8802-0216',
      value: 8
    }, {
      label: 'other',
      value: 99
    }];

  public morrisDonutColors = ['#ffd97f', '#fab2c0', '#80dad8', '#a1abb8', '#38849B', '#6EB1DD', '#FF7E7E', '#F79E5D', '#6F7B83'];

  public morrisLineChartInfo = [
    {
      period: 'Jun',
      revenue: 67000,
    }, {
      period: 'JUL',
      revenue: 54000,
    }, {
      period: 'AUG',
      revenue: 35203,
    }, {
      period: 'SEP',
      revenue: 62652,
    }, {
      period: 'OCT',
      revenue: 802520,
    }, {
      period: 'NOV',
      revenue: 152000,
    }, {
      period: 'DEC',
      revenue: 152003,
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
    this.activeProjects.map( p => p.dueDate = moment(p.dueDate).format('MMMM DD, YYYY'));
  }
}
