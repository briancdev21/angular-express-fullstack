import { Component, OnInit } from '@angular/core';
import { CommonComponent } from '../../common/common.component';
import { SharedService } from '../../../services/shared.service';
@Component({
  selector: 'app-receiveinventory',
  templateUrl: './receiveinventory.component.html',
  styleUrls: [
    './receiveinventory.component.css'
  ],
  entryComponents: [
    CommonComponent
  ],
})
export class ReceiveInventoryComponent implements OnInit {

  menuCollapsed = true;
  saveFilterModalCollapsed = true;
  showSaveFilterModal = false;
  filterClicked = false;
  backUpPurchaseOrders: any;
  openSavedFiltersList = false;
  savedFiltersListCollapsed = true;
  savedFiltersArr = [];
  filterAvaliableTo: any;
  filterName = '';
  searchKeyword = '';
  contacts = [];
  originalPurchaseOrderInfos = [];

  constructor( private sharedService: SharedService ) {
    this.filterAvaliableTo = 'everyone';
    this.sharedService.getContacts().subscribe( contactRes => {
      this.contacts = contactRes;
      this.sharedService.getPurchaseOrders().subscribe(res => {
        console.log('purchase orders:', res.results);
        res.results.forEach(ele => {
          if (ele.status === 'OPEN' && ele.status !== 'FULFILLED') {
            const ele_contactId = ele.contactId.split('-').pop();
            const contactAt = this.contacts.filter(contact => contact.id.toString() === ele_contactId).pop();
            const purchaseOrdersInfoItem = {
              projectNumber: ele.id,
              purchaseOrderNumber: `PO${ele.id}`,
              source: contactAt.person.firstName + ' ' + contactAt.person.lastName,
              type: 'Purchase Order',
              status: ele.status,
              quantity: ele.quantity,
              received: ele.recieved,
              totalCost: ele.total,
              dueDate: this.formatDate(new Date(ele.dueDate)),
              lastUpdated: this.formatDate(new Date(ele.updatedAt))
            };
            this.originalPurchaseOrderInfos.push(purchaseOrdersInfoItem);
          }
        });
        this.sortArray('purchaseOrderNumber');
        if (this.purchaseOrdersInfo.length === 0) {
          const purchaseOrdersInfoItem = {
            fakeData: true,
            projectNumber: 0,
            purchaseOrderNumber: 'ORDER#',
            source: 'SOURCE',
            type: 'TYPE',
            status: 'STATUS',
            quantity: 'QUANTITY',
            received: 'RECEIVED',
            dueDate: 'DUE DATE',
            lastUpdated: 'LAST UPDATED'
          };
          this.purchaseOrdersInfo.push(purchaseOrdersInfoItem);
        }
      });
    });
  }

  public purchaseorderStatus = [];
  public purchaseOrderTypes = ['Purchase Order', 'Stock Control'];

  public filters  = {
    startedFrom: '',
    startedTo: '',
    updatedFrom: '',
    updatedTo: '',
    selectTag: '',
    selectStatus: '',
  };

  public purchaseOrdersInfo = [];

  ngOnInit() {
    this.backUpPurchaseOrders = this.purchaseOrdersInfo;
  }

  getFilter(event) {
    this.purchaseOrdersInfo = event.filtered;
    this.filterClicked = event.clicked;
  }

  addNewPurchaseOrder(event) {
    this.purchaseOrdersInfo.push(event.data);
  }

  toggleMenubar(data: boolean) {
    this.menuCollapsed  = data;
  }

  closeModal() {
    this.saveFilterModalCollapsed = true;
    this.showSaveFilterModal = false;
    this.filterClicked = false;
    this.purchaseOrdersInfo = this.backUpPurchaseOrders;
  }

  cancelFilter() {
    this.filters = {
      startedFrom: '',
      startedTo: '',
      updatedFrom: '',
      updatedTo: '',
      selectTag: '',
      selectStatus: '',
    };
    this.filterClicked = false;
    this.purchaseOrdersInfo = this.backUpPurchaseOrders;
  }

  clickSavedFilters() {
    this.openSavedFiltersList = true;
    this.savedFiltersListCollapsed = false;
  }

  onChangeAcailable(value) {
    this.filterAvaliableTo = value;
  }

  saveFilter() {
    // const savingFilterData = this.purchaseOrdersInfo;
    // const savingFilterName = this.filterName;
    // const savingAvailability = this.filterAvaliableTo;
    this.savedFiltersArr.push({
                          savedFilter: this.purchaseOrdersInfo,
                          savedFilterName: this.filterName,
                          savedAvailabilty: this.filterAvaliableTo
                        });
    this.saveFilterModalCollapsed = true;
    this.showSaveFilterModal = false;
    this.filterClicked = false;
    this.purchaseOrdersInfo = this.backUpPurchaseOrders;
  }

  applySavedFilter(selectedFilter) {
    this.purchaseOrdersInfo = selectedFilter.savedFilter;
    this.savedFiltersListCollapsed = true;
    this.openSavedFiltersList = false;
  }

  removeFilter() {
    this.purchaseOrdersInfo = this.backUpPurchaseOrders;
    this.savedFiltersListCollapsed = true;
    this.openSavedFiltersList = false;
  }
  formatDate(date) {
    const monthNames = [
      'January', 'February', 'March',
      'April', 'May', 'June', 'July',
      'August', 'September', 'October',
      'November', 'December'
    ];

    const day = date.getDate();
    const monthIndex = date.getMonth();
    const year = date.getFullYear();

    return monthNames[monthIndex] + ' ' + day + ', ' + year;
  }
  sortArray(field) {
    this.originalPurchaseOrderInfos.sort( function(name1, name2) {
      if ( name1[field] < name2[field] ) {
        return -1;
      } else if ( name1[field] > name2[field]) {
        return 1;
      } else {
        return 0;
      }
    });
  }

  searchKeywordChanged(event) {
    console.log('search keyword:', this.searchKeyword);
    const keyword = this.searchKeyword.toLowerCase();
    const newPOInfos = [];
    this.originalPurchaseOrderInfos.forEach(productInfo => {
      if (productInfo.purchaseOrderNumber.toLowerCase().indexOf(keyword) !== -1) {
        newPOInfos.push(productInfo);
        return;
      }
      if (productInfo.source.toLowerCase().indexOf(keyword) !== -1) {
        newPOInfos.push(productInfo);
      }
    });
    this.purchaseOrdersInfo = newPOInfos;
    if (this.purchaseOrdersInfo.length === 0) {
      const productInfo = {
        fakeData: true,
        projectNumber: 0,
        purchaseOrderNumber: 'ORDER#',
        source: 'SOURCE',
        type: 'TYPE',
        status: 'STATUS',
        quantity: 'QUANTITY',
        received: 'RECEIVED',
        dueDate: 'DUE DATE',
        lastUpdated: 'LAST UPDATED'
      };
      newPOInfos.push(productInfo);
      this.purchaseOrdersInfo = newPOInfos;
    }
  }
}
