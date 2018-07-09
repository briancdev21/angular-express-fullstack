import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/finally';
import { CommonComponent } from '../../../common/common.component';
import { FilterService } from './filter.service';
import { PmService } from '../../pm.service';

@Component({
  selector: 'app-projectfinancialstable',
  templateUrl: './projectfinancialstable.component.html',
  styleUrls: [
    './projectfinancialstable.component.css'
  ],
  entryComponents: [
    CommonComponent
  ],
  providers: [FilterService]
})
export class ProjectFinancialsTableComponent implements OnInit {

  @Input() reservedInventoryList;
  @Input() purchaseOrdersList = [];
  menuCollapsed = true;
  saveFilterModalCollapsed = true;
  showSaveFilterModal = false;
  filterClicked = false;
  backUpLeads: any;
  openSavedFiltersList = false;
  savedFiltersListCollapsed = true;
  savedFiltersArr = [];
  filterAvaliableTo: any;
  filterName = '';
  currentProjectId: any;
  purchaseOrders: any;

  constructor( private filterService: FilterService, private pmService: PmService) {

    this.filterAvaliableTo = 'everyone';
    this.currentProjectId = localStorage.getItem('current_pending_projectId');

    this.pmService.getProductsList(this.currentProjectId).subscribe(res => {
      this.reservedInventoryList = res.results;
      console.log('reservedInventoryList: ', this.reservedInventoryList);
    });

    this.pmService.getPurchaseOrders(this.currentProjectId)
    .finally(() => this.getProducts())
    .subscribe(res => {
      this.purchaseOrders = res.results;
      console.log('purchaseOrders: ', this.purchaseOrders);
    });
  }

  getProducts() {
    for(let i = 0; i < this.purchaseOrders.length; i++) {
      this.pmService.getProductsListInPurchaseOrder(this.purchaseOrders[i].id).subscribe(res => {
        if(res.results.length) {
          this.purchaseOrdersList = this.purchaseOrdersList.concat(res.results);
          console.log('purchaseOrdersList: ', this.purchaseOrdersList);
        }
      });
    }
  }

  public filters  = {

  };

  public productNameList = [
    'Home Controller 800', 'Home Controller 250', 'Low-Voltage Wired Keypad', '55" Smart LED TV',
    '2 Year Warranty', 'Adaptive Phase Dimmer 120V'
  ];

  public supplierList = [
    'Control4', 'supplier test'
  ];

  statusList = [
    'Place order', 'Reserved'
  ];

  brandsList = [
    'Control4', 'Samsung', 'Nu Automation',
  ];

  tagsList = [
  ];

  ngOnInit() {
    // this.backUpLeads = this.leadsListInfo;
  }

  toggleMenubar(data: boolean) {
    this.menuCollapsed  = data;
  }

  getFilteredLists(val) {
    this.purchaseOrdersList = val.filteredOrders;
    this.reservedInventoryList = val.filteredInventories;
  }

  closeModal() {
  }

  onChangeAcailable(val) {
  }

  saveFilter() {
  }
}
