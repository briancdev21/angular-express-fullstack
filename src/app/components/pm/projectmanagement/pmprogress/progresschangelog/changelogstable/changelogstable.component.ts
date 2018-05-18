import { Component, Input, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import * as _ from 'lodash';

@Component({
  selector: 'app-changelogstable',
  templateUrl: './changelogstable.component.html',
  styleUrls: [
    './changelogstable.component.css',
  ],
})


export class ChangeLogsTableComponent implements OnInit {

  changelogListInfo: Array<Object> = [
    {
      logId: 'CL0159-01',
      logName: 'Changing of the TV location in Living Room',
      priority: 1,
      requestedBy: 'Sepehr Shoarinejad',
      budgetImpact: 2000,
      scheduleImpact: -14,
      dateCreated: 'November 20, 2016',
      lastUpdated: 'January 20, 2017',
      dateApproved: 'January 20, 2017',
    },
    {
      logId: 'CL0159-02',
      logName: 'Customer constantly changing his mind',
      priority: 1,
      requestedBy: 'Sepehr Shoarinejad',
      budgetImpact: -2000,
      scheduleImpact: 2,
      dateCreated: 'December 15, 2016',
      lastUpdated: 'March 20, 2017',
      dateApproved: 'April 20, 2017',
    },
    {
      logId: 'CL0159-03',
      logName: 'I don\'t know what to do anymore',
      priority: 1,
      requestedBy: 'Tyler Labonte',
      budgetImpact: 3500,
      scheduleImpact: 4,
      dateCreated: 'January 20, 2016',
      lastUpdated: 'June 20, 2017',
      dateApproved: 'June 20, 2017',
    },
  ];
  sortClicked = true;
  clicked = false;
  sortScoreClicked = true;

  constructor( private router: Router ) {
  }

  ngOnInit() {
    // this.changelogListInfo.map(i => i.timePassed = this.calcTimePassedDays(i.signedDate, i.status));
  }

  getStatus() {
  }

  redirectTo() {
    this.router.navigate(['./pm/pm-details/pm-progress/pm-log-details/']);
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

}

