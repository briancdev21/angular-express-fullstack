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

    this.sharedService.getProjectsStatistics(0, 0, 'MONTHLY', 'projectTasksDueToday').subscribe(res => {
      this.dueToday = res.projectTasksDueToday;
      console.log('duetoday: ', res);
    });

    this.sharedService.getProjectsStatistics(0, 0, 'MONTHLY', 'projectTasksDueThisWeek').subscribe(res => {
      this.dueThisWeek = res.projectTasksDueThisWeek;
    });

    this.sharedService.getProjectsStatistics(0, 0, 'MONTHLY', 'projectTasksDueNextWeek').subscribe(res => {
      this.dueNextWeek = res.projectTasksDueNextWeek;
    });

    this.sharedService.getProjectsStatistics(0, 0, 'MONTHLY', 'overDueProjectTasks').subscribe(res => {
      this.overdue = res.overDueProjectTasksOverTime[0].frameValue;
    });

    this.currentProjectId = localStorage.getItem('current_projectId');
    if (this.currentProjectId !== '') {
      this.sharedService.getContacts().subscribe(data => {
        this.contactsList = data;
        this.addContactName(this.contactsList);
        this.projectsService.getIndividualProject(this.currentProjectId).subscribe(res => {

          this.projectInfo = res.data;
          this.projectInfo.contactName = this.getContactNameFromId(res.data.contactId);
          this.barInfo = {
            title: 'Project health is at ' + this.projectInfo.health + '%',
            completeness: this.projectInfo.health,
          };
          console.log('indi project: ', this.projectInfo);
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

}
