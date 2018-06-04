import { Component, OnInit } from '@angular/core';
import { CommonComponent } from '../../common/common.component';
import { FilterService } from './filter.service';
import { SharedService } from '../../../services/shared.service';
@Component({
  selector: 'app-suppliers',
  templateUrl: './suppliers.component.html',
  styleUrls: [
    './suppliers.component.css'
  ],
  entryComponents: [
    CommonComponent
  ],
  providers: [FilterService, SharedService]
})
export class SuppliersComponent implements OnInit {

  menuCollapsed = true;
  saveFilterModalCollapsed = true;
  showSaveFilterModal = false;
  filterClicked = false;
  backUpSuppliers: any;
  openSavedFiltersList = false;
  savedFiltersListCollapsed = true;
  savedFiltersArr = [];
  filterAvaliableTo: any;
  filterName = '';
  currencies = [];

  constructor( private filterService: FilterService, private sharedService: SharedService ) {
    this.filterAvaliableTo = 'everyone';
    this.sharedService.getCurrencies().subscribe(currencies => {
      this.currencies = currencies.results;
      this.sharedService.getContacts().subscribe(contacts => {
        this.contacts = contacts;
        this.sharedService.getTerms().subscribe(terms => {
          this.terms = terms.results;
          this.sharedService.getSuppliers().subscribe(res => {
            const results = res.results;
            results.forEach(ele => {
              const currency = this.currencies.filter(currencyItem => currencyItem.id === ele.currencyId).pop();
              console.log('currency:', currency);
              const contact = this.contacts.filter(contactItem => contactItem.id === ele.contactId).pop();
              const term = this.terms.filter(termItem => termItem.id === ele.termId).pop();
              const supplierListItem = {
                id: ele.id,
                supplierName: ele.name,
                contactEmail: contact['email'],
                contactPhone: contact['phoneNumbers'].primary,
                supplierPhone: contact['phoneNumbers'].primary,
                supplierEmail: contact['email'],
                contactName: contact['owner'],
                currency: currency['currencyCode'],
                term: term['name'],
                tags: ele.keywordIds,
                accountNumber: ele.accountNumber,
                address: ele.shippingAddress.address,
                country: ele.shippingAddress.country,
                state: ele.shippingAddress.province
              };
              this.suppliersListInfo.push(supplierListItem);
            });
          });
        });
      });
    });
  }

  contacts = [];
  terms = [];
  public filters  = {
    selectTag: '',
    accountNumber: '',
    selectTerm: '',
    selectCurrency: '',
  };

  public supplierTags: Array<Object> = [
    'Control4',
  ];

  public allTags: Array<Object> = [
    'Alliance', 'House', 'Logixs', 'Buy', 'Best'
  ];

  public suppliersListInfo: Array<Object> = [
    {
      id: 0,
      supplierName: 'Alliance Video Distribution',
      contactName: 'Jeff Neilson',
      supplierPhone: '4039696480',
      supplierEmail: 'alliance@outlook.com',
      contactPhone: '4039696480',
      contactEmail: 'jeff.neilson@outlook.com',
      address: '2222 Crescent Hill Dr SW Calgary, AB T3C 0J4',
      term: 'Net 30',
      accountNumber: '320ATATECH0001',
      currency: 'CAD',
      country: 'Canada',
      state: 'Alberta',
      tags: ['Control4', 'Alliance']
    }
  ];


  public supplierTerm = ['Net 15', 'Net 30', 'Due on Receipt'];
  public supplierCurrencies = ['CAD', 'USD'];

  ngOnInit() {
    this.backUpSuppliers = this.suppliersListInfo;
  }

  getFilter(event) {
    this.suppliersListInfo = event.filtered;
    this.filterClicked = event.clicked;
  }

  addNewSupplier(event) {
    this.suppliersListInfo.push(event.data);
    this.allTags = this.allTags.concat(event.data.tag);
  }

  toggleMenubar(data: boolean) {
    this.menuCollapsed  = data;
  }

  closeModal() {
    this.saveFilterModalCollapsed = true;
    this.showSaveFilterModal = false;
    this.filterClicked = false;
    this.suppliersListInfo = this.backUpSuppliers;
  }

  cancelFilter() {
    this.filters = {
      selectTag: '',
      accountNumber: '',
      selectTerm: '',
      selectCurrency: '',
    };
    this.filterClicked = false;
    this.suppliersListInfo = this.backUpSuppliers;
  }

  clickSavedFilters() {
    this.openSavedFiltersList = true;
    this.savedFiltersListCollapsed = false;
  }

  onChangeAcailable(value) {
    this.filterAvaliableTo = value;
  }

  saveFilter() {
    // const savingFilterData = this.suppliersListInfo;
    // const savingFilterName = this.filterName;
    // const savingAvailability = this.filterAvaliableTo;
    this.savedFiltersArr.push({
                          savedFilter: this.suppliersListInfo,
                          savedFilterName: this.filterName,
                          savedAvailabilty: this.filterAvaliableTo
                        });
    this.saveFilterModalCollapsed = true;
    this.showSaveFilterModal = false;
    this.filterClicked = false;
    this.suppliersListInfo = this.backUpSuppliers;
  }

  applySavedFilter(selectedFilter) {
    this.suppliersListInfo = selectedFilter.savedFilter;
    this.savedFiltersListCollapsed = true;
    this.openSavedFiltersList = false;
  }

  removeFilter() {
    this.suppliersListInfo = this.backUpSuppliers;
    this.savedFiltersListCollapsed = true;
    this.openSavedFiltersList = false;
  }
}
