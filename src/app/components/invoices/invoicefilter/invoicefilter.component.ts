import { Component, ChangeDetectorRef, Input, OnInit, HostListener, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import * as _ from 'lodash';
import { FilterService } from '../filter.service';
import { Ng2CompleterComponent } from '../../common/ng2completer/ng2completer.component';


@Component({
  selector: 'app-invoicefilter',
  templateUrl: './invoicefilter.component.html',
  styleUrls: [
    './invoicefilter.component.css',
  ],
  providers: [FilterService]
})


export class InvoiceFilterComponent implements OnInit {

  @Input() invoicesListInfo;
  @Input() filters;
  @Input() invoiceTags;
  @Input() invoiceStatus;
  @Input() invoiceTypes;
  @Output() filterParent: EventEmitter<any> = new EventEmitter;

  customersList = [];
  items2: any[] = [
    'Home', 'Controller', 'Adaptive', 'Dimmer', 'Keypad', 'TV', 'Samsung', 'Service'
  ];
  config2: any = {'placeholder': 'Type here', 'sourceField': ''};

  public selectedMoment = new Date();
  public createdMin;
  public updatedMin;
  public createdMax;
  public updatedMax;
  public lastMax;
  public lastMin;
  public originFilters;
  // scoreFrom = 28;
  // scoreTo = 60;
  createdDateFrom: Date;
  createdDateTo: Date;
  updatedDateFrom: Date;
  updatedDateTo: Date;
  selectTag: string;
  invoiceName: string;
  selectStatus: string;
  filteredInvoicesList: any;
  applyClicked = false;
  filteredInvoices: any;
  backUpInvoices: any;
  editable: boolean;
  newKeyword: string;
  selectedItem: any = '';
  inputChanged: any = '';
  selectCustomer =  '';
  maxInvoice = 0;
  maxInvoiceBalance = 0;
  maxOverdueDays = 0;

  constructor( private filterService: FilterService, private ref: ChangeDetectorRef ) {
    const comp = this;
    document.addEventListener('click', function() {
      comp.editable = false;
    });
  }

  ngOnInit() {
    this.filteredInvoices = this.invoicesListInfo;
    this.backUpInvoices = this.invoicesListInfo;
    this.originFilters = Object.assign({}, this.filters);

    // Get customer list from Information list and remove duplicated names
    const a = this.invoicesListInfo.map(i => i.customerName);
    this.customersList = a.filter(function(item, pos) {
      return a.indexOf(item) === pos;
    });
    // Get invoice max value in invoice info list
    this.maxInvoice = Math.max(...this.invoicesListInfo.map(i => i.total));

    // Get balance max value in invoice info list
    this.maxInvoiceBalance = Math.max(...this.invoicesListInfo.map(i => i.balance));

    // Get max duedate range in invoice info list
    this.invoicesListInfo.map(i => i.overdueDays = this.calcOverDueDays(i.dueDate, i.status));
    this.maxOverdueDays = Math.max(...this.invoicesListInfo.map(i => i.overdueDays));

    console.log('444', this.maxInvoice, this.maxInvoiceBalance, this.maxOverdueDays);

    // this.scoreFrom = this.filters.scoreFrom;
    // this.scoreTo = this.filters.scoreTo;
  }

  calcOverDueDays(due, status) {
    const today = new Date();
    const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    const dueDate = new Date(due);
    const diffDays = Math.round(Math.abs((today.getTime() - dueDate.getTime()) / (oneDay)));
    if (status === 'Paid' || status === 'Estimate') {
      return 0;
    }
    if (diffDays < 0) {
      return 0;
    } else {
      return diffDays;
    }
  }

  onSelectedCustomer(val) {
    this.filters.selectCustomer = val;
    this.selectCustomer = val;
  }

  onSelect(item: any) {
    this.selectedItem = item;
    this.items2 = this.items2.filter(function( obj ) {
      return obj !== item;
    });
    this.invoiceTags.push(item);
  }

  onInputChangedEvent(val: string) {
    this.inputChanged = val;
  }

  removeUser(i: number) {
    const item = this.invoiceTags[i];
    this.items2.push(item);
    this.invoiceTags.splice(i, 1);
  }

  selectCreatedFrom(event) {
    this.createdDateFrom = event.value;
    this.createdMin = this.createdDateFrom;
  }

  selectCreatedTo(event) {
    this.createdDateTo = event.value;
    this.createdMax = this.createdDateTo;
  }

  selectUpdatedFrom(event) {
    this.updatedDateFrom = event.value;
    this.updatedMin = this.updatedDateFrom;
  }

  selectUpdatedTo(event) {
    this.updatedDateTo = event.value;
    this.updatedMax = this.updatedDateTo;
  }

  filterTxt (arr, searchKey) {
    return arr.filter(function(obj){
      return Object.keys(obj).some(function(key) {
        return obj[key].toString().includes(searchKey);
      });
    });
  }

  resetFilter() {
    this.selectCustomer = '';
    this.filters = {
      createdFrom: '',
      createdTo: '',
      updatedFrom: '',
      updatedTo: '',
      selectCustomer: '',
      invoiceTags: '',
      invoiceName: '',
      selectStatus: '',
    };
    this.ref.detectChanges();
  }

  applyFilter() {

    console.log('111', this.filters);
    this.applyClicked = true;
    this.filteredInvoices = this.backUpInvoices;

    if (this.filters.selectCustomer) {
      this.filteredInvoices = this.filteredInvoices.filter(customer => customer.customerName === this.filters.selectCustomer);
    }
    console.log('222', this.filteredInvoices);
    if (this.filters.selectStatus) {
      this.filteredInvoices = this.filteredInvoices.filter(invoice => invoice.status === this.filters.selectStatus);
    }

    if (this.filters.createdFrom) {
      this.filteredInvoices = this.filteredInvoices.filter(
        invoice => Date.parse(invoice.createDate) >= Number(this.filters.createdFrom)
      );
    }
    if (this.filters.createdTo) {
      this.filteredInvoices = this.filteredInvoices.filter(
        invoice => Date.parse(invoice.createDate) <= Number(this.filters.createdTo)
      );
    }

    if (this.filters.updatedFrom) {
      this.filteredInvoices = this.filteredInvoices.filter(
        invoice => Date.parse(invoice.updatedDate) >= Number(this.filters.updatedFrom)
      );
    }
    if (this.filters.updatedTo) {
      this.filteredInvoices = this.filteredInvoices.filter(
        invoice => Date.parse(invoice.updatedDate) <= Number(this.filters.updatedTo)
      );
    }

    // remove duplicates from array
    this.filteredInvoices = Array.from(new Set(this.filteredInvoices));

    this.filterParent.emit({filtered: this.filteredInvoices, clicked: this.applyClicked});
  }
}
