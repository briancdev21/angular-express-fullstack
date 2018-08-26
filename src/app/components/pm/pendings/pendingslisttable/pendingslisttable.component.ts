import { Component, Input, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { FilterService } from '../filter.service';
import * as _ from 'lodash';
import { ProjectsService } from '../../../../services/projects.service';
import { SharedService } from '../../../../services/shared.service';
import * as moment from 'moment';

@Component({
  selector: 'app-pendingslisttable',
  templateUrl: './pendingslisttable.component.html',
  styleUrls: [
    './pendingslisttable.component.css',
  ],
  providers: [FilterService],
})


export class PendingsListTableComponent implements OnInit {

  @Input() pendingsListInfo;
  sortClicked = true;
  clicked = false;
  sortScoreClicked = true;
  contactsList: any;

  constructor( private filterService: FilterService, private router: Router, private projectsService: ProjectsService,
    private sharedService: SharedService ) {

      this.projectsService.getProjectsList().subscribe(res => {
        this.pendingsListInfo = res.results;
        const contactIds = this.pendingsListInfo.map(p => p.contactId);
        this.sharedService.getMulipleContacts(contactIds).subscribe(contact => {
          this.contactsList = contact;
          this.addContactName(this.contactsList);
        });
        this.pendingsListInfo.forEach(element => {
          element.startDate = moment(element.startDate).format('MMMM DD, YYYY');
          element.timePassed = this.calcTimePassedDays(element.startDate, element.status);
        });
        this.pendingsListInfo = this.pendingsListInfo.filter(p => p.status === 'OPEN');
        console.log('pendingprojectslist: ', this.pendingsListInfo);
      });


  }

  ngOnInit() {
    // this.pendingsListInfo.map(i => i.timePassed = this.calcTimePassedDays(i.signedDate, i.status));
  }

  getStatus() {
  }

  redirectTo(id) {
    this.router.navigate(['./pm/pending-project']);
    localStorage.setItem('current_projectId', id);
  }

  sortArray(field) {
    const cmp = this;
    cmp.sortScoreClicked = ! cmp.sortScoreClicked;
    if (!cmp.sortScoreClicked) {
      this.pendingsListInfo.sort( function(name1, name2) {
        if ( name1[field] < name2[field] ) {
          return -1;
        } else if ( name1[field] > name2[field]) {
          return 1;
        } else {
          return 0;
        }
      });
    } else {
      this.pendingsListInfo.reverse();
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
      this.pendingsListInfo.sort( function(name1, name2) {
        if ( Date.parse(name1[field]) < Date.parse(name2[field]) ) {
          return -1;
        } else if ( Date.parse(name1[field]) > Date.parse(name2[field])) {
          return 1;
        } else {
          return 0;
        }
      });
    } else {
      this.pendingsListInfo.reverse();
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

