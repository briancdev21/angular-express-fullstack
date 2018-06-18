import { Component, Input, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { FilterService } from '../filter.service';
import * as _ from 'lodash';
import { HorizontalBarComponent } from '../../../common/horizontalbar/horizontalbar.component';
import { SharedService } from '../../../../services/shared.service';
import { CrmService } from '../../../../services/crm.service';
import * as moment from 'moment';

@Component({
  selector: 'app-proposallisttable',
  templateUrl: './proposallisttable.component.html',
  styleUrls: [
    './proposallisttable.component.css',
  ],
  providers: [FilterService],
})


export class ProposalListTableComponent implements OnInit {

  @Input() proposalListInfo;
  public barInfo: any;
  sortClicked = true;
  clicked = false;
  sortScoreClicked = true;
  contactsList: any;

  constructor( private filterService: FilterService, private router: Router, private sharedService: SharedService,
    private crmService: CrmService ) {
    // this.crmService.getIndividualContact(id).subscribe(res => {
    //   this.contactsList = res;
    //   console.log('contactsList: ', res);
    // });
  }

  ngOnInit() {
    this.proposalListInfo.map(i => i.barInfo = {
      title: i.completion + '%',
      completeness: i.completion
    });
  }

  getStatus() {
  }

  redirectTo(id) {
    this.router.navigate(['../sales/proposal-details', {id: id}]);
  }

  sortArray(field) {
    const cmp = this;
    cmp.sortScoreClicked = ! cmp.sortScoreClicked;
    if (!cmp.sortScoreClicked) {
      this.proposalListInfo.sort( function(name1, name2) {
        if ( name1[field] < name2[field] ) {
          return -1;
        } else if ( name1[field] > name2[field]) {
          return 1;
        } else {
          return 0;
        }
      });
    } else {
      this.proposalListInfo.reverse();
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

  getContactName(id) {
    const selectedContact = this.contactsList.filter(c => c.id === id)[0];
    return selectedContact.person.firstName + ' ' + selectedContact.person.lastName ;
  }

  sortCreateDateArray(field) {
    const cmp = this;
    cmp.sortScoreClicked = ! cmp.sortScoreClicked;
    if (!cmp.sortScoreClicked) {
      this.proposalListInfo.sort( function(name1, name2) {
        if ( Date.parse(name1[field]) < Date.parse(name2[field]) ) {
          return -1;
        } else if ( Date.parse(name1[field]) > Date.parse(name2[field])) {
          return 1;
        } else {
          return 0;
        }
      });
    } else {
      this.proposalListInfo.reverse();
    }
  }

  getDateColor(days) {
    return days <= 6 ? 'green' : days <= 14 ? 'orange' : 'red';
  }

  dateFormatChanged(date) {
    return moment(date).format('YYYY-MM-DD');
  }

}

