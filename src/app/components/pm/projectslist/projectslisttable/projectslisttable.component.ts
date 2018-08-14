import { Component, Input, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { FilterService } from '../filter.service';
import * as _ from 'lodash';
import { HorizontalBarComponent } from '../../../common/horizontalbar/horizontalbar.component';
import { ProjectsService } from '../../../../services/projects.service';
import { SharedService } from '../../../../services/shared.service';
import * as moment from 'moment';
import { PmService } from '../../pm.service';

@Component({
  selector: 'app-projectslisttable',
  templateUrl: './projectslisttable.component.html',
  styleUrls: [
    './projectslisttable.component.css',
  ],
  providers: [FilterService],
})


export class ProjectsListTableComponent implements OnInit {

  @Input() projectsListInfo;
  public barInfo: any;
  sortClicked = true;
  clicked = false;
  sortScoreClicked = true;
  contactsList: any;

  constructor( private filterService: FilterService, private router: Router, private projectsService: ProjectsService,
    private sharedService: SharedService, private pmService: PmService ) {

      this.projectsService.getProjectsList().subscribe(res => {
        this.projectsListInfo = res.results;
        const projectIds = this.projectsListInfo.map(p => p.contactId);
        this.sharedService.getMulipleContacts(projectIds).subscribe(contact => {
          this.contactsList = contact;
          this.addContactName(this.contactsList);
        });
        this.projectsListInfo.forEach(element => {
          element.endDate = moment(element.endDate).format('MMMM DD, YYYY');
          element.barInfo = {
            title: element.health + '%',
            completeness: element.health
          };
        });
        this.projectsListInfo = this.projectsListInfo.filter(p => p.status === 'IN_PROGRESS');
        console.log('projectslist: ', res);
      });


  }

  ngOnInit() {
    // this.projectsListInfo.map(i => i.barInfo = {
    //   title: i.health + '%',
    //   completeness: i.health
    // });
  }

  getStatus() {
  }

  redirectTo(id) {
    this.router.navigate(['./pm/pm-details/']);
    localStorage.setItem('current_projectId', id);
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

  getContactName(id) {
    const selectedContact = this.contactsList.filter(c => c.id === id)[0];
    return selectedContact.name;
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

}

