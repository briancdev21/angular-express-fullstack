import { Component, Input, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { FilterService } from '../filter.service';
import * as _ from 'lodash';
import { CrmService } from '../../../../services/crm.service';
import * as moment from 'moment';
import { SharedService } from '../../../../services/shared.service';

@Component({
  selector: 'app-leadslisttable',
  templateUrl: './leadslisttable.component.html',
  styleUrls: [
    './leadslisttable.component.css',
  ],
  providers: [FilterService]
})


export class LeadsListTableComponent implements OnInit {

  @Input() leadsListInfo;
  addLogModalCollapsed = true;
  showAddLogModal = false;
  showLeadModalInfo = false;
  leadModalInfoCollapsed = [];
  sortClicked = true;
  clicked = false;
  sortScoreClicked = true;
  showModal = false;
  switchIcon = false;
  showCloneConfirmModal = false;
  showDeleteConfirmModal = false;
  clonedRowLead: any;
  clonedRowIndex: number;
  deletedRowIndex: number;
  sortLeadStatusArr: any;
  currentLeadId: any;
  contactsList: any;

  activity: {
    title: string;
    subject: string;
    contact: string;
    content: string;
  };

  upcomingModal: any = {
    week: 'WEDNESDAY',
    date: 'NOVEMBER 1, 2017',
    start: '9:30 AM',
    end: '11:00 AM',
    duration: '1 hr, 30 min'
  };
  constructor( private filterService: FilterService, private router: Router, private crmService: CrmService,
     private sharedService: SharedService ) {
    this.sharedService.getContacts().subscribe(res => {
      this.contactsList = res;
    });
  }

  ngOnInit() {
    this.activity = {
      title: 'NOTE',
      subject: undefined,
      contact: undefined,
      content: ''
    };
  }

  tabChanged(event) {
    this.activity.title = event.tabTitle;
  }

  selectedFilterEventHandler(filteredList) {
  }

  getScoreColor(score) {
    return score >= 65 ? 'green' : score >= 35 ? 'orange' : 'red';
  }

  getDateColor(value) {
    return value === 'Follow-up' ? 'orange' : value === 'Lost' ? 'orange' : 'green';
  }

  openLeadModal(index) {
     this.leadModalInfoCollapsed[index] = true;

  }

  openLog(lead, i) {
    this.addLogModalCollapsed = false;
    this.showAddLogModal = true;
    this.leadModalInfoCollapsed[i] = false;
    this.showLeadModalInfo = false;
    this.currentLeadId = lead.id;
  }

  sortArray(field) {
    const cmp = this;
    cmp.sortScoreClicked = ! cmp.sortScoreClicked;
    if (!cmp.sortScoreClicked) {
      this.leadsListInfo.sort( function(name1, name2) {
        if ( name1[field] < name2[field] ) {
          return -1;
        } else if ( name1[field] > name2[field]) {
          return 1;
        } else {
          return 0;
        }
      });
    } else {
      this.leadsListInfo.reverse();
    }
  }

  sortCreateDateArray(field) {
    const cmp = this;
    cmp.sortScoreClicked = ! cmp.sortScoreClicked;
    if (!cmp.sortScoreClicked) {
      this.leadsListInfo.sort( function(name1, name2) {
        if ( Date.parse(name1[field]) < Date.parse(name2[field]) ) {
          return -1;
        } else if ( Date.parse(name1[field]) > Date.parse(name2[field])) {
          return 1;
        } else {
          return 0;
        }
      });
    } else {
      this.leadsListInfo.reverse();
    }
  }

  SortLeadStatus() {
    const cmp = this;
    cmp.sortScoreClicked = ! cmp.sortScoreClicked;
    if (!cmp.sortScoreClicked) {
      this.sortLeadStatusArr = this.leadsListInfo.filter(lead => lead.status === 'New');
      this.sortLeadStatusArr.push(this.leadsListInfo.filter(lead => lead.status === 'Follow-up'));
      this.sortLeadStatusArr.push(this.leadsListInfo.filter(lead => lead.status === 'Seen'));
      this.sortLeadStatusArr.push(this.leadsListInfo.filter(lead => lead.status === 'Demo'));
      this.sortLeadStatusArr.push(this.leadsListInfo.filter(lead => lead.status === 'Negotiation'));
      this.sortLeadStatusArr.push(this.leadsListInfo.filter(lead => lead.status === 'Won'));
      this.sortLeadStatusArr.push(this.leadsListInfo.filter(lead => lead.status === 'Lost'));
      this.leadsListInfo = _.flatten(this.sortLeadStatusArr);
    } else {
      this.leadsListInfo.reverse();
    }
  }


  addNewTimelineItem() {
    const date = new Date();
    const today = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

    const nitem = {
      title: this.activity.title,
      content: this.activity.content,
      icon: 'fa fa-home',
      timelineBtnColor: 'green-btn',
      buttontitle: 'More Info',
      date: today,
      buttonClickEventHandlerName: 'getMoreInfo',
      subject: this.activity.subject,
      contact: this.activity.contact
    };

    switch (nitem.title) {
      case 'NOTE':
        nitem.icon = 'fa-file-text-o';
        nitem.timelineBtnColor = 'lime-btn';
        break;
      case 'EMAIL':
        nitem.icon = 'fa fa-envelope-o';
        nitem.timelineBtnColor = 'orangered-btn';
      break;
      case 'CALL':
        nitem.icon = 'fa fa-phone';
        nitem.timelineBtnColor = 'orange-btn';
      break;
      default:
        nitem.icon = 'fa fa-home';
        break;
    }

    const savingActivityInfo = {
      'contactId':  nitem.contact ? parseInt(nitem.contact, 10) : undefined,
      'emailSubject': nitem.subject,
      'leadId': this.currentLeadId,
      'type': nitem.title,
      'detail': nitem.content
    };

    this.crmService.createLeadActivity(this.currentLeadId, savingActivityInfo).subscribe( res => {
    });
    this.activity.subject = undefined;
  }

  cloneRow(lead, index) {
    this.clonedRowIndex = index;
    lead.lastContacted = moment(lead.lastContacted).format('YYYY-MM-DD');
    lead.socialMediaUrl =  {
      'linkedIn': 'string',
      'facebook': 'string',
      'twitter': 'string'
    };

    // Remove empty/null field from object.
    Object.keys(lead).forEach((key) => (lead[key] == null) && delete lead[key]);
    Object.keys(lead.person).forEach((key) => (lead.person[key] == null) && delete lead.person[key]);
    Object.keys(lead.phoneNumbers).forEach((key) => (lead.phoneNumbers[key] == null) && delete lead.phoneNumbers[key]);
    this.clonedRowLead = lead;
    this.leadModalInfoCollapsed[index] = false;
    this.showLeadModalInfo = false;
    this.showCloneConfirmModal = true;
  }

  deleteRow(lead, index) {
    this.deletedRowIndex = lead.id;
    this.leadModalInfoCollapsed[index] = false;
    this.showLeadModalInfo = false;
    this.showDeleteConfirmModal = true;
  }

  confirmClone() {
    // this.leadsListInfo.splice(this.clonedRowIndex, 0, this.clonedRowLead);
    this.crmService.createLead(JSON.stringify(this.clonedRowLead)).subscribe(res => {
      this.crmService.getLeadsList().subscribe(data => {
        this.leadsListInfo = data.results;
      });
    });
  }

  confirmDelete() {
    this.crmService.deleteIndividualLead(this.deletedRowIndex).subscribe(res => {
      this.crmService.getLeadsList().subscribe(data => {
        this.leadsListInfo = data.results;
      });
    });
  }

  convertToContact(lead) {
    this.crmService.convertLeadToContact(lead.id).subscribe(res => {
      console.log('converted: ', res);
      this.crmService.getLeadsList().subscribe(data => {
        this.leadsListInfo = data.results;
      });
    });
  }

  redirectTo(id) {
    // this.router.navigate(['../lead/' + id]);
    this.router.navigate(['./crm/lead-profile', {id: id}]);
  }

  formatPhoneNumber(s) {
    const s2 = ('' + s).replace(/\D/g, '');
    const m = s2.match(/^(\d{3})(\d{3})(\d{4})$/);
    return (!m) ? null : '(' + m[1] + ') ' + m[2] + '-' + m[3];
  }

  changeDateFormat(dt) {
    const date = moment(dt).format('MMMM DD, YYYY');
    return date;
  }
}

