import { Component, Input, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import * as _ from 'lodash';

@Component({
  selector: 'app-pendingworkorderslisttable',
  templateUrl: './pendingworkorderslisttable.component.html',
  styleUrls: [
    './pendingworkorderslisttable.component.css',
  ],
  providers: [],
})


export class PendingWorkOrdersListTableComponent implements OnInit {

  projectsListInfo = [
    {
      workOrderNumber: 'WO12345',
      workOrderName: 'Work Order Title Here',
      customerName: 'John Moss',
      startDate: '2017-11-20',
      scheduleStart: '8:00 AM',
      scheduleEnd: '6:30 PM',
      collaborators: [
        {
          name: 'John Moss',
          imgUrl: 'assets/users/user1.png'
        }
      ],
      completion: 0
    },
    {
      workOrderNumber: 'WO12344',
      workOrderName: 'Work Order Title Here',
      customerName: 'John Moss',
      startDate: '2017-11-19',
      scheduleStart: '12:00 PM',
      scheduleEnd: '6:30 PM',
      collaborators: [
        {
          name: 'John Moss',
          imgUrl: 'assets/users/user1.png'
        },
        {
          name: 'Steve Jobs',
          imgUrl: 'assets/users/user2.png'
        }
      ],
      completion: 0
    },
  ];
  public barInfo: any;
  sortClicked = true;
  clicked = false;
  sortScoreClicked = true;

  constructor( private router: Router ) {
  }

  ngOnInit() {
    this.projectsListInfo.map(i => i['barInfo'] = {
      title: i.completion + '%',
      completeness: i.completion
    });
  }

  getStatus() {
  }

  redirectTo(id) {
    this.router.navigate(['../projectslist/' + id]);
  }

  sortArray(field) {
    const cmp = this;
    cmp.sortScoreClicked = ! cmp.sortScoreClicked;
    if (!cmp.sortScoreClicked) {
      this.projectsListInfo.sort( function(name1, name2) {
        if ( name1[field] < name2[field] ) {
          return -1;
        } else if ( name1[field] > name2[field]) {
          return 1;
        } else {
          return 0;
        }
      });
    } else {
      this.projectsListInfo.reverse();
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
      this.projectsListInfo.sort( function(name1, name2) {
        if ( Date.parse(name1[field]) < Date.parse(name2[field]) ) {
          return -1;
        } else if ( Date.parse(name1[field]) > Date.parse(name2[field])) {
          return 1;
        } else {
          return 0;
        }
      });
    } else {
      this.projectsListInfo.reverse();
    }
  }

  getDateColor(days) {
    return days <= 6 ? 'green' : days <= 14 ? 'orange' : 'red';
  }

}

