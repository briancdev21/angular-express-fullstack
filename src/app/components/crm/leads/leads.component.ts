import { Component, OnInit } from '@angular/core';
import { CommonComponent } from '../../common/common.component';
import { FilterService } from './filter.service';
import { Router } from '@angular/router';
import { CrmService } from '../../../services/crm.service';

@Component({
  selector: 'app-leads',
  templateUrl: './leads.component.html',
  styleUrls: [
    './leads.component.css'
  ],
  entryComponents: [
    CommonComponent
  ],
  providers: [FilterService]
})
export class LeadsComponent implements OnInit {

  menuCollapsed = true;
  saveFilterModalCollapsed = true;
  showSaveFilterModal = false;
  filterClicked = false;
  backUpLeads: any;
  openSavedFiltersList = false;
  savedFiltersListCollapsed = true;
  savedFiltersArr = [];
  filterAvaliableTo: any;
  filterName = '';

  constructor( private filterService: FilterService, private router: Router, private crmService: CrmService  ) {
    this.filterAvaliableTo = 'everyone';
    this.filterService.saveClicked.subscribe( data => {
      if (data) {
        this.crmService.getLeadsList().subscribe(res => {
          this.leadsListInfo = res.results;
        });
      }
    });
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

  public leadsListInfo = [
  ];

  public leadOwners = [
    'Diana Ilic', 'John Smith', 'Greg Johnson'
  ];

  public leadStatus = [
    'New', 'Seen', 'Follow-up', 'Demo'
  ];
  ngOnInit() {
    this.backUpLeads = this.leadsListInfo;
    this.crmService.getLeadsList().subscribe(data => {
      this.leadsListInfo = data.results;
      this.leadsListInfo.forEach(ele => {
        const numbersOnly = ele.phoneNumbers.primary.split('-');
        numbersOnly.forEach(element => {
          ele.primaryNumber = ele.primaryNumber + element;
        });
      });
    });
  }

  getFilter(event) {
    this.leadsListInfo = event.filtered;
    this.filterClicked = event.clicked;
  }

  toggleMenubar(data: boolean) {
    this.menuCollapsed  = data;
  }

  closeModal() {
    this.saveFilterModalCollapsed = true;
    this.showSaveFilterModal = false;
    this.filterClicked = false;
    this.leadsListInfo = this.backUpLeads;
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
    this.leadsListInfo = this.backUpLeads;
  }

  clickSavedFilters() {
    this.openSavedFiltersList = true;
    this.savedFiltersListCollapsed = false;
  }

  onChangeAcailable(value) {
    this.filterAvaliableTo = value;
  }

  saveFilter() {
    // const savingFilterData = this.leadsListInfo;
    // const savingFilterName = this.filterName;
    // const savingAvailability = this.filterAvaliableTo;
    this.savedFiltersArr.push({
                          savedFilter: this.leadsListInfo,
                          savedFilterName: this.filterName,
                          savedAvailabilty: this.filterAvaliableTo
                        });
    console.log('111', this.savedFiltersArr);
    this.saveFilterModalCollapsed = true;
    this.showSaveFilterModal = false;
    this.filterClicked = false;
    this.leadsListInfo = this.backUpLeads;
  }

  applySavedFilter(selectedFilter) {
    this.leadsListInfo = selectedFilter.savedFilter;
    this.savedFiltersListCollapsed = true;
    this.openSavedFiltersList = false;
  }

  removeFilter() {
    this.leadsListInfo = this.backUpLeads;
    this.savedFiltersListCollapsed = true;
    this.openSavedFiltersList = false;
  }
}
