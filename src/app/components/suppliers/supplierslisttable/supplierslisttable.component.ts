import { Component, Input, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { FilterService } from '../filter.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-supplierslisttable',
  templateUrl: './supplierslisttable.component.html',
  styleUrls: [
    './supplierslisttable.component.css',
  ],
  providers: [FilterService],
})


export class SuppliersListTableComponent implements OnInit {

  @Input() suppliersListInfo;
  addLogModalCollapsed = true;
  showAddLogModal = false;
  showSupplierModalInfo = false;
  supplierModalInfoCollapsed = [];
  sortClicked = true;
  clicked = false;
  sortScoreClicked = true;
  showModal: boolean = false;
  switchIcon: boolean = false;
  showCloneConfirmModal = false;
  showDeleteConfirmModal = false;
  clonedRowSupplier: any;
  clonedRowIndex: number;
  deletedRowIndex: number;
  sortSupplierTermArr: any;
  clickSettingCount = 0;
  expandedInfoModal = false;
  phoneClicked = false;
  emailClicked = false;
  mapClicked = false;
  formatedPhone = '';

  activity: {
    title: string;
    subject: string;
    supplier: string;
    content: string;
  };

  upcomingModal: object = {
    week: 'WEDNESDAY',
    date: 'NOVEMBER 1, 2017',
    start: '9:30 AM',
    end: '11:00 AM',
    duration: '1 hr, 30 min'
  };
  constructor( private filterService: FilterService, private router: Router ) {
  }

  ngOnInit() {
  }

  redirectTo(id) {
    this.router.navigate(['../profile/' + id]);
  }

  selectedFilterEventHandler(filteredList) {
  }

  getScoreColor(score) {
    return score >= 65 ? 'green' : score >= 35 ? 'orange' : 'red';
  }

  getDateColor(value) {
    return value === 'Follow-up' ? 'orange' : value === 'Lost' ? 'orange' : 'green';
  }

  openSupplierModal(index) {
    this.clickSettingCount ++;
    // switch (this.clickSettingCount % 3) {
    //   case 0: this.supplierModalInfoCollapsed[index] = false;
    //   break;
    //   case 1: this.supplierModalInfoCollapsed[index] = true;
    //   break;
    //   default: this.supplierModalInfoCollapsed[index] = true;
    //   break;
    // }
    this.supplierModalInfoCollapsed[index] = true;
  }

  sortArray(field) {
    const cmp = this;
    cmp.sortScoreClicked = ! cmp.sortScoreClicked;
    if (!cmp.sortScoreClicked) {
      this.suppliersListInfo.sort( function(name1, name2) {
        if ( name1[field] < name2[field] ) {
          return -1;
        } else if ( name1[field] > name2[field]) {
          return 1;
        } else {
          return 0;
        }
      });
    } else {
      this.suppliersListInfo.reverse();
    }
  }

  sortGeneralList(field, list) {
    const cmp = this;
    cmp.sortScoreClicked = ! cmp.sortScoreClicked;
    if (!cmp.sortScoreClicked) {
      list.sort( function(name1, name2) {
        if ( name1[field] < name2[field] ) {
          return -1;
        } else if ( name1[field] > name2[field]) {
          return 1;
        } else {
          return 0;
        }
      });
    } else {
      list.reverse();
    }
  }

  sortStateArray(state) {
    const cadList = this.suppliersListInfo.filter(s => s.country === 'Canada');
    this.sortGeneralList('state', cadList);
    const usaList = this.suppliersListInfo.filter(s => s.country === 'USA');
    this.sortGeneralList('state', usaList);
    this.suppliersListInfo = cadList.concat(usaList);
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
      supplier: this.activity.supplier
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

  cloneRow(supplier, index) {
    this.clonedRowIndex = index;
    this.clonedRowSupplier = supplier;
    this.supplierModalInfoCollapsed[index] = false;
    this.showSupplierModalInfo = false;
    this.showCloneConfirmModal = true;
  }

  deleteRow(index) {
    this.deletedRowIndex = index;
    this.supplierModalInfoCollapsed[index] = false;
    this.showSupplierModalInfo = false;
    this.showDeleteConfirmModal = true;
  }

  confirmClone() {
    this.suppliersListInfo.splice(this.clonedRowIndex, 0, this.clonedRowSupplier);
  }

  confirmDelete() {
    this.suppliersListInfo.splice(this.deletedRowIndex, 1);
  }

  clickOutsideInfo(i) {
    this.supplierModalInfoCollapsed[i] = false;
    this.showSupplierModalInfo = false;
    this.phoneClicked = false;
    this.emailClicked = false;
  }

  phoneClick(supplier) {
    this.phoneClicked = true;
    this.emailClicked = false;
    this.expandedInfoModal = false;
    this.formatedPhone = this.formatPhoneNumber(supplier.supplierPhone);
  }

  emailClick() {
    this.phoneClicked = false;
    this.emailClicked = true;
    this.expandedInfoModal = false;
  }

  mapClick(task) {}

  expandSupplierModal(index) {
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

