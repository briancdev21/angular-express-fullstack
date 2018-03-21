import { Component, OnInit } from '@angular/core';
import { CommonComponent } from '../common/common.component';
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
    {
      projectsListNumber: 'WO12345',
      projectsListName: 'Work Order Title Here',
      customerName: 'John Moss',
      startDate: 'November 20, 2017',
      scheduledStart: '8:00 AM',
      scheduledEnd: '6:30 PM',
      completion: 33,
      collaborators: [
        {
          name: 'John Moss',
          imgUrl: 'assets/users/user1.png'
        }
      ]
    },
    {
      projectsListNumber: 'WO12344',
      projectsListName: 'Work Order Title Here',
      customerName: 'John Moss',
      startDate: 'November 19, 2017',
      scheduledStart: '12:00 PM',
      scheduledEnd: '6:30 PM',
      completion: 64,
      collaborators: [
        {
          name: 'John Moss',
          imgUrl: 'assets/users/user1.png'
        },
        {
          name: 'Michael',
          imgUrl: 'assets/users/user2.png'
        }
      ]
    },
    {
      projectsListNumber: 'WO12343',
      projectsListName: 'Work Order Title Here',
      customerName: 'Agile Smith',
      startDate: 'November 18, 2017',
      scheduledStart: '8:00 AM',
      scheduledEnd: '11:00 AM',
      completion: 89,
      collaborators: [
        {
          name: 'John Moss',
          imgUrl: 'assets/users/user1.png'
        }
      ]
    },
    {
      projectsListNumber: 'WO12343',
      projectsListName: 'Work Order Title Here',
      customerName: 'Agile Smith',
      startDate: 'November 10, 2017',
      scheduledStart: '8:00 AM',
      scheduledEnd: '6:30 PM',
      completion: 59,
      collaborators: [
        {
          name: 'Agile Smith',
          imgUrl: 'assets/users/user3.png'
        }
      ]
    },
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
