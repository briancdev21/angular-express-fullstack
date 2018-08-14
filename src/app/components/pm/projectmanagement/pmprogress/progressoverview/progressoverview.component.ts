import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectManagementService } from '../../projectmanagement.service';
import { SharedService } from '../../../../../services/shared.service';
import { ProjectsService } from '../../../../../services/projects.service';

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
  links = [];

  public projectInfo: any;

  dueToday: any;
  dueThisWeek: any;
  dueNextWeek: any;
  overdue: any;
  public barInfo: any;

  public morrisDonutInfo = [];

  public morrisDonutColors = ['#ffd97f', '#fab2c0', '#80dad8', '#a1abb8', '#38849B', '#6EB1DD', '#FF7E7E', '#F79E5D', '#6F7B83'];

  donutTimePeriod = 'MONTHLY';

  public morrisLineChartInfo = [];
  actualBudgetOverTime = [];
  estimatedBudgetOverTime = [];

  public areaChartInfo = [];

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

  currentProjectId: any;
  contactsList = [];

  constructor( private pmService: ProjectManagementService, private sharedService: SharedService,
    private projectsService: ProjectsService ) {
    this.sharedService.getProjectsStatistics(0, 0, 'MONTHLY', 'projectHoursOverTime').subscribe(res => {
      this.morrisDonutInfo = res.projectHoursOverTime;
      this.morrisDonutInfo.forEach(ele => {
        ele.label = ele.name;
        ele.value = ele.percent;
      });
    });

    this.sharedService.getProjectsStatistics(5, 0, 'MONTHLY', 'projectsRevenueOverTime').subscribe(res => {
      this.morrisLineChartInfo = res.projectsRevenueOverTime;
      this.morrisLineChartInfo.forEach(ele => {
        ele.period = ele.frameUnit.toUpperCase().slice(0, 3);
        ele.revenue = ele.frameValue;
      });
    });

    this.sharedService.getProjectsStatistics(11, 0, 'MONTHLY', 'actualProjectBugdetOverTime').subscribe(res => {
      this.actualBudgetOverTime = res.actualProjectBugdetOverTime;
      this.sharedService.getProjectsStatistics(11, 0, 'MONTHLY', 'estimatedProjectBugdetOverTime').subscribe(data => {
        this.estimatedBudgetOverTime = data.estimatedProjectBugdetOverTime;
        for (let i = 0; i < this.estimatedBudgetOverTime.length; i ++) {
          const combinedData = {
            period: this.estimatedBudgetOverTime[i].frameUnit.toUpperCase().slice(0, 3),
            Actual: this.actualBudgetOverTime[i].frameValue,
            Estimate: this.estimatedBudgetOverTime[i].frameValue
          };
          this.areaChartInfo.push(combinedData);
        }
      });
    });

    this.sharedService.getProjectsStatistics(0, 0, 'MONTHLY', 'projectTasksDueToday').subscribe(res => {
      this.dueToday = res.projectTasksDueToday;
    });

    this.sharedService.getProjectsStatistics(0, 0, 'MONTHLY', 'projectTasksDueThisWeek').subscribe(res => {
      this.dueThisWeek = res.projectTasksDueThisWeek;
    });

    this.sharedService.getProjectsStatistics(0, 0, 'MONTHLY', 'projectTasksDueNextWeek').subscribe(res => {
      this.dueNextWeek = res.projectTasksDueNextWeek;
    });

    this.sharedService.getProjectsStatistics(0, 0, 'MONTHLY', 'overDueProjectTasks').subscribe(res => {
      this.overdue = res.overDueProjectTasks;
    });

    this.currentProjectId = localStorage.getItem('current_projectId');
    if (this.currentProjectId !== '') {
      this.sharedService.getContacts().subscribe(data => {
        this.contactsList = data;
        this.addContactName(this.contactsList);
        this.projectsService.getIndividualProject(this.currentProjectId).subscribe(res => {

          this.projectInfo = res.data;
          this.sharedService.getMulipleContacts(res.data.contactId).subscribe(contact => {
            const selectedContact = contact[0];
            this.projectInfo.contactName = this.getContactName(selectedContact);
          });
          this.barInfo = {
            title: 'Project health is at ' + this.projectInfo.health + '%',
            completeness: this.projectInfo.health,
          };
        });

      });
    } else {
      console.error('product id error');
    }
  }

  ngOnInit() {

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

  addContactName(data) {
    data.forEach(element => {
      if (element.type === 'PERSON') {
        element.name = element.person.firstName + ' ' + element.person.lastName;
      } else {
        element.name = element.business.name;
      }
    });
    return data;
  }

  getContactNameFromId(id) {
    const selectedContact = this.contactsList.filter(c => c.id === id)[0];
    console.log('selected: ', id, selectedContact, this.contactsList);
    return selectedContact.name;
  }

  getContactName(selectedContact) {
    if (selectedContact.type === 'PERSON') {
      selectedContact.name = selectedContact.person.firstName + ' ' + selectedContact.person.lastName;
    } else {
      selectedContact.name = selectedContact.business.name;
    }
    return selectedContact.name;
  }

}
