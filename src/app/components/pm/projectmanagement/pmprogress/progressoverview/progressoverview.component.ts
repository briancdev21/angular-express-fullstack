import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PmService } from '../../pm.service';

@Component({
  selector: 'app-progressoverview',
  templateUrl: './progressoverview.component.html',
  styleUrls: [
    './progressoverview.component.css',
  ]
})

export class ProgressOverviewComponent implements OnInit {

  menuCollapsed: any;
  public tasks = [];
  links = [
  ];


  public projectInfo = {
    projectOwner: {
      name: 'John Moss',
      imgUrl: 'assets/users/user1.png',
    },
    projectId: 'NU8802-0159',
    startDate: '2016-12-5',
    targetDate: '',
    nextPaymentDate: '',
    budgetPerformance: 54,
    schedulePerformance: 51,
    roiPerformance: 67,
    projectHealth: 33,
    projectTasks: {
      totalTasks: 25,
      overdue: 1,
      completed: 4
    },
    projectProgress: {
      qualityPerformance: 93,
      scopePerformance: 58,
      scopeChange: 3,
      mitigation: 3,
    },
    inventoryHealth: {
      notProcessed: 0,
      onOrder: 1,
      checkedIn: 33,
      delivered: 0
    },
    projectBudget: 12566.37,
    budgetUsed: 6749,
    revenue: 11164,
    labor: 0,
  };


  public barInfo = {
    title: 'Project health is at ' + this.projectInfo.projectHealth + '%',
    completeness: this.projectInfo.projectHealth,
  };

  public morrisDonutInfo = [
    {
      label: 'Michael Yue',
      value: 49,
    }, {
      label: 'Tyler labonte',
      value: 35
    }, {
      label: 'Sepehr Shoarinejad',
      value: 8
    }, {
      label: 'Steve Rogers',
      value: 12
    }, {
      label: 'John Smith',
      value: 8
    }, {
      label: 'Iron Man',
      value: 99
    }];

  public morrisDonutColors = ['#ffd97f', '#fab2c0', '#80dad8', '#a1abb8', '#38849B', '#6EB1DD', '#FF7E7E', '#F79E5D', '#6F7B83'];

  donutTimePeriod = 'month';

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
      revenue: 1520003,
    },
    ];
  constructor( private pmService: PmService ) {
  }

  ngOnInit() {
  }

  toggleMenubar(data: boolean) {
    this.menuCollapsed  = data;
  }

}
