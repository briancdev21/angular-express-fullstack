import { Component, OnInit } from '@angular/core';
import { CommonComponent } from '../../common/common.component';
import { Router, ActivatedRoute } from '@angular/router';
import { FilterService } from './filter.service';
import { SharedService } from '../../../services/shared.service';
import { CollaboratorsService } from '../../../services/collaborators.service';
import * as moment from 'moment';

@Component({
  selector: 'app-workorders',
  templateUrl: './workorders.component.html',
  styleUrls: [
    './workorders.component.css'
  ],
  entryComponents: [
    CommonComponent
  ],
  providers: [FilterService]
})
export class WorkOrdersComponent implements OnInit {

  menuCollapsed = true;
  saveFilterModalCollapsed = true;
  showSaveFilterModal = false;
  filterClicked = false;
  backUpWorkOrders: any;
  openSavedFiltersList = false;
  savedFiltersListCollapsed = true;
  savedFiltersArr = [];
  filterAvaliableTo: any;
  filterName = '';
  workorderTypes: any;
  usersList = [];
  contactsList: any;
  workOrdersList: any;

  constructor( private filterService: FilterService, private sharedService: SharedService,
    private collaboratorsService: CollaboratorsService, private route: ActivatedRoute  ) {
    this.filterAvaliableTo = 'everyone';

    this.sharedService.getUsers().subscribe(user => {
      this.usersList = user;
        this.collaboratorsService.getWorkOrders().subscribe(res => {
          this.workOrdersList = res.results;
          const workOrderContactIds = this.workOrdersList.map(w => w.contactId);
          this.sharedService.getMulipleContacts(workOrderContactIds).subscribe(contact => {
            this.contactsList = contact;
            this.addContactName(this.contactsList);

            this.workOrdersList.forEach(element => {
              const colArr = [];
              element.startTime = moment(element.startDate).format('hh:mm a');
              element.endTime = moment(element.endDate).format('hh:mm a');
              element.startDate = moment(element.startDate).format('MMMM DD, YYYY');
              element.contactName = this.getContactNameFromId(element.contactId);
              element.barInfo = {
                title: element.completion + '%',
                completeness: element.completion
              };
              if (element.collaborators) {
                element.collaborators.forEach(col => {
                  colArr.push(this.usersList.filter(u => u.username === col)[0]);
                });
              }
              element.collaboratorsData = colArr;
            });
            console.log('work order list: ', this.workOrdersList);
          });
        });
    });
  }

  public workorderStatus = ['Not started', 'Not complete', 'Delivered', 'In progress', 'Complete'];

  public filters  = {
    startedFrom: '',
    startedTo: '',
    updatedFrom: '',
    updatedTo: '',
    selectTag: '',
    selectStatus: '',
  };

  public collaborators: Array<string> = [
  ];

  public workOrdersInfo = [];

  ngOnInit() {
    this.backUpWorkOrders = this.workOrdersInfo;
  }

  getFilter(event) {
    this.workOrdersInfo = event.filtered;
    this.filterClicked = event.clicked;
  }

  addNewWorkOrder(event) {
    this.workOrdersInfo.push(event.data);
  }

  toggleMenubar(data: boolean) {
    this.menuCollapsed  = data;
  }

  closeModal() {
    this.saveFilterModalCollapsed = true;
    this.showSaveFilterModal = false;
    this.filterClicked = false;
    this.workOrdersInfo = this.backUpWorkOrders;
  }

  addContactName(data) {
    data.forEach(element => {
      if (element.type === 'PERSON') {
        element.name = element.person.firstName + ' ' + element.person.lastName;
      } else {
        element.name = element.business.name;
      }
    });
    return data;
  }

  cancelFilter() {
    this.filters = {
      startedFrom: '',
      startedTo: '',
      updatedFrom: '',
      updatedTo: '',
      selectTag: '',
      selectStatus: '',
    };
    this.filterClicked = false;
    this.workOrdersInfo = this.backUpWorkOrders;
  }

  clickSavedFilters() {
    this.openSavedFiltersList = true;
    this.savedFiltersListCollapsed = false;
  }

  onChangeAcailable(value) {
    this.filterAvaliableTo = value;
  }

  saveFilter() {
    // const savingFilterData = this.workOrdersInfo;
    // const savingFilterName = this.filterName;
    // const savingAvailability = this.filterAvaliableTo;
    this.savedFiltersArr.push({
                          savedFilter: this.workOrdersInfo,
                          savedFilterName: this.filterName,
                          savedAvailabilty: this.filterAvaliableTo
                        });
    this.saveFilterModalCollapsed = true;
    this.showSaveFilterModal = false;
    this.filterClicked = false;
    this.workOrdersInfo = this.backUpWorkOrders;
  }

  applySavedFilter(selectedFilter) {
    this.workOrdersInfo = selectedFilter.savedFilter;
    this.savedFiltersListCollapsed = true;
    this.openSavedFiltersList = false;
  }

  removeFilter() {
    this.workOrdersInfo = this.backUpWorkOrders;
    this.savedFiltersListCollapsed = true;
    this.openSavedFiltersList = false;
  }

  getContactNameFromId(id) {
    const selectedContact = this.contactsList.filter(c => c.id === id)[0];
    return selectedContact.name;
  }
}
