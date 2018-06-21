import { Component, Input, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectManagementService } from '../../../projectmanagement.service';
import * as _ from 'lodash';
import * as moment from 'moment';

@Component({
  selector: 'app-changeloglisttable',
  templateUrl: './changeloglisttable.component.html',
  styleUrls: [
    './changeloglisttable.component.css',
  ],
})


export class ChangeLogListTableComponent implements OnInit {

  @Input() changeLogList;
  public barInfo: any;
  sortClicked = true;
  clicked = false;
  sortScoreClicked = true;
  dateNow = new Date();
  aweekLater = new Date();
  constructor( private pmService: ProjectManagementService, private router: Router ) {
  }

  ngOnInit() {
    // get a week later date
    this.aweekLater.setDate(this.aweekLater.getDate() + 7);

    // Change date format
    this.changeLogList.map( l => {
      l.dateCreated = moment(l.dateCreated).format('MMMM DD, YYYY');
      l.lastUpdated = moment(l.lastUpdated).format('MMMM DD, YYYY');
      l.dateApproved = moment(l.dateApproved).format('MMMM DD, YYYY');
    });
  }

  getStatus() {
  }

  redirectTo(id) {
    this.router.navigate(['../changelog/' + id]);
  }

  sortArray(field) {
    const cmp = this;
    cmp.sortScoreClicked = ! cmp.sortScoreClicked;
    if (!cmp.sortScoreClicked) {
      this.changeLogList.sort( function(name1, name2) {
        if ( name1[field] < name2[field] ) {
          return -1;
        } else if ( name1[field] > name2[field]) {
          return 1;
        } else {
          return 0;
        }
      });
    } else {
      this.changeLogList.reverse();
    }
  }

  sortDateArray(field) {
    const cmp = this;
    cmp.sortScoreClicked = ! cmp.sortScoreClicked;
    if (!cmp.sortScoreClicked) {
      this.changeLogList.sort( function(name1, name2) {
        console.log('999', name1[field], name2[field]);
        if ( Date.parse(name1[field]) < Date.parse(name2[field]) ) {
          return -1;
        } else if ( Date.parse(name1[field]) > Date.parse(name2[field]) || name2[field] === '') {
          return 1;
        } else {
          return 0;
        }
      });
    } else {
      this.changeLogList.reverse();
    }
  }

  getColor(value) {
    if (value >= 0) {
      return 'green';
    } else {
      return 'red';
    }
  }

  changeToAbs(value) {
    return Math.abs(value);
  }
}

