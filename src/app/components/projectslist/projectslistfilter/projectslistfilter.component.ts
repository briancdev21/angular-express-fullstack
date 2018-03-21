import { Component, ChangeDetectorRef, Input, OnInit, HostListener, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import * as _ from 'lodash';
import { FilterService } from '../filter.service';
import { Ng2CompleterComponent } from '../../common/ng2completer/ng2completer.component';


@Component({
  selector: 'app-projectslistfilter',
  templateUrl: './projectslistfilter.component.html',
  styleUrls: [
    './projectslistfilter.component.css',
  ],
  providers: [FilterService]
})


export class ProjectsListFilterComponent implements OnInit {

  @Input() projectsListInfo;
  @Input() filters;
  @Input() collaborators;
  @Input() projectslistStatus;
  @Input() projectslistTypes;
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
  projectslistName: string;
  filteredProjectsList: any;
  applyClicked = false;
  backUpProjectsList: any;
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
    this.filteredProjectsList = this.projectsListInfo;
    this.backUpProjectsList = this.projectsListInfo;
    this.originFilters = Object.assign({}, this.filters);

    // Get customer list from Information list and remove duplicated names
    const a = this.projectsListInfo.map(i => i.customerName);
    this.customersList = a.filter(function(item, pos) {
      return a.indexOf(item) === pos;
    });

    this.projectsListInfo.map(i => i.timePassed = this.calcTimePassedDays(i.signedDate, i.status));
    // Get projects list from Information list
    this. projectsList = this.projectsListInfo.map( p => p.projectNumber);

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
      projectslistName: '',
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
    this.filteredProjectsList = this.backUpProjectsList;

    if (!this.overdueDaysFrom) { this.filters.overdueDaysFrom = 0; }
    if (!this.overdueDaysTo) { this.filters.overdueDaysTo = this.maxOverdueDays; }

    if (this.filters.totalFrom) {
      this.filteredProjectsList = this.filteredProjectsList.filter(projectslist => projectslist.projectTotal >= this.filters.totalFrom);
    }

    if (this.filters.totalTo) {
      this.filteredProjectsList = this.filteredProjectsList.filter(projectslist => projectslist.projectTotal <= this.filters.totalTo);
    }

    if (this.filters.estimatedFrom) {
      this.filteredProjectsList = this.filteredProjectsList.filter(projectslist => projectslist.estimatedBudget >= this.filters.estimatedFrom);
    }

    if (this.filters.estimatedTo) {
      this.filteredProjectsList = this.filteredProjectsList.filter(projectslist => projectslist.estimatedBudget <= this.filters.estimatedTo);
    }

    // if user does not set maximum overdue days, max value should be infinite
    if (this.filters.overdueDaysTo < 120) {
      this.filteredProjectsList = this.filteredProjectsList.filter(projectslist =>
        projectslist.timePassed >= this.filters.overdueDaysFrom && projectslist.timePassed <= this.filters.overdueDaysTo);
    } else if (this.filters.overdueDaysTo === 120) {
      this.filteredProjectsList = this.filteredProjectsList.filter(projectslist =>
        projectslist.timePassed >= this.filters.overdueDaysFrom);
    }
    if (this.filters.selectCustomer) {
      this.filteredProjectsList = this.filteredProjectsList.filter(customer => customer.customerName === this.filters.selectCustomer);
    }
    if (this.filters.selectProject) {
      this.filteredProjectsList = this.filteredProjectsList.filter(project => project.projectNumber === this.filters.selectProject);
    }

    if (this.filters.createdFrom) {
      this.filteredProjectsList = this.filteredProjectsList.filter(
        projectslist => Date.parse(projectslist.createdDate) >= Number(this.filters.createdFrom)
      );
    }
    if (this.filters.createdTo) {
      this.filteredProjectsList = this.filteredProjectsList.filter(
        projectslist => Date.parse(projectslist.createdDate) <= Number(this.filters.createdTo)
      );
    }
    // remove duplicates from array
    this.filteredProjectsList = Array.from(new Set(this.filteredProjectsList));

    this.filterParent.emit({filtered: this.filteredProjectsList, clicked: this.applyClicked});
  }
}
