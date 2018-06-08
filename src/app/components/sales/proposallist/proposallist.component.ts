import { Component, OnInit } from '@angular/core';
import { CommonComponent } from '../../common/common.component';
import { FilterService } from './filter.service';
import { ProposalsService } from '../../../services/proposals.service';

@Component({
  selector: 'app-proposallist',
  templateUrl: './proposallist.component.html',
  styleUrls: [
    './proposallist.component.css'
  ],
  entryComponents: [
    CommonComponent
  ],
  providers: [FilterService]
})
export class ProposalListComponent implements OnInit {

  menuCollapsed = true;
  saveFilterModalCollapsed = true;
  showSaveFilterModal = false;
  filterClicked = false;
  backUpProposalList: any;
  openSavedFiltersList = false;
  savedFiltersListCollapsed = true;
  savedFiltersArr = [];
  filterAvaliableTo: any;
  filterName = '';
  proposallistTypes: any;

  constructor( private filterService: FilterService, private proposalsService: ProposalsService ) {
    this.filterAvaliableTo = 'everyone';

    this.proposalsService.getProposals().subscribe(res => {
      this.proposalListInfo = res.results;
      console.log('Proposals list: ', res);
    });
  }


  public filters  = {
    createdFrom: '',
    createdTo: '',
    updatedFrom: '',
    updatedTo: '',
    selectTag: '',
    selectStatus: '',
  };

  public owners: Array<string> = [
  ];

  public proposallistStatus: Array<string> = [
    'Due', 'Overdue', 'Paid', 'Net 15', 'Net 30', 'Estimate', 'Approved', 'Rejected'
  ];

  public proposalListInfo: Array<Object> = [
    // {
    //   proposalId: '123465',
    //   contactName: 'Diana Llic',
    //   projectName: 'Live your Nu Life',
    //   proposalAmount: 24202.37,
    //   createdDate: 'November 20, 2017',
    //   updatedDate: 'December 15, 2017',
    //   completionDate: 'March 20, 2018',
    //   dealStatus: 'New',
    //   revision: 0,
    //   owners: [
    //     {
    //       name: 'John Moss',
    //       imgUrl: 'assets/users/user1.png'
    //     }
    //   ]
    // },
  ];

  ngOnInit() {
    this.backUpProposalList = this.proposalListInfo;
  }

  getFilter(event) {
    this.proposalListInfo = event.filtered;
    this.filterClicked = event.clicked;
  }

  addNewProposalList(event) {
    this.proposalListInfo.push(event.data);
  }

  toggleMenubar(data: boolean) {
    this.menuCollapsed  = data;
  }

  closeModal() {
    this.saveFilterModalCollapsed = true;
    this.showSaveFilterModal = false;
    this.filterClicked = false;
    this.proposalListInfo = this.backUpProposalList;
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
    this.proposalListInfo = this.backUpProposalList;
  }

  clickSavedFilters() {
    this.openSavedFiltersList = true;
    this.savedFiltersListCollapsed = false;
  }

  onChangeAcailable(value) {
    this.filterAvaliableTo = value;
  }

  saveFilter() {
    // const savingFilterData = this.proposalListInfo;
    // const savingFilterName = this.filterName;
    // const savingAvailability = this.filterAvaliableTo;
    this.savedFiltersArr.push({
                          savedFilter: this.proposalListInfo,
                          savedFilterName: this.filterName,
                          savedAvailabilty: this.filterAvaliableTo
                        });
    this.saveFilterModalCollapsed = true;
    this.showSaveFilterModal = false;
    this.filterClicked = false;
    this.proposalListInfo = this.backUpProposalList;
  }

  applySavedFilter(selectedFilter) {
    this.proposalListInfo = selectedFilter.savedFilter;
    this.savedFiltersListCollapsed = true;
    this.openSavedFiltersList = false;
  }

  removeFilter() {
    this.proposalListInfo = this.backUpProposalList;
    this.savedFiltersListCollapsed = true;
    this.openSavedFiltersList = false;
  }
}
