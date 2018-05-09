import { Component, Input, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import * as _ from 'lodash';

@Component({
  selector: 'app-changeloglisttable',
  templateUrl: './changeloglisttable.component.html',
  styleUrls: [
    './changeloglisttable.component.css',
  ],
})


export class ChangeLogListTableComponent implements OnInit {

  @Input() changelogListInfo;
  sortClicked = true;
  clicked = false;
  sortScoreClicked = true;

  constructor( private router: Router ) {
  }

  ngOnInit() {
    this.changelogListInfo.map(i => i.timePassed = this.calcTimePassedDays(i.signedDate, i.status));
  }

  getStatus() {
  }

  redirectTo(id) {
    this.router.navigate(['../logs/' + id]);
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

