import { Component, Input, OnInit, HostListener } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FilterService } from '../filter.service';
import * as _ from 'lodash';
import { HorizontalBarComponent } from '../../../common/horizontalbar/horizontalbar.component';
import { SharedService } from '../../../../services/shared.service';
import { CollaboratorsService } from '../../../../services/collaborators.service';
import * as moment from 'moment';

@Component({
  selector: 'app-workorderstable',
  templateUrl: './workorderstable.component.html',
  styleUrls: [
    './workorderstable.component.css',
  ],
  providers: [FilterService],
})


export class WorkOrdersTableComponent implements OnInit {

  workOrdersInfo: any;
  public barInfo: any;
  sortClicked = true;
  clicked = false;
  sortScoreClicked = true;
  contactsList = [];
  workOrdersList = [];

  constructor( private filterService: FilterService, private router: Router, private sharedService: SharedService,
    private collaboratorsService: CollaboratorsService, private route: ActivatedRoute ) {

    this.sharedService.getContacts().subscribe(data => {
      this.contactsList = data;
      this.addContactName(this.contactsList);
      this.collaboratorsService.getWorkOrders().subscribe(res => {

        this.workOrdersList = res.results;
        this.workOrdersList.forEach(element => {
          element.startDate = moment(element.startDate).format('MMMM DD, YYYY');
          element.contactName = this.getContactNameFromId(element.contactId);
          element.barInfo = {
            title: element.completion + '%',
            completeness: element.completion
          };
        });
        console.log('work order list: ', this.workOrdersList);
      });

    });

  }

  ngOnInit() {
  }

  getStatus() {
  }

  redirectTo(id) {
    this.router.navigate(['../collaboration/order-profile', {id: id}]);
  }

  sortArray(field) {
    const cmp = this;
    cmp.sortScoreClicked = ! cmp.sortScoreClicked;
    if (!cmp.sortScoreClicked) {
      this.workOrdersInfo.sort( function(name1, name2) {
        if ( name1[field] < name2[field] ) {
          return -1;
        } else if ( name1[field] > name2[field]) {
          return 1;
        } else {
          return 0;
        }
      });
    } else {
      this.workOrdersInfo.reverse();
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

  sortStarteDateArray(field) {
    const cmp = this;
    cmp.sortScoreClicked = ! cmp.sortScoreClicked;
    if (!cmp.sortScoreClicked) {
      this.workOrdersInfo.sort( function(name1, name2) {
        if ( Date.parse(name1[field]) < Date.parse(name2[field]) ) {
          return -1;
        } else if ( Date.parse(name1[field]) > Date.parse(name2[field])) {
          return 1;
        } else {
          return 0;
        }
      });
    } else {
      this.workOrdersInfo.reverse();
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

}

