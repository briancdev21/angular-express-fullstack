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
  @Input() collaborators;
  @Input() proposallistStatus;
  @Input() proposallistTypes;
  @Output() filterParent: EventEmitter<any> = new EventEmitter;

  customersList = [];
  projectsList = [];
  items2: any[] = [
    {id: 0, payload: {label: 'Michael', imageUrl: 'assets/users/user1.png'}},
    {id: 1, payload: {label: 'Joseph', imageUrl: 'assets/users/user2.png'}},
    {id: 2, payload: {label: 'Danny', imageUrl: 'assets/users/user3.png'}},
    {id: 3, payload: {label: 'John', imageUrl: 'assets/users/man.png'}},
  ];
  config2: any = {'placeholder': 'Type here', 'sourceField': ['payload', 'label']};

  public selectedMoment = new Date();
  public createdMin;
  public createdMax;
  public originFilters;
  createdDateFrom: Date;
  createdDateTo: Date;
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
  maxOverdueDays = 120;
  overdueDaysFrom = 0;
  overdueDaysTo = 120;

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
    const a = this.proposalListInfo.map(i => i.customerName);
    this.customersList = a.filter(function(item, pos) {
      return a.indexOf(item) === pos;
    });

    this.proposalListInfo.map(i => i.timePassed = this.calcTimePassedDays(i.signedDate, i.status));
    // Get projects list from Information list
    this. projectsList = this.proposalListInfo.map( p => p.projectNumber);

    this.overdueDaysFrom = this.filters.overdueDaysFrom ? this.filters.overdueDaysFrom : 0;
    this.overdueDaysTo = this.filters.overdueDaysTo ? this.filters.overdueDaysTo : 120;
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

  overdueDaysRangeSliderChange(event) {
    this.overdueDaysFrom = event.from;
    this.overdueDaysTo = event.to;
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
    this.collaborators.push({name: item.payload.label, imageUrl: item.payload.imageUrl});
  }

  onInputChangedEvent(val: string) {
    this.inputChanged = val;
  }

  removeUser(i: number) {
    const item = this.collaborators[i];
    this.items2.push({id: this.items2.length, payload: {label: item.name, imageUrl: item.imageUrl}});
    this.collaborators.splice(i, 1);
  }

  selectCreatedFrom(event) {
    this.createdDateFrom = event.value;
    this.createdMin = this.createdDateFrom;
  }

  selectCreatedTo(event) {
    this.createdDateTo = event.value;
    this.createdMax = this.createdDateTo;
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
    this.overdueDaysFrom = 0;
    this.overdueDaysTo = this.maxOverdueDays;

    this.filters = {
      overdueDaysFrom : 0,
      overdueDaysTo : this.maxOverdueDays,
      createdFrom: '',
      createdTo: '',
      selectCustomer: '',
      selectProject: '',
      collaborators: '',
      proposallistName: '',
      totalFrom: 0,
      totalTo: 0,
      estimatedFrom: 0,
      estimatedTo: 0,
    };
    this.ref.detectChanges();
  }

  applyFilter() {

    this.filters.overdueDaysFrom = this.overdueDaysFrom;
    this.filters.overdueDaysTo = this.overdueDaysTo;
    this.applyClicked = true;
    this.filteredProposalList = this.backUpProposalList;

    if (!this.overdueDaysFrom) { this.filters.overdueDaysFrom = 0; }
    if (!this.overdueDaysTo) { this.filters.overdueDaysTo = this.maxOverdueDays; }

    if (this.filters.totalFrom) {
      this.filteredProposalList = this.filteredProposalList.filter(proposallist => proposallist.projectTotal >= this.filters.totalFrom);
    }

    if (this.filters.totalTo) {
      this.filteredProposalList = this.filteredProposalList.filter(proposallist => proposallist.projectTotal <= this.filters.totalTo);
    }

    if (this.filters.estimatedFrom) {
      this.filteredProposalList = this.filteredProposalList.filter(proposallist => proposallist.estimatedBudget >= this.filters.estimatedFrom);
    }

    if (this.filters.estimatedTo) {
      this.filteredProposalList = this.filteredProposalList.filter(proposallist => proposallist.estimatedBudget <= this.filters.estimatedTo);
    }

    // if user does not set maximum overdue days, max value should be infinite
    if (this.filters.overdueDaysTo < 120) {
      this.filteredProposalList = this.filteredProposalList.filter(proposallist =>
        proposallist.timePassed >= this.filters.overdueDaysFrom && proposallist.timePassed <= this.filters.overdueDaysTo);
    } else if (this.filters.overdueDaysTo === 120) {
      this.filteredProposalList = this.filteredProposalList.filter(proposallist =>
        proposallist.timePassed >= this.filters.overdueDaysFrom);
    }
    if (this.filters.selectCustomer) {
      this.filteredProposalList = this.filteredProposalList.filter(customer => customer.customerName === this.filters.selectCustomer);
    }
    if (this.filters.selectProject) {
      this.filteredProposalList = this.filteredProposalList.filter(project => project.projectNumber === this.filters.selectProject);
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
    // remove duplicates from array
    this.filteredProposalList = Array.from(new Set(this.filteredProposalList));

    this.filterParent.emit({filtered: this.filteredProposalList, clicked: this.applyClicked});
  }
}
