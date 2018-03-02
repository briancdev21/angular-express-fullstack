import { Component, Input, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { FilterService } from '../filter.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-contactslisttable',
  templateUrl: './contactslisttable.component.html',
  styleUrls: [
    './contactslisttable.component.css',
  ],
  providers: [FilterService],
})


export class ContactsListTableComponent implements OnInit {

  @Input() contactsListInfo;
  addLogModalCollapsed = true;
  showAddLogModal = false;
  showContactModalInfo = false;
  contactModalInfoCollapsed = [];
  sortClicked = true;
  clicked = false;
  sortScoreClicked = true;
  showModal: boolean = false;
  switchIcon: boolean = false;
  showCloneConfirmModal = false;
  showDeleteConfirmModal = false;
  clonedRowContact: any;
  clonedRowIndex: number;
  deletedRowIndex: number;
  sortContactStatusArr: any;
  clickSettingCount = 0;
  expandedInfoModal = false;
  phoneClicked = false;
  emailClicked = false;
  mapClicked = false;
  formatedPhone = '';

  activity: {
    title: string;
    subject: string;
    contact: string;
    content: string;
  };

  upcomingModal: object = {
    week: 'WEDNESDAY',
    date: 'NOVEMBER 1, 2017',
    start: '9:30 AM',
    end: '11:00 AM',
    duration: '1 hr, 30 min'
  };
  constructor( private filterService: FilterService ) {
  }

  ngOnInit() {
  }

  selectedFilterEventHandler(filteredList) {
  }

  getScoreColor(score) {
    return score >= 65 ? 'green' : score >= 35 ? 'orange' : 'red';
  }

  getDateColor(value) {
    return value === 'Follow-up' ? 'orange' : value === 'Lost' ? 'orange' : 'green';
  }

  openContactModal(index) {
    this.clickSettingCount ++;
    // switch (this.clickSettingCount % 3) {
    //   case 0: this.contactModalInfoCollapsed[index] = false;
    //   break;
    //   case 1: this.contactModalInfoCollapsed[index] = true;
    //   break;
    //   default: this.contactModalInfoCollapsed[index] = true;
    //   break;
    // }
    this.contactModalInfoCollapsed[index] = true;
  }

  sortArray(field) {
    const cmp = this;
    cmp.sortScoreClicked = ! cmp.sortScoreClicked;
    if (!cmp.sortScoreClicked) {
      this.contactsListInfo.sort( function(name1, name2) {
        if ( name1[field] < name2[field] ) {
          return -1;
        } else if ( name1[field] > name2[field]) {
          return 1;
        } else {
          return 0;
        }
      });
    } else {
      this.contactsListInfo.reverse();
    }
  }

  sortRatingArray(field) {
    const cmp = this;
    cmp.sortScoreClicked = ! cmp.sortScoreClicked;
    if (!cmp.sortScoreClicked) {
      this.contactsListInfo.sort( function(name1, name2) {
        if ( Number(name1[field]) < Number(name2[field]) ) {
          return -1;
        } else if ( Number(name1[field]) > Number(name2[field])) {
          return 1;
        } else {
          return 0;
        }
      });
    } else {
      this.contactsListInfo.reverse();
    }
  }

  sortDealsArray(field) {
    const cmp = this;
    cmp.sortScoreClicked = ! cmp.sortScoreClicked;
    if (!cmp.sortScoreClicked) {
      this.contactsListInfo.sort( function(name1, name2) {
        if ( name1[field] < name2[field] ) {
          return -1;
        } else if ( name1[field] > name2[field]) {
          return 1;
        } else {
          return 0;
        }
      });
    } else {
      this.contactsListInfo.reverse();
    }
  }

  // SortContactStatus() {
  //   const cmp = this;
  //   cmp.sortScoreClicked = ! cmp.sortScoreClicked;
  //   if (!cmp.sortScoreClicked) {
  //     this.sortContactStatusArr = this.contactsListInfo.filter(contact => contact.status === 'New');
  //     this.sortContactStatusArr.push(this.contactsListInfo.filter(contact => contact.status === 'Follow-up'));
  //     this.sortContactStatusArr.push(this.contactsListInfo.filter(contact => contact.status === 'Seen'));
  //     this.sortContactStatusArr.push(this.contactsListInfo.filter(contact => contact.status === 'Demo'));
  //     this.sortContactStatusArr.push(this.contactsListInfo.filter(contact => contact.status === 'Negotiation'));
  //     this.sortContactStatusArr.push(this.contactsListInfo.filter(contact => contact.status === 'Won'));
  //     this.sortContactStatusArr.push(this.contactsListInfo.filter(contact => contact.status === 'Lost'));
  //     this.contactsListInfo = _.flatten(this.sortContactStatusArr);
  //   } else {
  //     this.contactsListInfo.reverse();
  //   }
  // }


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
      case 'Notes':
        nitem.icon = 'fa-file-text-o';
        break;
      case 'Email':
        nitem.icon = 'fa fa-envelope-o';
      break;
      case 'Call':
        nitem.icon = 'fa fa-phone';
      break;
      default:
        nitem.icon = 'fa fa-home';
        break;
    }
  }

  cloneRow(contact, index) {
    this.clonedRowIndex = index;
    this.clonedRowContact = contact;
    this.contactModalInfoCollapsed[index] = false;
    this.showContactModalInfo = false;
    this.showCloneConfirmModal = true;
  }

  deleteRow(index) {
    this.deletedRowIndex = index;
    this.contactModalInfoCollapsed[index] = false;
    this.showContactModalInfo = false;
    this.showDeleteConfirmModal = true;
  }

  confirmClone() {
    this.contactsListInfo.splice(this.clonedRowIndex, 0, this.clonedRowContact);
  }

  confirmDelete() {
    this.contactsListInfo.splice(this.deletedRowIndex, 1);
  }

  clickOutsideInfo(i) {
    this.contactModalInfoCollapsed[i] = false;
    this.showContactModalInfo = false;
    this.phoneClicked = false;
    this.emailClicked = false;
  }

  phoneClick(contact) {
    this.phoneClicked = true;
    this.emailClicked = false;
    this.expandedInfoModal = false;
    this.formatedPhone = this.formatPhoneNumber(contact.phone);
  }

  emailClick() {
    this.phoneClicked = false;
    this.emailClicked = true;
    this.expandedInfoModal = false;
  }

  mapClick(task) {}

  expandContactModal(index) {
    this.phoneClicked = false;
    this.emailClicked = false;
    this.clickSettingCount ++;
    if (this.clickSettingCount % 2 === 1) {
      this.expandedInfoModal = false;
    } else {
      this.expandedInfoModal = true;
    }
  }

  formatPhoneNumber(s) {
    const s2 = ('' + s).replace(/\D/g, '');
    const m = s2.match(/^(\d{3})(\d{3})(\d{4})$/);
    return (!m) ? null : '(' + m[1] + ') ' + m[2] + '-' + m[3];
  }
}

