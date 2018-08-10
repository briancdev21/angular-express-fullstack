import { Component, OnInit } from '@angular/core';
import { CommonComponent } from '../../common/common.component';
import { FilterService } from './filter.service';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { InvoicesService } from '../../../services/invoices.service';
import { EstimatesService } from '../../../services/estimates.service';
import { EstimateModel } from '../../../models/estimate.model';
import { SharedService } from '../../../services/shared.service';
import { CrmService } from '../../../services/crm.service';

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
  contactsList: any;

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
  leadsList = [];

  newInvoice = {};
  newEstimate = {};

  constructor(
    private filterService: FilterService,
    private router: Router,
    private invoicesService: InvoicesService,
    private estimatesService: EstimatesService,
    private sharedService: SharedService,
    private crmService: CrmService
  ) {
    this.sharedService.getContacts()
    .subscribe(data => {
      data = this.addContactName(data);
      console.log('userlist: ', data);
      this.contactsList = data;
    });
    this.crmService.getLeadsList()
    .subscribe(data => {
      data = data.results;
      data = this.addContactName(data);
      this.leadsList = data;
    });

    this.filterAvaliableTo = 'everyone';
    this.invoicesService.getInvoices().subscribe(res => {
      this.invoicesListInfo = res.results;
      this.invoicesListInfo = this.invoicesListInfo.map(element => {
        element['isInvoice'] = true;
        return element;
      });
      this.invoicesListInfo.map(i => i['overdueDays'] = this.calcOverDueDays(i['dueDate'], i['status']));
      // this.invoicesListInfo.map(i => {
      //   if (i['contactId']) {
      //     i['customerName'] = this.getCustomerName(this.contactsList, parseInt(i['contactId'].split('-').pop(), 10));
      //   } else {
      //     i['customerName'] = this.getCustomerName(this.leadsList, parseInt(i['leadId'].split('-').pop(), 10));
      //   }
      //   return i;
      // });

      this.estimatesService.getEstimates().subscribe(data => {
        this.estimatesListInfo = data.results;
        this.estimatesListInfo.map(i => i['overdueDays'] = this.calcOverDueDays(i['expiryDate'], i['status']));
        this.estimatesListInfo = this.estimatesListInfo.map(element => {
          element['balance'] = 0;
          element['isInvoice'] = false;
          return element;
        });
        this.invoicesListInfo = this.invoicesListInfo.concat(this.estimatesListInfo);
        this.invoicesListInfo.forEach(element => {
          element['createdAt'] = moment(element['createdAt']).format('YYYY-MM-DD');
        });
        this.invoicesListInfo = this.sortDateArray('createdAt');

        this.invoicesListInfo.map(i => {
          if (i['contactId']) {
            i['customerName'] = this.getCustomerName(this.contactsList, i['contactId']);
          } else {
            i['customerName'] = this.getCustomerName(this.leadsList, ['leadId']);
          }
          return i;
        });
      });
            console.log('invoiceslist: ', this.invoicesListInfo);

    });
  }

  // constructor( private filterService: FilterService, private router: Router, private invoicesService: InvoicesService ) {
  //   this.filterAvaliableTo = 'everyone';
  //   this.invoicesService.getInvoices().subscribe(res => {
  //     console.log('invoices: ', res.results);
  //     this.invoicesListInfo = res.results;
  //     this.invoicesListInfo.map(i => i['overdueDays'] = this.calcOverDueDays(i['dueDate'], i['status']));
  //   });
  // }

  ngOnInit() {
    this.backUpInvoices = this.invoicesListInfo;
  }

  calcOverDueDays(due, status) {
    console.log('due: ', due);
    const today = new Date();
    const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    const dueDate = new Date(due);
    const diffDays = Math.round((today.getTime() - dueDate.getTime()) / (oneDay));
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

  getCustomerName(list, id) {
    const idList = list.map( c => c.id);
    const pos = idList.indexOf(id);
    // console.log('customer name:', list[pos].name);
    return list[pos] !== undefined ? list[pos].name : '';
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
