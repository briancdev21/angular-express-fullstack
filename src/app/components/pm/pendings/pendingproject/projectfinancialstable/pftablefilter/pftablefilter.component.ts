import { Component, ChangeDetectorRef, Input, OnInit, HostListener, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import * as _ from 'lodash';
import { FilterService } from '../filter.service';


@Component({
  selector: 'app-pftablefilter',
  templateUrl: './pftablefilter.component.html',
  styleUrls: [
    './pftablefilter.component.css',
  ],
  providers: [FilterService]
})


export class PfTableFilterComponent implements OnInit {

  @Input() reservedInventoryList;
  @Input() purchaseOrdersList;
  @Input() productNameList;
  @Input() supplierList;
  @Input() statusList;
  @Input() brandsList;
  @Input() tagsList;
  @Output() filterParent: EventEmitter<any> = new EventEmitter;

  public originFilters;
  selectProductName = '';
  selectSupplier = '';
  selectStatus = '';
  selectBrand = '';
  applyClicked = false;
  filters = {};
  config2: any = {'placeholder': 'Type here', 'sourceField': ''};
  items2 = ['tag1', 'tag2'];
  inputChange: any = [];
  filteredOrdersList = [];
  backUpOrdersList = [];
  filteredInventoryList = [];
  backUpInventoryList = [];
  selectedItem: any = '';

  constructor( private filterService: FilterService, private ref: ChangeDetectorRef ) {
  }

  ngOnInit() {
    this.filteredOrdersList = this.purchaseOrdersList;
    this.backUpOrdersList = this.purchaseOrdersList;
    this.filteredInventoryList = this.reservedInventoryList;
    this.backUpInventoryList = this.reservedInventoryList;
  }

  onInputChangedEvent(val: string) {
    this.inputChange = val;
  }

  onSelectSupplier(event) {
    this.selectSupplier = event;
  }

  onSelectProduct(event) {
    this.selectProductName = event;
  }

  onSelectStatus(event) {
    this.selectStatus = event;
  }

  onSelectBrand(event) {
    this.selectBrand = event;
  }

  onSelectTag(item) {
    this.selectedItem = item;
    this.items2 = this.items2.filter(function (obj){
      return obj !== item;
    });
    this.tagsList.push(item);
  }

  removeTag(i: number) {
    const item = this.tagsList[i];
    this.items2.push(item);
    this.tagsList.splice(i, 1);
  }

  filterTxt (arr, searchKey) {
    return arr.filter(function(obj){
      return Object.keys(obj).some(function(key) {
        return obj[key].includes(searchKey);
      });
    });
  }

  resetFilter() {
    console.log('reset');
    this.selectProductName = this.selectBrand = this.selectStatus = this.selectSupplier = '';
    this.tagsList = [];
    this.purchaseOrdersList = this.backUpOrdersList;
    this.reservedInventoryList = this.backUpInventoryList;
    this.ref.detectChanges();
  }

  applyFilter() {
    this.applyClicked = true;
    this.filteredOrdersList = this.backUpOrdersList;
    this.filteredInventoryList = this.backUpInventoryList;
    if (this.selectProductName) {
      this.filteredOrdersList = this.filteredOrdersList.filter(order => order.productName === this.selectProductName);
      this.filteredInventoryList = this.filteredInventoryList.filter(inventory => inventory.productName === this.selectProductName);
    }

    if (this.selectSupplier) {
      this.filteredOrdersList = this.filteredOrdersList.filter(order => order.supplier === this.selectSupplier);
    }

    if (this.selectStatus) {
      this.filteredOrdersList = this.filteredOrdersList.filter(order => order.status === this.selectStatus);
      this.filteredInventoryList = this.filteredInventoryList.filter(inventory => inventory.status === this.selectStatus);
    }

    if (this.selectBrand) {
      this.filteredOrdersList = this.filteredOrdersList.filter(order => order.brand === this.selectBrand);
      this.filteredInventoryList = this.filteredInventoryList.filter(inventory => inventory.brand === this.selectBrand);
    }

    if (this.tagsList[0]) {
      let orderTagFiltered = [];
      let orderTagFilteredList = [];
      let inventoryTagFiltered = [];
      let inventoryTagFilteredList = [];
      for (let i = 0; i <= this.tagsList.length - 1; i ++) {
        orderTagFiltered = this.filterTxt(this.purchaseOrdersList, this.tagsList[i]);
        orderTagFilteredList = orderTagFilteredList.concat(orderTagFiltered);
        inventoryTagFiltered = this.filterTxt(this.purchaseOrdersList, this.tagsList[i]);
        inventoryTagFilteredList = inventoryTagFilteredList.concat(inventoryTagFiltered);
      }
      this.filteredOrdersList = orderTagFilteredList;
      this.filteredInventoryList = inventoryTagFilteredList;
    }

    console.log('filtered: ', this.filteredOrdersList);
    this.filterParent.emit({
      filteredOrders: this.filteredOrdersList, filteredInventories: this.filteredInventoryList, clicked: this.applyClicked
    });
  }

}
