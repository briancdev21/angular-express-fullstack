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

  public activeProjectsLine = [];

  public leadsToWinLine = [];

  public salesMarginsLine = [];

  showBarChart = true;
  showSalesMarginChart = true;
  showLeadWinChart = true;
  showActiveProjectsChart = true;
  salesMarginPeriod = 'MONTHLY';
  leadWinPeriod = 'MONTHLY';
  activeProjectsPeriod = 'MONTHLY';

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
    this.fetchSalesPipelineData('MONTHLY');
    this.fetchLeadWinlineData('MONTHLY');
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

  fetchSalesPipelineData(unit) {
    this.sharedService.getSalesStatistics(5, 0, unit, 'salesMarginOverTime').subscribe(oppo => {
      this.salesMarginsLine = oppo.salesMarginOverTime;
      this.showSalesMarginChart = false;
      setTimeout(() => {
        this.showSalesMarginChart = true;
      });
      this.salesMarginsLine.forEach(element => {
        element.period = element.frameUnit;
        element.margin = element.frameValue;
      });
    });
  }

  fetchLeadWinlineData(unit) {
    this.sharedService.getCrmStatistics(5, 0, unit, 'opportunityLeadsOverTime').subscribe(oppo => {
      this.leadsToWinLine = oppo.opportunityLeadsOverTime;
      this.showLeadWinChart = false;
      setTimeout(() => {
        this.showLeadWinChart = true;
      });
      this.leadsToWinLine.forEach(element => {
        element.period = element.frameUnit;
        element.percent = element.frameValue;
      });
    });
  }

  fetchActiveProjectslineData(unit) {
    this.sharedService.getProjectsStatistics(5, 0, unit, 'activeProjectsOverTime').subscribe(oppo => {
      this.activeProjectsLine = oppo.activeProjectsOverTime;
      this.showActiveProjectsChart = false;
      setTimeout(() => {
        this.showActiveProjectsChart = true;
      });
      this.activeProjectsLine.forEach(element => {
        element.period = element.frameUnit;
        element.project = element.frameValue;
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
