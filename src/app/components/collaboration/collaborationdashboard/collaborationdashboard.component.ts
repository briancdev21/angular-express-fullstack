import { Component, ChangeDetectorRef, Input, OnInit, HostListener, EventEmitter, Output, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import * as _ from 'lodash';
import * as moment from 'moment';
import { SharedService } from '../../../services/shared.service';
import { CollaboratorsService } from '../../../services/collaborators.service';

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
    totalTasks: 0,
    taskCompleted: 0,
    averageTasks: 0,
    incompleteTasks: 0
  };

  public pendingOrders = [
  ];

  public morrisMultiLineChartInfo: any;

  public morrisDonutInfo: any;

  public morrisDonutColors = ['#ffd97f', '#fab2c0', '#80dad8', '#a1abb8', '#38849B', '#6EB1DD', '#FF7E7E', '#F79E5D', '#6F7B83'];

  public morrisLineChartInfo: any;

  public workOrderDonutColors = ['#ffd97f', '#fab2c0', '#80dad8', '#a1abb8', '#38849B', '#6EB1DD', '#FF7E7E', '#F79E5D', '#6F7B83'];

  public workOrderDonutInfo: any;

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
  teamTimePeriod = 'MONTHLY';
  tasksTimePeriod = 'MONTHLY';
  backLogTimePeriod = 'MONTHLY';
  workOrderTimePeriod = 'MONTHLY';
  showTeamChart = true;
  showAverageChart = true;
  showBacklogChart = true;

  constructor(private sharedService: SharedService, private collaboratorsService: CollaboratorsService) {
    this.fetchTasksData('MONTHLY');

    this.fetchTeamTimeData('MONTHLY');

    this.fetchAverageTimeData('MONTHLY');

    this.fetchBacklogTimeData('MONTHLY');
    this.collaboratorsService.getWorkOrders().subscribe(res => {
      const orders = res.results;
      this.pendingOrders = orders.filter(o => o.status === 'IN_PROGRESS');
      this.sortDateArray('endDate');
      this.pendingOrders.forEach(element => {
        element.endDate = moment(element.endDate).format('MMMM DD, YYYY');
      });
    });

    this.sharedService.getCollaboratorsStatistics(11, 0, 'MONTHLY', 'totalHoursOverTime').subscribe(res => {
      const totalData = res.totalHoursOverTime;
      this.sharedService.getCollaboratorsStatistics(11, 0, 'MONTHLY', 'totalBillableHoursOverTime').subscribe(billing => {
        const billingData = billing.totalBillableHoursOverTime;
        this.sharedService.getCollaboratorsStatistics(11, 0, 'MONTHLY', 'totalProjectHoursOverTime').subscribe(est => {
          const projectData = est.totalProjectHoursOverTime;
          this.morrisMultiLineChartInfo = [];
          for (let i = 0; i < 12; i ++) {
            const addingIndi = {
              totalHour: totalData[i].frameValue,
              projectHour: projectData[i].frameValue,
              billableHour: billingData[i].frameValue,
              period: totalData[i].frameUnit.toUpperCase().slice(0, 3)
            };
            this.morrisMultiLineChartInfo.push(addingIndi);
          }
        console.log('###: ', this.morrisMultiLineChartInfo);
        });
      });
    });
  }

  ngOnInit() {
  }

  fetchTasksData(unit) {
    this.sharedService.getCollaboratorsStatistics(0, 0, unit, 'workOrderTasksTotalOverTime').subscribe(res => {
      this.orderTasks.totalTasks = res.workOrderTasksTotalOverTime[0].frameValue;
    });
    this.sharedService.getCollaboratorsStatistics(0, 0, unit, 'workOrderTasksCompletedOverTime').subscribe(res => {
      this.orderTasks.taskCompleted = res.workOrderTasksCompletedOverTime[0].frameValue;
    });
    this.sharedService.getCollaboratorsStatistics(0, 0, unit, 'averageTasksCompletedPerWorkOrderOverTime').subscribe(res => {
      this.orderTasks.averageTasks = res.averageTasksCompletedPerWorkOrderOverTime[0].frameValue;
    });
    this.sharedService.getCollaboratorsStatistics(0, 0, unit, 'incompleteWorkOverTasksOverTime').subscribe(res => {
      this.orderTasks.incompleteTasks = res.incompleteWorkOverTasksOverTime[0].frameValue;
    });
  }

  fetchTeamTimeData(unit) {
    this.sharedService.getCollaboratorsStatistics(0, 0, unit, 'teamHoursTotalOverTime').subscribe(res => {
      this.morrisDonutInfo = res.teamHoursTotalOverTime;
      this.showTeamChart = false;
      const total = this.morrisDonutInfo.map(h => h.value).reduce((a, b) => a + b, 0);
      setTimeout(() => {
        this.showTeamChart = true;
      });
      this.morrisDonutInfo.forEach(element => {
        element.label = element.name;
        element.value = (element.value / total * 100).toFixed(1);
      });
    });
  }

  fetchAverageTimeData(unit) {
    this.sharedService.getCollaboratorsStatistics(0, 0, unit, 'usersAverageWorkOrderHours').subscribe(res => {
      this.workOrderDonutInfo = res.usersAverageWorkOrderHours;
      this.showAverageChart = false;
      const total = this.workOrderDonutInfo.map(h => h.value).reduce((a, b) => a + b, 0);
      setTimeout(() => {
        this.showAverageChart = true;
      });
      this.workOrderDonutInfo.forEach(element => {
        element.label = element.name;
        element.value = (element.value / total * 100).toFixed(1);
      });
    });
  }

  fetchBacklogTimeData(unit) {
    this.sharedService.getCollaboratorsStatistics(5, 0, unit, 'workOrderBackLogOverTime').subscribe(res => {
      this.morrisLineChartInfo = res.workOrderBackLogOverTime;
      this.showBacklogChart = false;
      setTimeout(() => {
        this.showBacklogChart = true;
      });
      this.morrisLineChartInfo.forEach(element => {
        element.period = element.frameUnit;
        element.value = element.frameValue;
      });
    });
  }

  sortDateArray(field) {
    this.pendingOrders.sort( function(name1, name2) {
      if ( Date.parse(name1[field]) < Date.parse(name2[field]) ) {
        return -1;
      } else if ( Date.parse(name1[field]) > Date.parse(name2[field])) {
        return 1;
      } else {
        return 0;
      }
    });
    this.pendingOrders.reverse();
  }
}
