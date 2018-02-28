import { Component, OnInit } from '@angular/core';
import { CommonComponent } from '../common/common.component';
import { FilterService } from './filter.service';
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

  constructor( private filterService: FilterService ) {
    this.filterAvaliableTo = 'everyone';
  }

  public filters  = {
    scoreFrom : 0,
    scoreTo : 100,
    createdDateFrom: '',
    createdDateTo: '',
    updatedDateFrom: '',
    updatedDateTo: '',
    selectOwner: '',
    location: '',
    selectStatus: '',
  };

  public contactsListInfo: Array<Object> = [
    {
      name: 'Diana Ilic',
      phone: '4039696480',
      email: 'diana.ilic@outlook.com',
      createDate: 'Januanry 19, 2018',
      status: 'New',
      score: '12',
      updateDate: 'Januanry 25, 2018',
      address: '',
      owner: 'Diana Ilic'
    },
    {
      name: 'Greg Johnson',
      phone: '4038504081',
      email: 'greg.johnson@mcjohnsonandsons.com',
      createDate: 'Januanry 19, 2018',
      status: 'Seen',
      score: '38',
      updateDate: 'Januanry 25, 2018',
      address: '',
      owner: 'Greg Johnson'
    },
    {
      name: 'John Smith',
      phone: '4038502930',
      email: 'johnsm@gmail.com',
      createDate: 'March 19, 2018',
      status: 'Follow-up',
      score: '24',
      updateDate: 'March 26, 2018',
      address: '',
      owner: 'John Smith'
    },
    {
      name: 'Tyler Petak',
      phone: '4038904510',
      email: 'tylerpetak@gmail.com',
      createDate: 'June 11, 2018',
      status: 'Demo',
      score: '68',
      updateDate: 'June 25, 2018',
      address: '',
      owner: 'Diana Ilic'
    },
    {
      name: 'Tyler Petak',
      phone: '4038904510',
      email: 'tylerpetak@gmail.com',
      createDate: 'June 11, 2018',
      status: 'Demo',
      score: '68',
      updateDate: 'June 25, 2018',
      address: '',
      owner: 'Diana Ilic'
    },
  ];

  public contactOwners = [
    'Diana Ilic', 'John Smith', 'Greg Johnson'
  ];

  public contactStatus = [
    'New', 'Seen', 'Follow-up', 'Demo'
  ];
  ngOnInit() {
    this.backUpContacts = this.contactsListInfo;
  }

  getFilter(event) {
    this.contactsListInfo = event.filtered;
    this.filterClicked = event.clicked;
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
      scoreFrom : 0,
      scoreTo : 100,
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
