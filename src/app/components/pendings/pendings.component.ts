import { Component, OnInit } from '@angular/core';
import { CommonComponent } from '../common/common.component';
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

  public pendingStatus: Array<string> = [
    'Due', 'Overdue', 'Paid', 'Net 15', 'Net 30', 'Estimate', 'Approved', 'Rejected'
  ];

  public pendingsListInfo: Array<Object> = [
    {
      projectNumber: 'PR 021704',
      projectName: 'Remodel with your Nu Life',
      customerName: 'John Moss',
      estimatedBudget: 10203.32,
      projectTotal: 22323.67,
      signedDate: 'March 14, 2018',
      timePassed: '',
      collaborators: {
        name: 'John Moss',
        imgUrl: 'assets/images/user1.png'
      }
    },
    {
      projectNumber: 'PR 021702',
      projectName: 'Fake Sample Project Name',
      customerName: 'Fake Customer',
      estimatedBudget: 23430.32,
      projectTotal: 30289.94,
      signedDate: 'February 16, 2018',
      timePassed: '',
      collaborators: {
        name: 'John Moss',
        imgUrl: 'assets/images/user1.png'
      }
    },
    {
      projectNumber: 'PR 021705',
      projectName: 'Really Interesting Project',
      customerName: 'Interesting Customer',
      estimatedBudget: 30232.37,
      projectTotal: 65984.02,
      signedDate: 'January 2, 2018',
      timePassed: '',
      collaborators: {
        name: 'Nick',
        imgUrl: 'assets/images/user2.png'
      }
    },
    {
      projectNumber: 'PR 021706',
      projectName: 'Remodel with your Nu Life',
      customerName: 'Paul',
      estimatedBudget: 10293.32,
      projectTotal: 22399.67,
      signedDate: 'March 24, 2018',
      timePassed: '',
      collaborators: {
        name: 'John Moss',
        imgUrl: 'assets/images/user1.png'
      }
    },
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
