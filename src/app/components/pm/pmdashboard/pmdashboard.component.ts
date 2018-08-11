import { Component, ChangeDetectorRef, Input, OnInit, HostListener, EventEmitter, Output, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import * as _ from 'lodash';
import * as moment from 'moment';
import { SharedService } from '../../../services/shared.service';
import { ProjectsService } from '../../../services/projects.service';

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
    dueToday: 0,
    dueThisWeek: 0,
    dueNextWeek: 0,
    overDue: 0
  };

  public projectsInfo = {
    newProject: 0,
    activeProject: 0,
    completedproject: 0,
    pendingProject: 0
  };

  public activeProjects: any;

  public areaChartInfo: any;

  public morrisDonutInfo: any;

  public morrisDonutColors = ['#ffd97f', '#fab2c0', '#80dad8', '#a1abb8', '#38849B', '#6EB1DD', '#FF7E7E', '#F79E5D', '#6F7B83'];

  public morrisLineChartInfo: any;

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
  donutTimePeriod = 'MONTHLY';
  showDonutChart = true;

  constructor(private sharedService: SharedService, private projectsService: ProjectsService) {
    this.sharedService.getProjectsStatistics(5, 0, 'MONTHLY', 'projectsRevenueOverTime').subscribe(res => {
      this.morrisLineChartInfo = res.projectsRevenueOverTime;
      this.morrisLineChartInfo.forEach(ele => {
        ele.period = ele.frameUnit.toUpperCase().slice(0, 3);
        ele.revenue = ele.frameValue;
      });
    });

    this.sharedService.getProjectsStatistics(0, 0, 'MONTHLY', 'projectTasksDueToday').subscribe(res => {
      this.projectTasks.dueToday = res.projectTasksDueToday;
    });

    this.sharedService.getProjectsStatistics(0, 0, 'MONTHLY', 'projectTasksDueThisWeek').subscribe(res => {
      this.projectTasks.dueThisWeek = res.projectTasksDueThisWeek;
    });

    this.sharedService.getProjectsStatistics(0, 0, 'MONTHLY', 'projectTasksDueNextWeek').subscribe(res => {
      this.projectTasks.dueNextWeek = res.projectTasksDueNextWeek;
    });

    this.sharedService.getProjectsStatistics(0, 0, 'MONTHLY', 'overDueProjectTasks').subscribe(res => {
      this.projectTasks.overDue = res.overDueProjectTasks;
    });

    this.sharedService.getProjectsStatistics(0, 0, 'MONTHLY', 'newProjectsCount').subscribe(res => {
      this.projectsInfo.newProject = res.newProjectsCount;
    });

    this.sharedService.getProjectsStatistics(0, 0, 'MONTHLY', 'activeProjectsCount').subscribe(res => {
      this.projectsInfo.activeProject = res.activeProjectsCount;
    });

    this.sharedService.getProjectsStatistics(0, 0, 'MONTHLY', 'completedProjectsCountOverTime').subscribe(res => {
      this.projectsInfo.completedproject = res.completedProjectsCountOverTime[0].frameValue;
    });

    this.sharedService.getProjectsStatistics(0, 0, 'MONTHLY', 'pendingProjectsCount').subscribe(res => {
      this.projectsInfo.pendingProject = res.pendingProjectsCount;
    });

    this.sharedService.getProjectsStatistics(11, 0, 'MONTHLY', 'actualProjectBugdetOverTime').subscribe(res => {
      const areaActualData = res.actualProjectBugdetOverTime;
      this.sharedService.getProjectsStatistics(11, 0, 'MONTHLY', 'estimatedProjectBugdetOverTime').subscribe(est => {
        const areaEstimatedData = est.estimatedProjectBugdetOverTime;
        this.areaChartInfo = [];
        for (let i = 0; i < 12; i ++) {
          const addingIndi = {
            Actual: areaActualData[i].frameValue,
            Estimate: areaEstimatedData[i].frameValue,
            period: areaEstimatedData[i].frameUnit,
          };
          this.areaChartInfo.push(addingIndi);
        }
      });
    });

    this.projectsService.getProjectsList().subscribe(res => {
      const projectsList = res.results;
      console.log('projectsList: ', res);
      this.activeProjects = projectsList.filter(p => p.status === 'IN_PROGRESS');
      this.activeProjects.forEach(element => {
        element.dueDate = moment(element.endDate).format('MMMM DD, YYYY');
      });

      this.sortDateArray('dueDate');
    });

    this.fetchProjectHoursData('MONTHLY');
  }

  fetchProjectHoursData(unit) {
    this.sharedService.getProjectsStatistics(0, 0, unit, 'projectHoursOverTime').subscribe(sales => {
      this.morrisDonutInfo = sales.projectHoursOverTime;
      this.showDonutChart = false;
      const total = this.morrisDonutInfo.map(h => h.value).reduce((a, b) => a + b, 0);
      setTimeout(() => {
        this.showDonutChart = true;
      });
      this.morrisDonutInfo.forEach(element => {
        element.label = element.name;
        element.value = (element.value / total * 100).toFixed(1);
      });
    });
  }

  donutTimeChange(unit) {
    this.fetchProjectHoursData(unit);
  }

  sortDateArray(field) {
    this.activeProjects.sort( function(name1, name2) {
      if ( Date.parse(name1[field]) < Date.parse(name2[field]) ) {
        return -1;
      } else if ( Date.parse(name1[field]) > Date.parse(name2[field])) {
        return 1;
      } else {
        return 0;
      }
    });
    this.activeProjects.reverse();
  }

  ngOnInit() {
  //   this.activeProjects.map( p => p.dueDate = moment(p.dueDate).format('MMMM DD, YYYY'));
  //   const arr = this.morrisDonutInfo.map( v => v.value);
  //   let total = 0;
  //   arr.forEach(element => {
  //     total = total + element;
  //   });
  //   this.morrisDonutInfo.forEach(ele => {
  //     ele.value = Math.floor(ele.value * 100 / total);
  //   });
  }
}
