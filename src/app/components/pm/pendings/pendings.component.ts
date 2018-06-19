import { Component, OnInit } from '@angular/core';
import { CommonComponent } from '../../common/common.component';
import { FilterService } from './filter.service';
@Component({
  selector: 'app-pendings',
  templateUrl: './pendings.component.html',
  styleUrls: [
    './pendings.component.css'
  ],
  entryComponents: [
    CommonComponent
  ],
  providers: [FilterService]
})
export class PendingsComponent implements OnInit {

  menuCollapsed = true;
  saveFilterModalCollapsed = true;
  showSaveFilterModal = false;
  filterClicked = false;
  backUpPendings: any;
  openSavedFiltersList = false;
  savedFiltersListCollapsed = true;
  savedFiltersArr = [];
  filterAvaliableTo: any;
  filterName = '';
  pendingTypes: any;

  constructor( private filterService: FilterService ) {
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

  public collaborators: Array<string> = [
  ];

  public pendingStatus: Array<string> = [
    'Due', 'Overdue', 'Paid', 'Net 15', 'Net 30', 'Estimate', 'Approved', 'Rejected'
  ];

  public pendingsListInfo: Array<Object> = [
  ];

  ngOnInit() {
    this.backUpPendings = this.pendingsListInfo;
  }

  getFilter(event) {
    this.pendingsListInfo = event.filtered;
    this.filterClicked = event.clicked;
  }

  addNewPending(event) {
    this.pendingsListInfo.push(event.data);
  }

  toggleMenubar(data: boolean) {
    this.menuCollapsed  = data;
  }

  closeModal() {
    this.saveFilterModalCollapsed = true;
    this.showSaveFilterModal = false;
    this.filterClicked = false;
    this.pendingsListInfo = this.backUpPendings;
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
    this.pendingsListInfo = this.backUpPendings;
  }

  clickSavedFilters() {
    this.openSavedFiltersList = true;
    this.savedFiltersListCollapsed = false;
  }

  onChangeAcailable(value) {
    this.filterAvaliableTo = value;
  }

  saveFilter() {
    // const savingFilterData = this.pendingsListInfo;
    // const savingFilterName = this.filterName;
    // const savingAvailability = this.filterAvaliableTo;
    this.savedFiltersArr.push({
                          savedFilter: this.pendingsListInfo,
                          savedFilterName: this.filterName,
                          savedAvailabilty: this.filterAvaliableTo
                        });
    this.saveFilterModalCollapsed = true;
    this.showSaveFilterModal = false;
    this.filterClicked = false;
    this.pendingsListInfo = this.backUpPendings;
  }

  applySavedFilter(selectedFilter) {
    this.pendingsListInfo = selectedFilter.savedFilter;
    this.savedFiltersListCollapsed = true;
    this.openSavedFiltersList = false;
  }

  removeFilter() {
    this.pendingsListInfo = this.backUpPendings;
    this.savedFiltersListCollapsed = true;
    this.openSavedFiltersList = false;
  }
}
