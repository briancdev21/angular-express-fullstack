import { Component, OnInit } from '@angular/core';
import { CommonComponent } from '../../common/common.component';
import { FilterService } from './filter.service';
import { ProposalsService } from '../../../services/proposals.service';
import { SalesService } from '../sales.service';
import { SharedService } from '../../../services/shared.service';

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
  contactsList = [];
  usersList = [];

  constructor( private filterService: FilterService, private proposalsService: ProposalsService, private salesService: SalesService,
    private sharedService: SharedService ) {
    this.filterAvaliableTo = 'everyone';
    this.sharedService.getUsers().subscribe(user => {
      this.usersList = user;
      this.sharedService.getContacts().subscribe(res => {
        this.contactsList = res;
        this.retrieveData();
      });
    });


    this.salesService.proposalAdded.subscribe(data => {
      if (data) {
        this.retrieveData();
      }
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
    'NEW', 'FOLLOW_UP', 'SEEN', 'DEMO', 'NEGOTIOTION', 'WON', 'LOST'
  ];

  public proposalListInfo = [
  ];

  ngOnInit() {
    this.backUpProposalList = this.proposalListInfo;
  }

  retrieveData() {
    this.proposalsService.getProposals().subscribe(res => {
      this.proposalListInfo = res.results;
      this.proposalListInfo.forEach(ele => {
        ele['contactName'] = this.getContactName(this.getContactIdFromString(ele.contactId));
        let owners = [];
        const ownersDetails = [];
        owners.push(ele.designer);
        owners.push(ele.projectManager);
        owners.push(ele.accountManager);
        owners = Array.from(new Set(owners));
        owners.forEach(owner => {
          ownersDetails.push(this.usersList.filter(u => u.username === owner)[0]);
        });
        ele.owners = ownersDetails;
      });
    });
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

  getContactName(id) {
    const selectedContact = this.contactsList.filter(c => c.id === id)[0];
    if (selectedContact.type === 'PERSON') {
      return selectedContact.person.firstName + ' ' + selectedContact.person.lastName ;
    } else if (selectedContact.type === 'BUSINESS') {
      return selectedContact.business.name;
    }
  }

  getContactIdFromString(str) {
    const strArr = str.split('-');
    return strArr[strArr.length - 1];
  }
}
