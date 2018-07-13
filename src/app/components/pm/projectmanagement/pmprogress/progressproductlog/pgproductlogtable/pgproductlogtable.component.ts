import { Component, Input, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { FilterService } from '../filter.service';
import { SharedService } from '../../../../../../services/shared.service';
import * as _ from 'lodash';
import { ProjectsService } from '../../../../../../services/projects.service';
import { PmService } from '../../../../pm.service';

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
  brandsList: any;
  supplierList: any;
  deletingItem: any;

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
  currentProjectId: any;
  constructor( private filterService: FilterService, private sharedService: SharedService, private projectsService: ProjectsService,
    private pmService: PmService ) {
    this.currentProjectId = localStorage.getItem('current_projectId');
    this.sharedService.getBrands().subscribe(res => {
      this.brandsList = res.results;
      console.log('brandslist: ', res);
    });

    this.sharedService.getSuppliers().subscribe(res => {
      this.supplierList = res.results;
      console.log('supplierList: ', res);
    });
  }

  ngOnInit() {
  }

  selectedFilterEventHandler(filteredList) {
  }

  getBrandName(id) {
    const selectedBrand = this.brandsList.filter(b => b.id === id)[0];
    return selectedBrand.name;
  }

  getSupplierName(id) {
    const selectedSupplier = this.supplierList.filter(b => b.id === id)[0];
    return selectedSupplier.name;
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

  deleteRow(index, list, item) {
    this.deletingItem = item;
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

  confirmDelete() {
    if (this.deletingList[0].status === 'Place order') {
      this.purchaseOrdersList.splice(this.deletingRowIndex, 1);
    } else {
      // this.reservedInventoryList.splice(this.deletingRowIndex, 1);
      this.projectsService.deleteIndividualProjectProduct(this.currentProjectId, this.deletingItem.id).subscribe(res => {
        console.log('deleted: ', res);
        this.pmService.getProductsList(this.currentProjectId).subscribe(data => {
          this.reservedInventoryList = data.results;
          console.log('reservedInventoryList: ', this.reservedInventoryList);
        });
      });
    }
  }

  updateInventoryQuantity(product) {
    const updatingQty = {
      quantity: product.reservedQuantity
    };
    this.projectsService.updateIndividualProjectProduct(this.currentProjectId, product.id, updatingQty).subscribe(res => {
      console.log('updated: ', res);
    });
  }
}

