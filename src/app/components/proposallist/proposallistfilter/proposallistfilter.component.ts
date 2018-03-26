import { Component, ChangeDetectorRef, Input, OnInit, HostListener, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import * as _ from 'lodash';
import { FilterService } from '../filter.service';
import { Ng2CompleterComponent } from '../../common/ng2completer/ng2completer.component';


@Component({
  selector: 'app-proposallistfilter',
  templateUrl: './proposallistfilter.component.html',
  styleUrls: [
    './proposallistfilter.component.css',
  ],
  providers: [FilterService]
})


export class ProposalListFilterComponent implements OnInit {

  @Input() proposalListInfo;
  @Input() filters;
  @Input() owners;
  @Input() proposallistStatus;
  @Input() proposallistTypes;
  @Output() filterParent: EventEmitter<any> = new EventEmitter;

  customersList = [];
  projectsList = [];
  statusList = [];
  items2: any[] = [
    {id: 0, payload: {label: 'John Moss', imageUrl: 'assets/users/user1.png'}},
    {id: 1, payload: {label: 'Steve Jobs', imageUrl: 'assets/users/user2.png'}},
    {id: 2, payload: {label: 'Danny', imageUrl: 'assets/users/user3.png'}},
    {id: 3, payload: {label: 'John', imageUrl: 'assets/users/man.png'}},
  ];
  config2: any = {'placeholder': 'Type here', 'sourceField': ['payload', 'label']};

  public selectedMoment = new Date();
  public createdMin;
  public createdMax;
  public updatedMin;
  public updatedMax;
  public completedMin;
  public completedMax;
  public originFilters;
  selectStatus: string;
  createdDateFrom: Date;
  createdDateTo: Date;
  updatedDateFrom: Date;
  updatedDateTo: Date;
  completedDateFrom: Date;
  completedDateTo: Date;
  proposallistName: string;
  filteredProposalList: any;
  applyClicked = false;
  backUpProposalList: any;
  editable: boolean;
  newKeyword: string;
  selectedItem: any = '';
  inputChanged: any = '';
  selectCustomer =  '';
  selectProject = '';

  constructor( private filterService: FilterService, private ref: ChangeDetectorRef ) {
    const comp = this;
    document.addEventListener('click', function() {
      comp.editable = false;
    });
  }

  ngOnInit() {
    this.filteredProposalList = this.proposalListInfo;
    this.backUpProposalList = this.proposalListInfo;
    this.originFilters = Object.assign({}, this.filters);

    // Get customer list from Information list and remove duplicated names
    const a = this.proposalListInfo.map(i => i.contactName);
    this.customersList = a.filter(function(item, pos) {
      return a.indexOf(item) === pos;
    });

    // Get status list from Information list and remove duplicated status
    const b = this.proposalListInfo.map(i => i.dealStatus);
    this.statusList = b.filter(function(item, pos) {
      return b.indexOf(item) === pos;
    });

    this.proposalListInfo.map(i => i.timePassed = this.calcTimePassedDays(i.signedDate, i.status));
    // Get projects list from Information list
    this. projectsList = this.proposalListInfo.map( p => p.projectNumber);

  }

  calcTimePassedDays(sign, status) {
    const today = new Date();
    const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    const signDate = new Date(sign);
    const diffDays = Math.round((today.getTime() - signDate.getTime()) / (oneDay));
    if (diffDays < 0) {
      return 0;
    } else {
      return diffDays;
    }
  }

  onSelectedCustomer(val) {
    this.filters.selectCustomer = val;
    this.selectCustomer = val;
  }

  onSelectedProject(val) {
    this.filters.selectProject = val;
    this.selectProject = val;
  }

  onSelect(item: any) {
    this.selectedItem = item;
    this.items2 = this.items2.filter(function( obj ) {
      return obj.payload.label !== item.payload.label;
    });
    this.owners.push({name: item.payload.label, imageUrl: item.payload.imageUrl});
  }

  onInputChangedEvent(val: string) {
    this.inputChanged = val;
  }

  removeUser(i: number) {
    const item = this.owners[i];
    this.items2.push({id: this.items2.length, payload: {label: item.name, imageUrl: item.imageUrl}});
    this.owners.splice(i, 1);
  }

  selectCreatedFrom(event) {
    this.createdDateFrom = event.value;
    this.createdMin = this.createdDateFrom;
  }

  selectCreatedTo(event) {
    this.createdDateTo = event.value;
    this.createdMax = this.createdDateTo;
  }

  selectUpdatedFrom(event) {
    this.updatedDateFrom = event.value;
    this.updatedMin = this.updatedDateFrom;
  }

  selectUpdatedTo(event) {
    this.updatedDateTo = event.value;
    this.updatedMax = this.updatedDateTo;
  }

  selectCompletedFrom(event) {
    this.completedDateFrom = event.value;
    this.completedMin = this.completedDateFrom;
  }

  selectCompletedTo(event) {
    this.completedDateTo = event.value;
    this.completedMax = this.completedDateTo;
  }

  filterTxt (arr, searchKey) {
    return arr.filter(function(obj){
      return Object.keys(obj).some(function(key) {
        return obj[key].toString().includes(searchKey);
      });
    });
  }

  resetFilter() {
    this.selectCustomer = '';
    this.selectProject = '';

    this.filters = {
      createdFrom: '',
      createdTo: '',
      updatedFrom: '',
      updatedTo: '',
      completedFrom: '',
      completedTo: '',
      selectCustomer: '',
      selectStatus: '',
      owners: '',
      proposallistName: '',
      totalFrom: 0,
      totalTo: 0,
    };
    this.ref.detectChanges();
  }

  applyFilter() {
    this.applyClicked = true;
    this.filteredProposalList = this.backUpProposalList;

    if (this.owners[0]) {
      let ownerFiltered = [];
      let ownerFilteredList = [];
      this.filteredProposalList.forEach(element => {
        for ( let i = 0; i <= this.owners.length - 1; i ++) {
          ownerFiltered = this.filterTxt(element.owners, this.owners[i].name);
          if (ownerFiltered.length > 0) {
            ownerFilteredList = ownerFilteredList.concat(element);
          }
        }
      });
      this.filteredProposalList = ownerFilteredList;
    }

    if (this.filters.totalFrom) {
      this.filteredProposalList = this.filteredProposalList.filter(proposallist => proposallist.proposalAmount >= this.filters.totalFrom);
    }

    if (this.filters.totalTo) {
      this.filteredProposalList = this.filteredProposalList.filter(proposallist => proposallist.proposalAmount <= this.filters.totalTo);
    }
    if (this.filters.selectCustomer) {
      this.filteredProposalList = this.filteredProposalList.filter(customer => customer.contactName === this.filters.selectCustomer);
    }
    if (this.filters.selectStatus) {
      this.filteredProposalList = this.filteredProposalList.filter(project => project.dealStatus === this.filters.selectStatus);
    }

    if (this.filters.createdFrom) {
      this.filteredProposalList = this.filteredProposalList.filter(
        proposallist => Date.parse(proposallist.createdDate) >= Number(this.filters.createdFrom)
      );
    }
    if (this.filters.createdTo) {
      this.filteredProposalList = this.filteredProposalList.filter(
        proposallist => Date.parse(proposallist.createdDate) <= Number(this.filters.createdTo)
      );
    }

    if (this.filters.updatedFrom) {
      this.filteredProposalList = this.filteredProposalList.filter(
        proposallist => Date.parse(proposallist.updatedDate) >= Number(this.filters.updatedFrom)
      );
    }
    if (this.filters.updatedTo) {
      this.filteredProposalList = this.filteredProposalList.filter(
        proposallist => Date.parse(proposallist.updatedDate) <= Number(this.filters.updatedTo)
      );
    }

    if (this.filters.completedFrom) {
      this.filteredProposalList = this.filteredProposalList.filter(
        proposallist => Date.parse(proposallist.completionDate) >= Number(this.filters.completedFrom)
      );
    }
    if (this.filters.completedTo) {
      this.filteredProposalList = this.filteredProposalList.filter(
        proposallist => Date.parse(proposallist.completionDate) <= Number(this.filters.completedTo)
      );
    }
    // remove duplicates from array
    this.filteredProposalList = Array.from(new Set(this.filteredProposalList));

    this.filterParent.emit({filtered: this.filteredProposalList, clicked: this.applyClicked});
  }
}
