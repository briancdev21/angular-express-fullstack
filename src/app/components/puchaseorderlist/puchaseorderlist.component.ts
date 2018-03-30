import { Component, OnInit } from '@angular/core';
import { CommonComponent } from '../common/common.component';
import { FilterService } from './filter.service';
@Component({
  selector: 'app-puchaseorderlist',
  templateUrl: './puchaseorderlist.component.html',
  styleUrls: [
    './puchaseorderlist.component.css'
  ],
  entryComponents: [
    CommonComponent
  ],
  providers: [FilterService]
})
export class PuchaseOrderListComponent implements OnInit {

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

  constructor( private filterService: FilterService ) {
    this.filterAvaliableTo = 'everyone';
  }

  public purchaseorderStatus = ['Not started', 'Not complete', 'Delivered', 'In progress', 'Complete'];

  public filters  = {
    startedFrom: '',
    startedTo: '',
    updatedFrom: '',
    updatedTo: '',
    selectTag: '',
    selectStatus: '',
  };

  public collaborators: Array<string> = [
  ];

  public purchaseOrdersInfo: Array<Object> = [
    {
      purchaseOrderNumber: 'WO12345',
      purchaseOrderName: 'Work Order Title Here',
      customerName: 'John Moss',
      startDate: 'November 20, 2017',
      scheduledStart: '8:00 AM',
      scheduledEnd: '6:30 PM',
      completion: 33,
      status: 'Not started',
      collaborators: [
        {
          name: 'John Moss',
          imgUrl: 'assets/users/user1.png'
        }
      ]
    },
    {
      purchaseOrderNumber: 'WO12344',
      purchaseOrderName: 'Work Order Title Here',
      customerName: 'John Moss',
      startDate: 'November 19, 2017',
      scheduledStart: '12:00 PM',
      scheduledEnd: '6:30 PM',
      completion: 64,
      status: 'Delivered',
      collaborators: [
        {
          name: 'John Moss',
          imgUrl: 'assets/users/user1.png'
        },
        {
          name: 'Michael',
          imgUrl: 'assets/users/user2.png'
        }
      ]
    },
    {
      purchaseOrderNumber: 'WO12343',
      purchaseOrderName: 'Work Order Title Here',
      customerName: 'Agile Smith',
      startDate: 'November 18, 2017',
      scheduledStart: '8:00 AM',
      scheduledEnd: '11:00 AM',
      completion: 89,
      status: 'Complete',
      collaborators: [
        {
          name: 'John Moss',
          imgUrl: 'assets/users/user1.png'
        }
      ]
    },
    {
      purchaseOrderNumber: 'WO12342',
      purchaseOrderName: 'Work Order Title Here',
      customerName: 'Agile Smith',
      startDate: 'November 10, 2017',
      scheduledStart: '8:00 AM',
      scheduledEnd: '6:30 PM',
      completion: 59,
      status: 'In progress',
      collaborators: [
        {
          name: 'Agile Smith',
          imgUrl: 'assets/users/user3.png'
        }
      ]
    },
  ];

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
}
