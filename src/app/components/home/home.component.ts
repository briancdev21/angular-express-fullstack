import { Component, ChangeDetectorRef, Input, OnInit, HostListener, EventEmitter, Output, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import * as _ from 'lodash';
import * as moment from 'moment';
import { SharedService } from '../../services/shared.service';
import { ProjectsService } from '../../services/projects.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: [
    './home.component.css',
  ],
  providers: []
})

export class HomeComponent implements OnInit {

  menuCollapsed = true;
  currentDate = moment().format('MMMM DD, YYYY');
  currentDay = moment().format('dddd');
  currentHr = new Date().getHours();
  greeting: string;
  barTimePeriod = 'MONTHLY';
  userInfo = {
    name: 'Sepehr',
    tasksCount: 10,
    eventsCount: 4
  };
  agendaInfo = [
    {
      day: 11,
      month: 'May',
      year: 2018,
      title: 'Meeting',
      details: 'Meeting with Rockwood Homes',
      address: '123 6th St. Melbourne, FL 32904'
    },
    {
      day: 11,
      month: 'May',
      year: 2018,
      title: 'Meeting',
      details: 'Meeting with Rockwood Homes',
      address: 'Nu Automations'
    },
    {
      day: 11,
      month: 'May',
      year: 2018,
      title: 'Meeting with Rockwood Homes',
      details: 'Meeting with Rockwood Homes',
      address: '123 6th St. Melbourne, FL 32904'
    }
  ];

  tasksInfo = [
    {
      day: 11,
      month: 'Jan',
      year: 2018,
      title: 'Edit proposal for John',
      details: 'Meeting with Rockwood Homes',
      address: '123 6th St. Melbourne, FL 32904',
      like: false,
      fileUploaded: true,
      alert: false,
    },
    {
      day: 11,
      month: 'May',
      year: 2018,
      title: 'Meeting with Rockwood Homes',
      details: 'Meeting with Rockwood Homes',
      address: 'Nu Automations',
      like: false,
      fileUploaded: true,
      alert: false,
      followerImg: 'assets/users/user1.png'
    },
    {
      day: 11,
      month: 'May',
      year: 2018,
      title: 'Meeting with Rockwood Homes',
      details: 'Meeting with Rockwood Homes',
      address: '123 6th St. Melbourne, FL 32904',
      like: false,
      fileUploaded: true,
      alert: false,
      followerImg: 'assets/users/user1.png'
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

  morrisBarChartInfo = [];

  public activeProjectsLine = [
    {
      period: 'Jun',
      project: 3,
    }, {
      period: 'JUL',
      project: 4,
    }, {
      period: 'AUG',
      project: 3,
    }, {
      period: 'SEP',
      project: 5,
    }, {
      period: 'OCT',
      project: 3,
    }, {
      period: 'NOV',
      project: 6,
    }, {
      period: 'DEC',
      project: 4,
    }];

  public leadsToWinLine = [
    {
      period: 'Jun',
      percent: 2,
    }, {
      period: 'JUL',
      percent: 3,
    }, {
      period: 'AUG',
      percent: 4,
    }, {
      period: 'SEP',
      percent: 2,
    }, {
      period: 'OCT',
      percent: 7,
    }, {
      period: 'NOV',
      percent: 5,
    }, {
      period: 'DEC',
      percent: 1,
    }];

  public salesMarginsLine = [
    {
      period: 'Jun',
      margin: 45,
    }, {
      period: 'JUL',
      margin: 55,
    }, {
      period: 'AUG',
      margin: 50,
    }, {
      period: 'SEP',
      margin: 45,
    }, {
      period: 'OCT',
      margin: 30,
    }, {
      period: 'NOV',
      margin: 45,
    }, {
      period: 'DEC',
      margin: 50,
    }];

  showBarChart = true;

  constructor ( private sharedService: SharedService, private projectsService: ProjectsService ) {
    const m = localStorage.getItem('menu_collapsed');
    if (m === 'true') {
      this.menuCollapsed = true;
    } else if (m === 'false') {
      this.menuCollapsed = false;
    } else {
      this.menuCollapsed = true;
    }

    this.fetchRevenueBarChartData('MONTHLY');
  }

  fetchRevenueBarChartData(unit) {
    this.sharedService.getSalesStatistics(11, 0, unit, 'revenueOverTime').subscribe(sales => {
      this.morrisBarChartInfo = sales.revenueOverTime;
      this.showBarChart = false;
      setTimeout(() => {
        this.showBarChart = true;
      });
      this.morrisBarChartInfo.forEach(element => {
        element.y = element.frameUnit;
        element.revenue = element.frameValue;
      });
    });
  }

  ngOnInit() {
    if (this.currentHr < 4) {
      this.greeting = 'Good Night';
    } else if (this.currentHr < 12) {
      this.greeting = 'Good Morning';
    } else if (this.currentHr < 19) {
      this.greeting = 'Good Afternoon';
    } else {
      this.greeting = 'Good Night';
    }
  }

  toggleMenubar(data: boolean) {
    this.menuCollapsed  = data;
  }

}
