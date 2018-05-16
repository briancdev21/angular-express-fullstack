import { Component, OnInit } from '@angular/core';
import { CommonComponent } from '../../common/common.component';
import { FilterService } from './filter.service';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { InvoicesService } from '../../../services/invoices.service';
import { EstimatesService } from '../../../services/estimates.service';
import { EstimateModel } from '../../../models/estimate.model';

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

  public invoicesListInfo: Array<Object> = [];
  public estimatesListInfo: Array<Object> = [];

  newInvoice = {};
  newEstimate = {};

  constructor(
    private filterService: FilterService,
    private router: Router,
    private invoicesService: InvoicesService,
    private estimatesService: EstimatesService
  ) {
    this.filterAvaliableTo = 'everyone';
    this.invoicesService.getInvoices().subscribe(res => {
      console.log('invoices: ', res.results);
      this.invoicesListInfo = res.results;
      this.invoicesListInfo.map(i => i['overdueDays'] = this.calcOverDueDays(i['dueDate'], i['status']));
      this.estimatesService.getEstimates().subscribe(data => {
        this.estimatesListInfo = data.results;
        this.estimatesListInfo.map(i => i['overdueDays'] = this.calcOverDueDays(i['expiryDate'], i['status']));
        this.estimatesListInfo.forEach(element => {
          element['balance'] = 0;
        });
        this.invoicesListInfo = this.invoicesListInfo.concat(this.estimatesListInfo);
        this.invoicesListInfo.forEach(element => {
          element['createdAt'] = moment(element['createdAt']).format('YYYY-MM-DD');
        });
        console.log('invoices + estimates: ', this.estimatesListInfo);
        this.invoicesListInfo = this.sortDateArray('createdAt');
        console.log('invoices + estimates123: ', this.invoicesListInfo);
      });
    });
  }

  ngOnInit() {
    this.backUpInvoices = this.invoicesListInfo;
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
    this.router.navigate(['./add-invoice']);
  }

  toAddEstimate() {
    // this.router.navigate(['./add-estimate']);
    this.router.navigate(['./add-estimate']);
  }

  sortDateArray(field) {
    const cmp = this;
    this.invoicesListInfo.sort( function(name1, name2) {
      if ( Date.parse(name1[field]) < Date.parse(name2[field]) ) {
        return -1;
      } else if ( Date.parse(name1[field]) > Date.parse(name2[field])) {
        return 1;
      } else {
        return 0;
      }
    });
    return this.invoicesListInfo;
  }
}
