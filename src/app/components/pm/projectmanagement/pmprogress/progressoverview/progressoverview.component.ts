import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectManagementService } from '../../projectmanagement.service';
import { SharedService } from '../../../../../services/shared.service';

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

  dueToday = 12;
  dueThisWeek = 24;
  dueNextWeek = 16;
  public barInfo = {
    title: 'Project health is at ' + this.projectInfo.projectHealth + '%',
    completeness: this.projectInfo.projectHealth,
  };

  public morrisDonutInfo = [];

  public morrisDonutColors = ['#ffd97f', '#fab2c0', '#80dad8', '#a1abb8', '#38849B', '#6EB1DD', '#FF7E7E', '#F79E5D', '#6F7B83'];

  donutTimePeriod = 'MONTHLY';

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

    public areaChartInfo = [{
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

  activities = [
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
  constructor( private pmService: ProjectManagementService, private sharedService: SharedService ) {
    this.sharedService.getProjectsStatistics(0, 0, 'MONTHLY', 'projectHoursOverTime').subscribe(res => {
      this.morrisDonutInfo = res.projectHoursOverTime;
      this.morrisDonutInfo.forEach(ele => {
        ele.label = ele.name;
        ele.value = ele.percent;
      });
    });
  }

  ngOnInit() {
    // change to percentage
    const arr = this.morrisDonutInfo.map( v => v.value);
    let total = 0;
    arr.forEach(element => {
      total = total + element;
    });
    this.morrisDonutInfo.forEach(ele => {
      ele.value = Math.floor(ele.value * 100 / total);
    });
  }

  toggleMenubar(data: boolean) {
    this.menuCollapsed  = data;
  }

  donutDurationChange(data) {
    this.sharedService.getProjectsStatistics(0, 0, data, 'projectHoursOverTime').subscribe(res => {
      console.log('statics: ', res);
      this.morrisDonutInfo = res.projectHoursOverTime;
      this.morrisDonutInfo.forEach(ele => {
        ele.label = ele.name;
        ele.value = ele.percent;
      });
    });
  }

}
