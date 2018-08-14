import { Component, Input, OnInit, HostListener } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import * as _ from 'lodash';
import * as moment from 'moment';
import { SharedService } from '../../../../../services/shared.service';
import { CollaboratorsService } from '../../../../../services/collaborators.service';
import { ProjectsService } from '../../../../../services/projects.service';

@Component({
  selector: 'app-pendingworkorderslisttable',
  templateUrl: './pendingworkorderslisttable.component.html',
  styleUrls: [
    './pendingworkorderslisttable.component.css',
  ],
  providers: [],
})


export class PendingWorkOrdersListTableComponent implements OnInit {

  projectsListInfo = [];
  public barInfo: any;
  sortClicked = true;
  clicked = false;
  sortScoreClicked = true;
  usersList = [];
  contactsList = [];
  workOrdersList = [];
  currentProjectId: any;
  contactName: any;

  constructor( private router: Router, private sharedService: SharedService,
    private collaboratorsService: CollaboratorsService, private route: ActivatedRoute, private projectsService: ProjectsService ) {

    this.currentProjectId = localStorage.getItem('current_pending_projectId');

    this.sharedService.getUsers().subscribe(user => {
      this.usersList = user;

        this.collaboratorsService.getProjectWorkOrders(this.currentProjectId).subscribe(res => {
          this.workOrdersList = res.results;
          const contactIds = this.workOrdersList.map(p => p.contactId);
          this.sharedService.getMulipleContacts(contactIds).subscribe(contact => {
            this.contactsList = contact;
            this.addContactName(this.contactsList);

            this.workOrdersList.forEach(element => {
              const colArr = [];
              element.startTime = moment(element.startDate).format('hh:mm a');
              element.endTime = moment(element.endDate).format('hh:mm a');
              element.startDate = moment(element.startDate).format('MMMM DD, YYYY');
              element.contactName = this.getContactNameFromId(element.contactId);
              element.barInfo = {
                title: element.completion + '%',
                completeness: element.completion
              };
              if (element.collaborators) {
                element.collaborators.forEach(col => {
                  colArr.push(this.usersList.filter(u => u.username === col)[0]);
                });
                element.collaboratorsData = colArr;
              } else {
                element.collaboratorsData = [];
              }
            });
            console.log('work order list: ', this.workOrdersList);
          });
        });

        this.projectsService.getIndividualProject(this.currentProjectId).subscribe(res => {
          this.sharedService.getMulipleContacts(res.data.contactId).subscribe(data => {
            const selectedContact = data[0];
            this.contactName = this.getContactName(selectedContact);
          });
        });

    });
  }

  ngOnInit() {
  }

  getStatus() {
  }

  sortArray(field) {
    const cmp = this;
    cmp.sortScoreClicked = ! cmp.sortScoreClicked;
    if (!cmp.sortScoreClicked) {
      this.workOrdersList.sort( function(name1, name2) {
        if ( name1[field] < name2[field] ) {
          return -1;
        } else if ( name1[field] > name2[field]) {
          return 1;
        } else {
          return 0;
        }
      });
    } else {
      this.workOrdersList.reverse();
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
      this.workOrdersList.sort( function(name1, name2) {
        if ( Date.parse(name1[field]) < Date.parse(name2[field]) ) {
          return -1;
        } else if ( Date.parse(name1[field]) > Date.parse(name2[field])) {
          return 1;
        } else {
          return 0;
        }
      });
    } else {
      this.workOrdersList.reverse();
    }
  }

  getDateColor(days) {
    return days <= 6 ? 'green' : days <= 14 ? 'orange' : 'red';
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
    return selectedContact.name;
  }

  getContactName(selectedContact) {
    if (selectedContact.type === 'PERSON') {
      selectedContact.name = selectedContact.person.firstName + ' ' + selectedContact.person.lastName;
    } else {
      selectedContact.name = selectedContact.business.name;
    }
    return selectedContact.name;
  }

  redirectTo(id) {
    this.router.navigate(['../collaboration/order-profile', {id: id}]);
  }

}

