import { Component, Input, OnInit, HostListener } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import * as _ from 'lodash';
import * as moment from 'moment';
import { SharedService } from '../../../../../../services/shared.service';
import { ProjectsService } from '../../../../../../services/projects.service';

@Component({
  selector: 'app-changelogstable',
  templateUrl: './changelogstable.component.html',
  styleUrls: [
    './changelogstable.component.css',
  ],
})


export class ChangeLogsTableComponent implements OnInit {

  changelogListInfo: Array<Object> = [
  ];
  sortClicked = true;
  clicked = false;
  sortScoreClicked = true;
  usersList = [];
  currentProjectId: any;
  changeLogsInfo: any;

  constructor( private router: Router, private sharedService: SharedService,
    private projectsService: ProjectsService, private route: ActivatedRoute  ) {
      this.currentProjectId = localStorage.getItem('current_projectId');
      this.sharedService.getUsers().subscribe(data => {
        this.usersList = data;
        this.addUserRealName(this.usersList);
        this.projectsService.getProjectChangeLogs(this.currentProjectId).subscribe(res => {
          console.log('change log list: ', res);
          this.changeLogsInfo = res.results;
          this.changeLogsInfo.forEach(ele => {
            ele['dateCreated'] = moment(ele['createdAt']).format('MMMM DD, YYYY');
            ele['lastUpdated'] = moment(ele['updatedAt']).format('MMMM DD, YYYY');
            ele['dateApproved'] = ele['approvedAt'] ? moment(ele['createdAt']).format('MMMM DD, YYYY') : '';
          });
          if (res.data) {
            this.changeLogsInfo.customerName = this.getCustomerNameFromUsername(res.data.contactId);
          }
        });

      });
  }

  ngOnInit() {
    // this.changelogListInfo.map(i => i.timePassed = this.calcTimePassedDays(i.signedDate, i.status));
  }

  getStatus() {
  }

  redirectTo(id) {
    this.router.navigate(['./pm/pm-details/pm-progress/pm-log-details/', {id: id}]);
  }

  sortArray(field) {
    const cmp = this;
    cmp.sortScoreClicked = ! cmp.sortScoreClicked;
    if (!cmp.sortScoreClicked) {
      this.changelogListInfo.sort( function(name1, name2) {
        if ( Math.abs(name1[field]) < Math.abs(name2[field])) {
          return -1;
        } else if ( Math.abs(name1[field]) > Math.abs(name2[field])) {
          return 1;
        } else {
          return 0;
        }
      });
    } else {
      this.changelogListInfo.reverse();
    }
  }

  calcTimePassedDays(sign, status) {
    const today = new Date();
    const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    const signDate = new Date(sign);
    const diffDays = Math.round((today.getTime() - signDate.getTime()) / (oneDay));
    if (diffDays < 0) {
      return 0;
    } else {
      return diffDays;
    }
  }

  sortCreateDateArray(field) {
    const cmp = this;
    cmp.sortScoreClicked = ! cmp.sortScoreClicked;
    if (!cmp.sortScoreClicked) {
      this.changelogListInfo.sort( function(name1, name2) {
        if ( Date.parse(name1[field]) < Date.parse(name2[field]) ) {
          return -1;
        } else if ( Date.parse(name1[field]) > Date.parse(name2[field])) {
          return 1;
        } else {
          return 0;
        }
      });
    } else {
      this.changelogListInfo.reverse();
    }
  }

  getDateColor(days) {
    return days >= 0 ? 'green' : 'red';
  }

  getAbs(value) {
    return Math.abs(value);
  }

  getBudgetColor(budget) {
    return budget >= 0 ? 'green' : 'red';
  }

  addUserRealName(data) {
    data.forEach(element => {
      element.name = element.firstName + ' ' + element.lastName;
    });
    return data;
  }

  getCustomerNameFromUsername(username) {
    const selectedUser = this.usersList.filter(c => c.username === username)[0];
    return selectedUser.name;
  }

  addChangeLog() {
    this.router.navigate(['./pm/pm-details/pm-log-add/']);
  }

}

