import { Component, Input, Output, OnInit, HostListener, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { FilterService } from '../filter.service';
import { SharedService } from '../../../../../../services/shared.service';
import { ProductsService } from '../../../../../../services/inventory/products.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-pfproductslisttable',
  templateUrl: './pfproductslisttable.component.html',
  styleUrls: [
    './pfproductslisttable.component.css',
  ],
  providers: [FilterService]
})


export class PfProductsListTableComponent implements OnInit {

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

  addProduct = false;
  allProductList = [];
  productNameList = [];
  modelNumberList = [];
  brandNameList = [];
  skuList = [];

  selectProductName = '';
  selectModelNumber = '';
  selectBrandName = '';

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
  constructor( private filterService: FilterService,
    private sharedService: SharedService,
    private productService: ProductsService,
    private cdr: ChangeDetectorRef ) {

  }

  ngOnInit() {
    this.sharedService.getBrands().subscribe(res => {
      this.brandsList = res.results;
      console.log('brandslist: ', res);
    });

    this.sharedService.getSuppliers().subscribe(res => {
      this.supplierList = res.results;
      console.log('supplierList: ', res);
    });

    this.getProductNameList();
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

  getProductPicture() {

  }

  getProductNameList() {
    this.productService.getProductsList().subscribe(res => {
      this.allProductList = res.results;
      console.log('allProductList: ', this.allProductList);
      if(res.results.length) {
        for(let i = 0; i < res.results.length; i++) {
          this.productNameList = this.productNameList.concat(res.results[i].name);
          console.log('productNameList: ', this.productNameList);
        }
        this.productNameList = Array.from(new Set(this.productNameList));
        console.log('removed duplicated element in productNameList: ', this.productNameList);
      }
    });
  }

  getModelNumberList() {
    this.modelNumberList = [];
    if(this.selectProductName != '') {
      this.allProductList.forEach((item, index) => {
        if(item.name == this.selectProductName) {
          this.modelNumberList = this.modelNumberList.concat(item.model);
        }
      });
      this.modelNumberList = Array.from(new Set(this.modelNumberList));
      console.log('removed duplicated element in modelNumberList: ', this.modelNumberList);
      this.cdr.detectChanges();
    }
  }

  getBrandNameList() {
    this.brandNameList = [];
    if(this.selectProductName != '') {
      this.allProductList.forEach((item, index) => {
        if(item.name == this.selectProductName) {
          this.brandNameList = this.brandNameList.concat(this.getBrandName(item.brandId));
        }
      });
      this.brandNameList = Array.from(new Set(this.brandNameList));
      console.log('removed duplicated element in brandNameList: ', this.brandNameList);
      this.cdr.detectChanges();
    }
  }

  onSelectProductName(event) {
    this.selectProductName = event;
    this.getModelNumberList();
    this.getBrandNameList();
  }

  onSelectModelNumber(event) {
    this.selectModelNumber = event;
    console.log('selectModelNumber ', this.selectModelNumber);
  }

  onSelectBrandName(event) {
    this.selectBrandName = event;
    console.log('selectBrandName ', this.selectBrandName);
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

