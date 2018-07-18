import { Component, Input, OnInit, HostListener } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProjectManagementService } from '../../../projectmanagement.service';
import * as _ from 'lodash';
import * as moment from 'moment';
import { ProjectsService } from '../../../../../../services/projects.service';

@Component({
  selector: 'app-changeloglisttable',
  templateUrl: './changeloglisttable.component.html',
  styleUrls: [
    './changeloglisttable.component.css',
  ],
})


export class ChangeLogListTableComponent implements OnInit {

  public barInfo: any;
  sortClicked = true;
  clicked = false;
  sortScoreClicked = true;
  dateNow = new Date();
  aweekLater = new Date();
  currentProjectId: any;
  currentChangeLogId: any;
  changeLogItems: any;
  changeLogs: any;

  constructor( private pmService: ProjectManagementService, private router: Router, private projectsService: ProjectsService,
    private route: ActivatedRoute ) {
    this.currentProjectId = localStorage.getItem('current_projectId');
    this.currentChangeLogId = this.route.snapshot.paramMap.get('id');
    this.projectsService.getProjectChangeLogs(this.currentProjectId).subscribe(res => {
      this.changeLogs = res.results;
      this.projectsService.getChangeLogItems(this.currentProjectId, this.currentChangeLogId).subscribe(data => {
        this.changeLogItems = data.results;
        this.changeLogItems.forEach(element => {
          element.formatedCreatedAt = moment(element.createdAt).format('MMMM DD, YYYY');
          element.formatedUpdatedAt = moment(element.updatedAt).format('MMMM DD, YYYY');
          element.formatedApprovedAt = element.dateApproved ? moment(element.dateApproved).format('MMMM DD, YYYY') : '';
          element.typeName = this.changeLogs.filter(l => l.id === element.changeLogId)[0].title;
        });
      });
    });

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
      this.changeLogItems.sort( function(name1, name2) {
        if ( name1[field] < name2[field] ) {
          return -1;
        } else if ( name1[field] > name2[field]) {
          return 1;
        } else {
          return 0;
        }
      });
    } else {
      this.changeLogItems.reverse();
    }
  }

  sortDateArray(field) {
    const cmp = this;
    cmp.sortScoreClicked = ! cmp.sortScoreClicked;
    if (!cmp.sortScoreClicked) {
      this.changeLogItems.sort( function(name1, name2) {
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
      this.changeLogItems.reverse();
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

