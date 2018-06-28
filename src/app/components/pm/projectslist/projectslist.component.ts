import { Component, OnInit } from '@angular/core';
import { CommonComponent } from '../../common/common.component';
import { FilterService } from './filter.service';
@Component({
  selector: 'app-projectslist',
  templateUrl: './projectslist.component.html',
  styleUrls: [
    './projectslist.component.css'
  ],
  entryComponents: [
    CommonComponent
  ],
  providers: [FilterService]
})
export class ProjectsListComponent implements OnInit {

  menuCollapsed = true;
  saveFilterModalCollapsed = true;
  showSaveFilterModal = false;
  filterClicked = false;
  backUpProjectsList: any;
  openSavedFiltersList = false;
  savedFiltersListCollapsed = true;
  savedFiltersArr = [];
  filterAvaliableTo: any;
  filterName = '';
  projectslistTypes: any;

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

  public projectslistStatus: Array<string> = [
    'Due', 'Overdue', 'Paid', 'Net 15', 'Net 30', 'Estimate', 'Approved', 'Rejected'
  ];

  public projectsListInfo: Array<Object> = [
    // {
    //   projectNumber: 'NU8802-0159',
    //   projectName: 'Remodel with your Nu Life',
    //   customerName: 'John Moss',
    //   endDate: 'November 20, 2017',
    //   projectHealth: 33,
    //   total: 22323.67,
    //   collaborators: [
    //     {
    //       name: 'John Moss',
    //       imgUrl: 'assets/users/user1.png'
    //     }
    //   ]
    // },
  ];

  ngOnInit() {
    this.backUpProjectsList = this.projectsListInfo;
  }

  getFilter(event) {
    this.projectsListInfo = event.filtered;
    this.filterClicked = event.clicked;
  }

  addNewProjectsList(event) {
    this.projectsListInfo.push(event.data);
  }

  toggleMenubar(data: boolean) {
    this.menuCollapsed  = data;
  }

  closeModal() {
    this.saveFilterModalCollapsed = true;
    this.showSaveFilterModal = false;
    this.filterClicked = false;
    this.projectsListInfo = this.backUpProjectsList;
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
    this.projectsListInfo = this.backUpProjectsList;
  }

  clickSavedFilters() {
    this.openSavedFiltersList = true;
    this.savedFiltersListCollapsed = false;
  }

  onChangeAcailable(value) {
    this.filterAvaliableTo = value;
  }

  saveFilter() {
    // const savingFilterData = this.projectsListInfo;
    // const savingFilterName = this.filterName;
    // const savingAvailability = this.filterAvaliableTo;
    this.savedFiltersArr.push({
                          savedFilter: this.projectsListInfo,
                          savedFilterName: this.filterName,
                          savedAvailabilty: this.filterAvaliableTo
                        });
    this.saveFilterModalCollapsed = true;
    this.showSaveFilterModal = false;
    this.filterClicked = false;
    this.projectsListInfo = this.backUpProjectsList;
  }

  applySavedFilter(selectedFilter) {
    this.projectsListInfo = selectedFilter.savedFilter;
    this.savedFiltersListCollapsed = true;
    this.openSavedFiltersList = false;
  }

  removeFilter() {
    this.projectsListInfo = this.backUpProjectsList;
    this.savedFiltersListCollapsed = true;
    this.openSavedFiltersList = false;
  }
}
