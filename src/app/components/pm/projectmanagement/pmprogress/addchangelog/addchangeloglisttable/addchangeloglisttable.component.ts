import { Component, Input, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectManagementService } from '../../../projectmanagement.service';
import * as _ from 'lodash';
import * as moment from 'moment';
import { ProjectsService } from '../../../../../../services/projects.service';

@Component({
  selector: 'app-addchangeloglisttable',
  templateUrl: './addchangeloglisttable.component.html',
  styleUrls: [
    './addchangeloglisttable.component.css',
  ],
})


export class AddChangeLogListTableComponent implements OnInit {

  changeLogList: any;
  @Input() set changeLogInfo(val) {
    this._changeLogInfo = val;
    if (this._changeLogInfo.workOrderIds) {
      this._changeLogInfo.workOrderIds.forEach(element => {
        this.projectsService.getIndividualProjectWorkOrder(this.currentProjectId, element).subscribe(data => {
          // comment for now
          console.log('work order list: ', data);
          this.changeLogList.push(data.results);
        });
      });
    }
  }
  public barInfo: any;
  sortClicked = true;
  clicked = false;
  sortScoreClicked = true;
  dateNow = new Date();
  aweekLater = new Date();
  _changeLogInfo: any;
  currentProjectId: any;

  constructor( private pmService: ProjectManagementService, private router: Router, private projectsService: ProjectsService ) {
    this.currentProjectId = localStorage.getItem('current_projectId');
  }

  ngOnInit() {
    // get a week later date
    this.aweekLater.setDate(this.aweekLater.getDate() + 7);

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

