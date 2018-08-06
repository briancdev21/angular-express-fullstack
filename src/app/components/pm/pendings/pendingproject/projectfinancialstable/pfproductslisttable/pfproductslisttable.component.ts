import { Component, Input, Output, OnInit, HostListener, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { FilterService } from '../filter.service';
import { SharedService } from '../../../../../../services/shared.service';
import { ProductsService } from '../../../../../../services/inventory/products.service';
import { ProjectsService } from '../../../../../../services/projects.service';
import { CompleterService, CompleterData } from 'ng2-completer';
import * as _ from 'lodash';
import { PmService } from '../../../../pm.service';

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
  showModal = false;
  switchIcon = false;
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
  skuListCd: CompleterData;

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
  productNameListCd: CompleterData;
  modelNumberListCd: CompleterData;
  selectProduct: any;
  selectModel: any;
  selectBrand: any;
  selectSku: any;
  selectSkuName: any;
  selectPic: any;
  currentProjectId: any;
  inventoryQuantity: number;
  deletingItem: any;

  constructor( private filterService: FilterService,
    private sharedService: SharedService,
    private productService: ProductsService,
    private cdr: ChangeDetectorRef,
    private completerService: CompleterService,
    private projectsService: ProjectsService,
    private pmService: PmService ) {
      this.currentProjectId = localStorage.getItem('current_projectId');
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
    this.getBrandNameList();
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
    // this.productService.getProductsList().subscribe(res => {
    //   this.allProductList = res.results;
    //   console.log('allProductList: ', this.allProductList);
    //   if (res.results.length) {
    //     for (let i = 0; i < res.results.length; i++) {
    //       this.productNameList = this.productNameList.concat(res.results[i].name);
    //     }
    //     this.productNameList = Array.from(new Set(this.productNameList));
    //     this.productNameListCd = this.completerService.local(this.productNameList, 'name', 'name');
    //     console.log('removed duplicated element in productNameList: ', this.productNameList);
    //   }
    // });
    this.productService.getProductCatalog().subscribe(res => {
      this.allProductList = res.results;
      this.productNameListCd = this.completerService.local(this.allProductList, 'name', 'name');
      this.modelNumberListCd = this.completerService.local(this.allProductList, 'model', 'model');
      this.skuListCd = this.completerService.local(this.allProductList, 'sku', 'sku');
    });
  }

  getModelNumberList() {
    this.modelNumberList = [];
    if (this.selectProductName != '') {
      this.allProductList.forEach((item, index) => {
        if (item.name === this.selectProductName) {
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
    this.sharedService.getBrands().subscribe(res => {
      this.brandNameList = res.results.map(b => b.name);
    });
  }

  onSelectProductName(event) {
    this.selectProduct = event.originalObject;
    const limitedProducts = this.allProductList.filter(p => p.name === this.selectProduct.name);
    const existingSkuList = this.reservedInventoryList.map(i => i.sku);
    this.skuListCd = this.completerService.local(limitedProducts, 'sku', 'sku');
    // this.getModelNumberList();
    // this.getBrandNameList();
  }

  onSelectModelNumber(event) {
    this.selectModel = event.originalObject;
  }

  onSelectBrandName(event) {
    this.selectBrand = event.originalObject;
  }

  onSelectSku(event) {
    this.selectSku = event.originalObject;
    this.selectProductName = event.originalObject.name;
    this.selectModelNumber = event.originalObject.model;
    const selectedProduct = this.getProductFromProductId(event.originalObject.productId);
    if (this.inventoryQuantity) {
      const savingData = {
        sku: event.originalObject.sku,
        quantity: this.inventoryQuantity
      };
      this.projectsService.createProjectProduct(this.currentProjectId, savingData).subscribe(res => {
        console.log('res: ', res);
        this.pmService.getProductsList(this.currentProjectId).subscribe(data => {
          this.reservedInventoryList = data.results;
          console.log('reservedInventoryList: ', this.reservedInventoryList);
        });
        this.addProduct = false;
      });
    }

  }

  saveInventory(qty) {
    if (this.selectSku) {
      const savingData = {
        sku: this.selectSku.sku,
        quantity: qty
      };
      this.projectsService.createProjectProduct(this.currentProjectId, savingData).subscribe(res => {
        console.log('res: ', res);
        this.pmService.getProductsList(this.currentProjectId).subscribe(data => {
          this.reservedInventoryList = data.results;
          console.log('reservedInventoryList: ', this.reservedInventoryList);
        });
        this.addProduct = false;
      });
    }
  }

  getProductFromProductId(id) {
    let selected: any;
    this.productService.getProductsList().subscribe(res => {
      const allProd = res.results;
      selected =  allProd.filter(p => p.id === id)[0];
      console.log('res: ', selected);
      this.selectBrandName = this.getBrandName(selected.brandId);
      this.selectPic = selected.pictureURI;
    });
    return selected;
  }

  swapRow(index, list) {
    // if (list[0].status === 'Place order') {
    //   this.swappingList = this.purchaseOrdersList;

    // }
    // this.clonedRowIndex = index;
    // this.orderModalInfoCollapsed[index] = false;
    // this.showOrderModalInfo = false;
    // this.showCloneConfirmModal = true;
  }

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

  confirmSwap() {
    // this.swappingList.splice(this.clonedRowIndex, 0, this.clonedRow);
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

