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
import { CompleterService, CompleterData } from 'ng2-completer';

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
  contactsSource: CompleterData;
  estContactsSource: CompleterData;

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
  contactId: any;
  leadId: any;
  contactName: any;
  estContactName: any;
  showInvoiceCreateModal = false;
  showEstimateCreateModal = false;

  constructor(
    private filterService: FilterService,
    private router: Router,
    private invoicesService: InvoicesService,
    private estimatesService: EstimatesService,
    private sharedService: SharedService,
    private crmService: CrmService,
    private completerService: CompleterService
  ) {

    this.filterAvaliableTo = 'everyone';
    this.invoicesService.getInvoices().subscribe(res => {
      this.invoicesListInfo = res.results;
      this.invoicesListInfo = this.invoicesListInfo.map(element => {
        element['isInvoice'] = true;
        return element;
      });
      this.invoicesListInfo.map(i => i['overdueDays'] = this.calcOverDueDays(i['dueDate'], i['status']));
      const contactIds = this.invoicesListInfo.map(i => i['contactId']);
      this.sharedService.getMulipleContacts(contactIds).subscribe(contact => {
        this.contactsList = contact;
        this.addContactName(this.contactsList);

        this.estimatesService.getEstimates().subscribe(data => {
          this.estimatesListInfo = data.results;
          const leadIds = [];
          const esContactIds = [];
          this.estimatesListInfo.forEach(es => {
            if (es['leadId']) {
              leadIds.push(es['leadId']);
            } else {
              esContactIds.push(es['contactId']);
            }
          });

          this.sharedService.getMulipleContacts(esContactIds).subscribe(co => {
            this.contactsList = this.contactsList.concat(this.addContactName(co));

            this.crmService.getMulipleLeads(leadIds).subscribe(lead => {
              this.leadsList = lead;
              this.addContactName(this.leadsList);
              console.log('leadslist *** ', lead, leadIds);

              this.estimatesListInfo.map(i => i['overdueDays'] = this.calcOverDueDays(i['expiryDate'], i['status']));
              this.estimatesListInfo = this.estimatesListInfo.map(element => {
                element['isInvoice'] = false;
                return element;
              });
              this.invoicesListInfo = this.invoicesListInfo.concat(this.estimatesListInfo);
              this.invoicesListInfo.forEach(element => {
                element['createdAt'] = moment(element['createdAt']).format('YYYY-MM-DD');
                element['balance'] = element['total'] - element['receivedPayment'] - element['deposit'];
              });
              this.invoicesListInfo = this.sortDateArray('createdAt');
              this.invoicesListInfo.map(i => {
                if (i['contactId']) {
                  i['customerName'] = this.getCustomerName(this.contactsList, i['contactId']);
                } else if (i['leadId']) {
                  i['customerName'] = this.getCustomerNameFromLead(i['leadId']);
                }
                return i;
              });
            });
          });
        });
      });
      console.log('invoiceslist: ', this.invoicesListInfo);

    });

    this.sharedService.getContacts().subscribe(res => {
      const contacts = res;
      this.addContactName(contacts);
      this.contactsSource = this.completerService.local(contacts, 'name', 'name');
      this.crmService.getLeadsList().subscribe(lead => {
        const leads = lead.results;
        leads.map(l => l.flag = 'lead');
        this.addContactName(leads);
        console.log('lead: ', leads);
        this.estContactsSource = this.completerService.local(contacts.concat(leads), 'name', 'name');
      });
    });
  }


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

  getCustomerNameFromLead(id) {
    const selectedLead = this.leadsList.filter(l => l.id === id)[0];
    return selectedLead.name;
  }

  onSelectCustomerBeforeCreate(selectedIndex: any) {
    this.contactId = selectedIndex.originalObject.id;
  }

  onSelectEstCustomerBeforeCreate(selectedIndex: any) {
    console.log('selected: ', selectedIndex);
    if (selectedIndex.originalObject.flag) {
      this.leadId = selectedIndex.originalObject.id;
    } else {
      this.contactId = selectedIndex.originalObject.id;
    }
  }

  createInvoice() {
    if (this.contactId) {
      const creatingData = {
        contactId: this.contactId
      };
      this.invoicesService.createInvoice(creatingData).subscribe(res => {
        console.log('invoice created: ', res);
        this.router.navigate([`./invoice-profile/${res.data.id}`]);
        this.showInvoiceCreateModal = false;
        this.contactId = undefined;
      });
    }
  }

  createEstimate() {
    if (this.contactId) {
      const creatingData = {
        contactId: this.contactId
      };
      this.estimatesService.createEstimate(creatingData).subscribe(res => {
        console.log('estimate created: ', res);
        this.router.navigate([`./estimate-profile/${res.data.id}`]);
        this.showEstimateCreateModal = false;
        this.contactId = undefined;
      });
    } else if (this.leadId) {
      const creatingData = {
        leadId: this.leadId
      };
      this.estimatesService.createEstimate(creatingData).subscribe(res => {
        console.log('estimate created: ', res);
        this.router.navigate([`./estimate-profile/${res.data.id}`]);
        this.showEstimateCreateModal = false;
        this.leadId = undefined;
      });
    }
  }
}
