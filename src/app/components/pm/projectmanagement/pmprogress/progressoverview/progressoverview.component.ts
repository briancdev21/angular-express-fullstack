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
        label: 'Online Sales',
        value: 45,

    }, {
        label: 'Store Sales',
        value: 35
    }, {
        label: 'Email Sales',
        value: 8
    }, {
        label: 'Agent Sales',
        value: 12
    }];
  constructor( private pmService: PmService ) {
  }

  ngOnInit() {
  }

  toggleMenubar(data: boolean) {
    this.menuCollapsed  = data;
  }

}
