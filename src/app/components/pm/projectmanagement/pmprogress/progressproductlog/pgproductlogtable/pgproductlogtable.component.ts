import { Component, Input, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { FilterService } from '../filter.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-pgproductlogtable',
  templateUrl: './pgproductlogtable.component.html',
  styleUrls: [
    './pgproductlogtable.component.css',
  ],
  providers: [FilterService]
})


export class PgProductLogTableComponent implements OnInit {

  @Input() reservedInventoryList;
  @Input() purchaseOrdersList;
  addLogModalCollapsed = true;
  showAddLogModal = false;
  showOrderModalInfo = false;
  orderModalInfoCollapsed = [];
  inventoryModalInfoCollapsed = [];
  sortClicked = true;
  clicked = false;
  sortScoreClicked = true;
  showModal: boolean = false;
  switchIcon: boolean = false;
  showCloneConfirmModal = false;
  showDeleteConfirmModal = false;
  clonedRow: any;
  clonedRowIndex: number;
  deletingRowIndex: number;
  deletingList = [];
  swappingList = [];
  showSwapConfirmModal = false;

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

  openOrderModal(index) {
    this.orderModalInfoCollapsed[index] = true;
  }

  openInventoryModal(index) {
    this.inventoryModalInfoCollapsed[index] = true;
  }

  sortArray(field, list) {
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

  // addNewTimelineItem() {
  //   const date = new Date();
  //   const today = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

  //   const nitem = {
  //     title: this.activity.title,
  //     content: this.activity.content,
  //     icon: 'fa fa-home',
  //     timelineBtnColor: 'green-btn',
  //     buttontitle: 'More Info',
  //     date: today,
  //     buttonClickEventHandlerName: 'getMoreInfo',
  //     subject: this.activity.subject,
  //     contact: this.activity.contact
  //   };

  //   switch (nitem.title) {
  //     case 'Notes':
  //       nitem.icon = 'fa-file-text-o';
  //       break;
  //     case 'Email':
  //       nitem.icon = 'fa fa-envelope-o';
  //     break;
  //     case 'Call':
  //       nitem.icon = 'fa fa-phone';
  //     break;
  //     default:
  //       nitem.icon = 'fa fa-home';
  //       break;
  //   }
  // }

  swapRow(index, list) {
    // if (list[0].status === 'Place order') {
    //   this.swappingList = this.purchaseOrdersList;

    // }
    // this.clonedRowIndex = index;
    // this.orderModalInfoCollapsed[index] = false;
    // this.showOrderModalInfo = false;
    // this.showCloneConfirmModal = true;
  }

  deleteRow(index, list) {
    if (list[0].status === 'Place order') {
      this.deletingList = this.purchaseOrdersList;
      this.orderModalInfoCollapsed[index] = false;
      this.deletingRowIndex = index;
    } else {
      this.deletingList = this.reservedInventoryList;
      this.inventoryModalInfoCollapsed[index] = false;
      this.deletingRowIndex = index;
    }
    this.showDeleteConfirmModal = true;
  }

  confirmSwap() {
    // this.swappingList.splice(this.clonedRowIndex, 0, this.clonedRow);
  }

  confirmDelete() {
    if (this.deletingList[0].status === 'Place order') {
      this.purchaseOrdersList.splice(this.deletingRowIndex, 1);
    } else {
      this.reservedInventoryList.splice(this.deletingRowIndex, 1);
    }
  }
}

