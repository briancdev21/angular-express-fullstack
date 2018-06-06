import { Component, OnInit } from '@angular/core';
import { CommonComponent } from '../../common/common.component';
import { FilterService } from './filter.service';
import { Router } from '@angular/router';
import { CrmService } from '../../../services/crm.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: [
    './contacts.component.css'
  ],
  entryComponents: [
    CommonComponent
  ],
  providers: [FilterService]
})
export class ContactsComponent implements OnInit {

  menuCollapsed = true;
  saveFilterModalCollapsed = true;
  showSaveFilterModal = false;
  filterClicked = false;
  backUpContacts: any;
  openSavedFiltersList = false;
  savedFiltersListCollapsed = true;
  savedFiltersArr = [];
  filterAvaliableTo: any;
  filterName = '';

  constructor( private filterService: FilterService,  private router: Router, private crmService: CrmService  ) {
    this.filterAvaliableTo = 'everyone';
    this.filterService.saveClicked.subscribe( data => {
      if (data) {
        this.crmService.getContactsList().subscribe(res => {
          this.contactsListInfo = res.results;
        });
      }
    });
  }

  public filters  = {
    // scoreFrom : 0,
    // scoreTo : 100,
    createdDateFrom: '',
    createdDateTo: '',
    updatedDateFrom: '',
    updatedDateTo: '',
    selectOwner: '',
    location: '',
    selectStatus: '',
  };

  public contactOwners: Array<Object> = [
    'John Smith',
  ];

  public contactStatus = [
    'Project', 'Invoice', 'Project and Invoice'
  ];

  public contactTypes = ['Individual', 'Business'];

  public contactsListInfo: Array<Object> = [];

  ngOnInit() {
    this.backUpContacts = this.contactsListInfo;
    this.crmService.getContactsList().subscribe(data => {
      this.contactsListInfo = data.results;
      console.log('contacts: ', data);
    });
  }

  getFilter(event) {
    this.contactsListInfo = event.filtered;
    this.filterClicked = event.clicked;
  }

  addNewContact(event) {
    this.contactsListInfo.push(event.data);
  }

  toggleMenubar(data: boolean) {
    this.menuCollapsed  = data;
  }

  closeModal() {
    this.saveFilterModalCollapsed = true;
    this.showSaveFilterModal = false;
    this.filterClicked = false;
    this.contactsListInfo = this.backUpContacts;
  }

  cancelFilter() {
    this.filters = {
      // scoreFrom : 0,
      // scoreTo : 100,
      createdDateFrom: '',
      createdDateTo: '',
      updatedDateFrom: '',
      updatedDateTo: '',
      selectOwner: '',
      location: '',
      selectStatus: '',
    };
    this.filterClicked = false;
    this.contactsListInfo = this.backUpContacts;
  }

  clickSavedFilters() {
    this.openSavedFiltersList = true;
    this.savedFiltersListCollapsed = false;
  }

  onChangeAcailable(value) {
    this.filterAvaliableTo = value;
  }

  saveFilter() {
    // const savingFilterData = this.contactsListInfo;
    // const savingFilterName = this.filterName;
    // const savingAvailability = this.filterAvaliableTo;
    this.savedFiltersArr.push({
                          savedFilter: this.contactsListInfo,
                          savedFilterName: this.filterName,
                          savedAvailabilty: this.filterAvaliableTo
                        });
    this.saveFilterModalCollapsed = true;
    this.showSaveFilterModal = false;
    this.filterClicked = false;
    this.contactsListInfo = this.backUpContacts;
  }

  applySavedFilter(selectedFilter) {
    this.contactsListInfo = selectedFilter.savedFilter;
    this.savedFiltersListCollapsed = true;
    this.openSavedFiltersList = false;
  }

  removeFilter() {
    this.contactsListInfo = this.backUpContacts;
    this.savedFiltersListCollapsed = true;
    this.openSavedFiltersList = false;
  }
}
