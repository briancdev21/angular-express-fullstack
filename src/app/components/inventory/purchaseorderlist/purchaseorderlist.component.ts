import { Component, OnInit } from '@angular/core';
import { CommonComponent } from '../../common/common.component';
import { FilterService } from './filter.service';
import { SharedService } from '../../../services/shared.service';
@Component({
  selector: 'app-purchaseorderlist',
  templateUrl: './purchaseorderlist.component.html',
  styleUrls: [
    './purchaseorderlist.component.css'
  ],
  entryComponents: [
    CommonComponent
  ],
  providers: [FilterService]
})
export class PurchaseOrderListComponent implements OnInit {

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
  contactList = [];

  constructor( private filterService: FilterService, private sharedService: SharedService ) {
    this.filterAvaliableTo = 'everyone';
    this.sharedService.getContacts().subscribe(contactRes => {
      contactRes = this.addContactName(contactRes);
      this.contactList = contactRes;

      this.sharedService.getPurchaseOrders().subscribe(res => {
        console.log('purchase orders:', res.results);
        res.results.forEach(ele => {
          let contactName = '';
          if (ele.contactId) {
            const contactId = ele.contactId.split('-').pop();
            contactName = this.contactList.filter(contact => contact.id.toString() === contactId.toString()).pop().name;
          } else {
            contactName = '';
          }
          const purchaseOrdersInfoItem = {
            itemType: 'PO',
            projectNumber: ele.id,
            purchaseOrderNumber: `PO${ele.id}`,
            source: contactName,
            type: 'Purchase Order',
            status: ele.status,
            quantity: ele.quantity,
            received: ele.recieved,
            totalCost: ele.total,
            dueDate: this.formatDate(new Date(ele.dueDate)),
            lastUpdated: this.formatDate(new Date(ele.updatedAt))
          };
          this.purchaseOrdersInfo.push(purchaseOrdersInfoItem);
        });
        this.sortArray('purchaseOrderNumber');
      });
      this.sharedService.getTransfers().subscribe(res => {
        console.log('transfers:', res.results);
        res.results.forEach(ele => {

          const purchaseOrdersInfoItem = {
            itemType: 'TR',
            projectNumber: ele.id,
            purchaseOrderNumber: `TR${ele.id}`,
            source: '',
            type: 'Stock Control',
            status: ele.status,
            quantity: ele.quantity,
            received: ele.recieved,
            totalCost: ele.total,
            dueDate: '',
            lastUpdated: this.formatDate(new Date(ele.updatedAt))
          };
          this.purchaseOrdersInfo.push(purchaseOrdersInfoItem);
        });
        this.sortArray('purchaseOrderNumber');
      });
      this.sharedService.getInventoryAdjustments().subscribe(res => {
        console.log('adjustments:', res.results);
        res.results.forEach(ele => {
          const purchaseOrdersInfoItem = {
            itemType: 'AD',
            projectNumber: ele.id,
            purchaseOrderNumber: `AD${ele.id}`,
            source: '',
            type: 'Stock Control',
            status: ele.status,
            quantity: ele.quantity,
            received: ele.recieved,
            totalCost: ele.total,
            dueDate: '',
            lastUpdated: this.formatDate(new Date(ele.updatedAt))
          };
          this.purchaseOrdersInfo.push(purchaseOrdersInfoItem);
        });
        this.sortArray('purchaseOrderNumber');
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

  // public purchaseOrdersInfo: Array<Object> = [
  //   {
  //     purchaseOrderNumber: 'PO88031237',
  //     source: 'Alliance Video Audio Distribution',
  //     type: 'Purchase Order',
  //     status: 'Partial Fulfilment',
  //     quantity: 43,
  //     received: 13,
  //     totalCost: 23230.75,
  //     dueDate: 'March 20, 2017',
  //     lastUpdated: 'January 20, 2017'
  //   },
  //   {
  //     purchaseOrderNumber: 'PO88031236',
  //     source: 'Alliance Video Audio Distribution',
  //     type: 'Purchase Order',
  //     status: 'Partial Fulfilment',
  //     quantity: 5,
  //     received: 3,
  //     totalCost: 3230.75,
  //     dueDate: 'January 28, 2017',
  //     lastUpdated: 'January 20, 2017'
  //   },
  //   {
  //     purchaseOrderNumber: 'PO88031233',
  //     source: 'John Moss',
  //     type: 'Purchase Order',
  //     status: 'Partial Fulfilment',
  //     quantity: 34,
  //     received: 33,
  //     totalCost: 7086.79,
  //     dueDate: 'April 4, 2018',
  //     lastUpdated: 'December 15, 2016'
  //   },
  //   {
  //     purchaseOrderNumber: 'TR88020002',
  //     source: '',
  //     type: 'Stock Control',
  //     status: 'Transfered',
  //     quantity: 10,
  //     received: 10,
  //     totalCost: 3232.23,
  //     dueDate: '',
  //     lastUpdated: 'December 13, 2016'
  //   },
  //   {
  //     purchaseOrderNumber: 'AD88020001',
  //     source: '',
  //     type: 'Stock Control',
  //     status: 'Adjustment',
  //     quantity: 5,
  //     received: 5,
  //     totalCost: 1322.23,
  //     dueDate: '',
  //     lastUpdated: 'December 13, 2016'
  //   },
  //   {
  //     purchaseOrderNumber: 'PO88031230',
  //     source: 'Rob Harding',
  //     type: 'Purchase Order',
  //     status: 'Delivered',
  //     quantity: 34,
  //     received: 34,
  //     totalCost: 23322.23,
  //     dueDate: 'December 16, 2018',
  //     lastUpdated: 'December 12, 2017'
  //   }
  // ];
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
    if (field === 'purchaseOrderNumber') {

      this.purchaseOrdersInfo.sort( function(name1, name2) {
        const aSize = name1.itemType;
        const bSize = name2.itemType;
        const aLow = name1.projectNumber;
        const bLow = name2.projectNumber;
        if (aSize === bSize) {
            return (aLow < bLow) ? -1 : (aLow > bLow) ? 1 : 0;
        } else {
            return (aSize < bSize) ? -1 : 1;
        }
      });
    } else {
      this.purchaseOrdersInfo.sort( function(name1, name2) {
        if ( name1[field] < name2[field] ) {
          return -1;
        } else if ( name1[field] > name2[field]) {
          return 1;
        } else {
          return 0;
        }
      });
    }
  }
  addContactName(data) {
    data.forEach(element => {
      if (element.type === 'PERSON') {
        element.name = element.person.firstName + ' ' + element.person.lastName;
      } else {
        element.name = element.business.name;
      }
    });
    return data;
  }
}
