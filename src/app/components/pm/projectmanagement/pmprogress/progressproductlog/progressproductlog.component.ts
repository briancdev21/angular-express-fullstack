import { Component, OnInit } from '@angular/core';
import { CommonComponent } from '../../../../common/common.component';
import { FilterService } from './filter.service';
@Component({
  selector: 'app-progressproductlog',
  templateUrl: './progressproductlog.component.html',
  styleUrls: [
    './progressproductlog.component.css'
  ],
  entryComponents: [
    CommonComponent
  ],
  providers: [FilterService]
})
export class ProgressProductLogComponent implements OnInit {

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

  constructor( private filterService: FilterService ) {
    this.filterAvaliableTo = 'everyone';
  }

  public filters  = {

  };

  public purchaseOrdersList: Array<Object> = [
    {
      id: 0,
      imgUrl: 'assets/images/tickets.png',
      productName: `Home Controller 800`,
      supplier: 'Control4',
      brand: 'Control4',
      sku: '88021111',
      orderNumber: 'PO 3213423',
      qty: 2,
      status: 'Place order',
    },
    {
      id: 1,
      imgUrl: 'assets/images/tickets.png',
      productName: `Home Controller 250`,
      supplier: 'Control4',
      brand: 'Control4',
      sku: '88021112',
      orderNumber: 'PO 3213424',
      qty: 3,
      status: 'Place order',
    },
    {
      id: 2,
      imgUrl: 'assets/images/tickets.png',
      productName: `Low-Voltage Wired Keypad`,
      supplier: 'Control4',
      brand: 'Control4',
      sku: '88021115',
      orderNumber: 'PO 3213425',
      qty: 1,
      status: 'Place order',
    }
  ];

  public reservedInventoryList: Array<Object> = [
    {
      id: 0,
      imgUrl: 'assets/images/tickets.png',
      productName: '55" Smart LED TV',
      modelNumber: 'Best Buy',
      brand: 'Samsung',
      sku: '88021117',
      qty: 1,
      status: 'Reserved'
    },
    {
      id: 1,
      imgUrl: 'assets/images/tickets.png',
      productName: '2 Year Warranty',
      modelNumber: 'Service',
      brand: 'Nu Automations',
      sku: '88020001',
      qty: 3,
      status: 'Reserved'
    },
    {
      id: 2,
      imgUrl: 'assets/images/tickets.png',
      productName: 'Adaptive Phase Dimmer 120V',
      modelNumber: 'Control4',
      brand: 'Control4',
      sku: '88021113',
      qty: 2,
      status: 'Reserved'
    },
    {
      id: 3,
      imgUrl: 'assets/images/tickets.png',
      productName: 'Home Controller 800',
      modelNumber: 'Control4',
      brand: 'Control4',
      sku: '88021111',
      qty: 5,
      status: 'Reserved'
    },
  ];

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
}
