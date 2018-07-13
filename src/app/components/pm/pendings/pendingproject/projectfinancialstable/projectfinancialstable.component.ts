import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/finally';
import { CommonComponent } from '../../../../common/common.component';
import { FilterService } from './filter.service';
import { PmService } from '../../../pm.service';
import { SharedService } from '../../../../../services/shared.service';
import { ProductsService } from '../../../../../services/inventory/products.service';

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

  tagsList = [];
  public filters  = {};
  catalogsList: any;

  constructor( private filterService: FilterService, private pmService: PmService, private sharedService: SharedService,
    private productsService: ProductsService) {

    this.filterAvaliableTo = 'everyone';
    this.currentProjectId = localStorage.getItem('current_pending_projectId');

    this.productsService.getProductCatalog().subscribe(data => {
      this.catalogsList = data.results;
      this.pmService.getProductsList(this.currentProjectId).subscribe(res => {
        this.reservedInventoryList = res.results;
        this.reservedInventoryList.forEach(element => {
          const matchElement = this.catalogsList.filter(c => c.sku === element.sku)[0];
          element.imgUrl = matchElement.pictureURI;
        });
        console.log('reservedInventoryList11: ', this.reservedInventoryList, this.catalogsList);
      });

      this.pmService.getPurchaseOrders(this.currentProjectId)
      .finally(() => this.getProducts())
      .subscribe(res => {
        this.purchaseOrders = res.results;
        console.log('purchaseOrders: ', this.purchaseOrders);
      });
    });

  }

  getProducts() {
    for (let i = 0; i < this.purchaseOrders.length; i++) {
      this.pmService.getProductsListInPurchaseOrder(this.purchaseOrders[i].id).subscribe(res => {
        if (res.results.length) {
          this.purchaseOrdersList = this.purchaseOrdersList.concat(res.results);
          console.log('purchaseOrdersList: ', this.purchaseOrdersList);
          this.purchaseOrdersList.forEach(element => {
            const matchElement = this.catalogsList.filter(c => c.sku === element.sku)[0];
            element.imgUrl = matchElement.pictureURI;
          });
        }
      });
    }
  }

  // public purchaseOrdersList: Array<Object> = [
  //   {
  //     id: 0,
  //     imgUrl: 'assets/images/tickets.png',
  //     productName: `Home Controller 800`,
  //     supplier: 'Control4',
  //     brand: 'Control4',
  //     sku: '88021111',
  //     orderNumber: 'PO 3213423',
  //     qty: 2,
  //     status: 'Place order',
  //   },
  //   {
  //     id: 1,
  //     imgUrl: 'assets/images/tickets.png',
  //     productName: `Home Controller 250`,
  //     supplier: 'Control4',
  //     brand: 'Control4',
  //     sku: '88021112',
  //     orderNumber: 'PO 3213424',
  //     qty: 3,
  //     status: 'Place order',
  //   },
  //   {
  //     id: 2,
  //     imgUrl: 'assets/images/tickets.png',
  //     productName: `Low-Voltage Wired Keypad`,
  //     supplier: 'Control4',
  //     brand: 'Control4',
  //     sku: '88021115',
  //     orderNumber: 'PO 3213425',
  //     qty: 1,
  //     status: 'Place order',
  //   }
  // ];

  // public reservedInventoryList: Array<Object> = [
  //   {
  //     id: 0,
  //     imgUrl: 'assets/images/tickets.png',
  //     productName: '55" Smart LED TV',
  //     modelNumber: 'Best Buy',
  //     brand: 'Samsung',
  //     sku: '88021117',
  //     qty: 1,
  //     status: 'Reserved'
  //   },
  //   {
  //     id: 1,
  //     imgUrl: 'assets/images/tickets.png',
  //     productName: '2 Year Warranty',
  //     modelNumber: 'Service',
  //     brand: 'Nu Automations',
  //     sku: '88020001',
  //     qty: 3,
  //     status: 'Reserved'
  //   },
  //   {
  //     id: 2,
  //     imgUrl: 'assets/images/tickets.png',
  //     productName: 'Adaptive Phase Dimmer 120V',
  //     modelNumber: 'Control4',
  //     brand: 'Control4',
  //     sku: '88021113',
  //     qty: 2,
  //     status: 'Reserved'
  //   },
  //   {
  //     id: 3,
  //     imgUrl: 'assets/images/tickets.png',
  //     productName: 'Home Controller 800',
  //     modelNumber: 'Control4',
  //     brand: 'Control4',
  //     sku: '88021111',
  //     qty: 5,
  //     status: 'Reserved'
  //   },
  // ];

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
