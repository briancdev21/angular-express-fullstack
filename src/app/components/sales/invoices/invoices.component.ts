import { Component, OnInit } from '@angular/core';
import { CommonComponent } from '../../common/common.component';
import { FilterService } from './filter.service';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { InvoicesService } from '../../../services/invoices.service';

@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: [
    './invoices.component.css'
  ],
  entryComponents: [
    CommonComponent
  ],
  providers: [FilterService]
})
export class InvoicesComponent implements OnInit {

  menuCollapsed = true;
  saveFilterModalCollapsed = true;
  showSaveFilterModal = false;
  filterClicked = false;
  backUpInvoices: any;
  openSavedFiltersList = false;
  savedFiltersListCollapsed = true;
  savedFiltersArr = [];
  filterAvaliableTo: any;
  filterName = '';
  invoiceTags: any;
  invoiceTypes: any;
  today = moment().format('YYYY-MM-DD');

  constructor( private filterService: FilterService, private router: Router, private invoicesService: InvoicesService ) {
    this.filterAvaliableTo = 'everyone';
  }


  public filters  = {
    createdFrom: '',
    createdTo: '',
    updatedFrom: '',
    updatedTo: '',
    selectTag: '',
    selectStatus: '',
  };

  public invoiceStatus: Array<string> = [
    'Due', 'Overdue', 'Paid', 'Net 15', 'Net 30', 'Estimate', 'Approved', 'Rejected'
  ];

  public invoicesListInfo: Array<Object> = [
    {
      transactionId: 'IN-123404',
      customerName: 'Monica Ilic',
      balance: 208.95,
      total: 208.95,
      createdDate: 'January 20, 2017',
      dueDate: 'March 14, 2018',
      overdueDays: 0,
      status: 'Due',
    },
    {
      transactionId: 'IN-123403',
      customerName: 'Rob Harding',
      balance: 93.45,
      total: 93.45,
      createdDate: 'January 17, 2017',
      dueDate: 'March 1, 2018',
      overdueDays: 0,
      status: 'Overdue',
    },
    {
      transactionId: 'ES-123402',
      customerName: 'Hugh Williamson',
      balance: 0,
      total: 93.45,
      createdDate: 'January 20, 2017',
      dueDate: 'March 15, 2018',
      overdueDays: 0,
      status: 'Paid',
    },
    {
      transactionId: 'IN-123401',
      customerName: 'Hayati Homes',
      balance: 415.80,
      total: 415.80,
      createdDate: 'January 14, 2017',
      dueDate: 'March 7, 2018',
      overdueDays: 0,
      status: 'Net 30',
    },
    {
      transactionId: 'IN-123400',
      customerName: 'John Moss',
      balance: 0,
      total: 1555.17,
      createdDate: 'January 2, 2017',
      dueDate: 'March 15, 2018',
      overdueDays: 0,
      status: 'Paid',
    },
    {
      transactionId: 'IN-123399',
      customerName: 'John Moss',
      balance: 0,
      total: 11161.84,
      createdDate: 'December 20, 2016',
      dueDate: 'March 15, 2018',
      overdueDays: 0,
      status: 'Paid',
    },
    {
      transactionId: 'IN-123398',
      customerName: 'Patrick Chew',
      balance: 653.95,
      total: 1153.95,
      createdDate: 'December 19, 2016',
      dueDate: 'Februry 6, 2018',
      overdueDays: 0,
      status: 'Overdue',
    },
    {
      transactionId: 'ES-123397',
      customerName: 'John Smith',
      balance: 0,
      total: 4293.45,
      createdDate: 'December 19, 2016',
      dueDate: 'March 15, 2018',
      overdueDays: 0,
      status: 'Paid',
    },
    {
      transactionId: 'ES-123396',
      customerName: 'Rockwood Homes',
      balance: 0,
      total: 61555.17,
      createdDate: 'December 12, 2016',
      dueDate: 'March 15, 2018',
      overdueDays: 0,
      status: 'Net 15',
    },
    {
      transactionId: 'IN-123395',
      customerName: 'Steve Conemharen',
      balance: 93.45,
      total: 93.45,
      createdDate: 'December 10, 2016',
      dueDate: 'March 15, 2018',
      overdueDays: 0,
      status: 'Estimate',
    },
  ];

  newInvoice = {};

  ngOnInit() {
    this.backUpInvoices = this.invoicesListInfo;
    this.newInvoice = {
      'currencyId': 1,
      'contactId': 1,
      'pricingCategoryId': 1,
      'classificationId': 1,
      'categoryId': 1,
      'termId': 1,
      'emails': [
        'test@test.com'
      ],
      'startDate': this.today,
      'acceptOnlinePayment': true,
      'chargeLateFee': true,
      'lateFee': {
        'value': 0,
        'unit': 'AMOUNT'
      },
      'recurring': [
        'RRULE:FREQ=MONTHLY;COUNT=5;DTSTART=20120201T023000Z'
      ],
      'reminder': [
        'Reminder'
      ],
      'shippingAddress': {
        'address': 'Enter Shipping Address',
        'city': 'Enter City',
        'province': 'Enter Province',
        'postalCode': 'Enter Postal Code',
        'country': 'Enter Country'
      },
      'billingAddress': {
        'address': 'Enter Billing Address',
        'city': 'Enter City',
        'province': 'Enter Province',
        'postalCode': 'Enter Postal Code',
        'country': 'Enter Country'
      },
      'internalNote': 'string',
      'customerNote': 'string',
      'terms': 'string',
      'discount': {
        'value': 0,
        'unit': 'AMOUNT'
      }
    };
  }

  getFilter(event) {
    this.invoicesListInfo = event.filtered;
    this.filterClicked = event.clicked;
  }

  addNewInvoice(event) {
    this.invoicesListInfo.push(event.data);
  }

  toggleMenubar(data: boolean) {
    this.menuCollapsed  = data;
  }

  closeModal() {
    this.saveFilterModalCollapsed = true;
    this.showSaveFilterModal = false;
    this.filterClicked = false;
    this.invoicesListInfo = this.backUpInvoices;
  }

  cancelFilter() {
    this.filters = {
      createdFrom: '',
      createdTo: '',
      updatedFrom: '',
      updatedTo: '',
      selectTag: '',
      selectStatus: '',
    };
    this.filterClicked = false;
    this.invoicesListInfo = this.backUpInvoices;
  }

  clickSavedFilters() {
    this.openSavedFiltersList = true;
    this.savedFiltersListCollapsed = false;
  }

  onChangeAcailable(value) {
    this.filterAvaliableTo = value;
  }

  saveFilter() {
    // const savingFilterData = this.invoicesListInfo;
    // const savingFilterName = this.filterName;
    // const savingAvailability = this.filterAvaliableTo;
    this.savedFiltersArr.push({
                          savedFilter: this.invoicesListInfo,
                          savedFilterName: this.filterName,
                          savedAvailabilty: this.filterAvaliableTo
                        });
    this.saveFilterModalCollapsed = true;
    this.showSaveFilterModal = false;
    this.filterClicked = false;
    this.invoicesListInfo = this.backUpInvoices;
  }

  applySavedFilter(selectedFilter) {
    this.invoicesListInfo = selectedFilter.savedFilter;
    this.savedFiltersListCollapsed = true;
    this.openSavedFiltersList = false;
  }

  removeFilter() {
    this.invoicesListInfo = this.backUpInvoices;
    this.savedFiltersListCollapsed = true;
    this.openSavedFiltersList = false;
  }

  toAddInvoice() {
    this.invoicesService.createInvoice(this.newInvoice).subscribe (res => {
      console.log('invoice created: ', res);
      this.router.navigate(['./add-invoice', {title: 'NEW', id: res.data.id}]);
    });
  }

  toAddEstimate() {
    this.router.navigate(['./add-estimate']);
  }
}
