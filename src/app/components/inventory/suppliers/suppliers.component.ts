import { Component, OnInit } from '@angular/core';
import { CommonComponent } from '../../common/common.component';
import { FilterService } from './filter.service';
@Component({
  selector: 'app-suppliers',
  templateUrl: './suppliers.component.html',
  styleUrls: [
    './suppliers.component.css'
  ],
  entryComponents: [
    CommonComponent
  ],
  providers: [FilterService]
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

  constructor( private filterService: FilterService ) {
    this.filterAvaliableTo = 'everyone';
  }

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
    },
    {
      id: 1,
      supplierName: 'Control4',
      contactName: 'Jordan Chase',
      supplierPhone: '4039696480',
      supplierEmail: 'control4@outlook.com',
      contactPhone: '4039696481',
      contactEmail: 'jordan.chase@outlook.com',
      address: '2222 Crescent Hill Dr SW Calgary, AB T3C 0J4',
      term: 'Net 15',
      accountNumber: 'CAD32000232',
      currency: 'CAD',
      country: 'Canada',
      state: 'Alberta',
      tags: ['Control4', 'House']
    },
    {
      id: 2,
      supplierName: 'House Logixs',
      contactName: '',
      supplierPhone: '4039696480',
      supplierEmail: 'alliance@outlook.com',
      contactPhone: '',
      contactEmail: '',
      address: '2222 Crescent Hill Dr SW Calgary, AB T3C 0J4',
      term: 'Due on Receipt',
      accountNumber: '',
      currency: 'USD',
      country: 'USA',
      state: 'Florida',
      tags: ['House', 'Logixs']
    },
    {
      id: 3,
      supplierName: 'Best Buy',
      contactName: 'Shayan Lotifi',
      supplierPhone: '4039696480',
      supplierEmail: 'bestbuy@outlook.com',
      contactPhone: '4039696482',
      contactEmail: 'shayan.lotify@outlook.com',
      address: '2222 Crescent Hill Dr SW Calgary, AB T3C 0J4',
      term: 'Due on Receipt',
      accountNumber: '',
      currency: 'CAD',
      country: 'Canada',
      state: 'British Colombia',
      tags: ['Buy', 'Best']
    },
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
