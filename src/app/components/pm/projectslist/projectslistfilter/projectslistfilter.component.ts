import { Component, ChangeDetectorRef, Input, OnInit, HostListener, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import * as _ from 'lodash';
import { FilterService } from '../filter.service';
import { Ng2CompleterComponent } from '../../../common/ng2completer/ng2completer.component';


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
    {id: 0, label: 'John Moss', imageUrl: 'assets/users/user1.png'},
    {id: 1, label: 'Steve Jobs', imageUrl: 'assets/users/user2.png'},
    {id: 2, label: 'Bob Agile', imageUrl: 'assets/users/user3.png'},
    {id: 3, label: 'John Moss', imageUrl: 'assets/users/man.png'},
  ];
  config2: any = {'placeholder': 'Type here', 'sourceField': 'label'};

  public createdMin;
  public createdMax;
  public originFilters;
  deliveryDateFrom: Date;
  createdDateTo: Date;
  projectName: string;
  filteredProjectsList: any;
  applyClicked = false;
  backUpProjectsList: any;
  editable: boolean;
  newKeyword: string;
  selectedItem: any = '';
  inputChanged: any = '';
  selectCustomer =  '';
  selectProject = '';
  maxProjectHealth = 100;
  projectHealthFrom = 0;
  projectHealthTo = 100;
  maxProjectTotal = 0;
  projectTotalFrom = 0;
  projectTotalTo = 0;
  filterClicked = false;
  isAutocompleteUpdated = false;

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

    // Get total max value in projectsListInfo
    this.maxProjectTotal = Math.max(...this.projectsListInfo.map(i => i.total));

    this.projectsListInfo.map(i => i.timePassed = this.calcTimePassedDays(i.signedDate, i.status));
    // Get projects list from Information list
    this. projectsList = this.projectsListInfo.map( p => p.projectNumber);

    this.projectHealthFrom = this.filters.projectHealthFrom ? this.filters.projectHealthFrom : 0;
    this.projectHealthTo = this.filters.projectHealthTo ? this.filters.projectHealthTo : 100;

    this.projectTotalFrom = this.filters.projectTotalFrom;
    this.projectTotalTo = this.filters.projectTotalTo;
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

  projectHealthRangeSliderChange(event) {
    this.projectHealthFrom = event.from;
    this.projectHealthTo = event.to;
  }

  projectTotalRangeSliderChange(event) {
    this.projectTotalFrom = event.from;
    this.projectTotalTo = event.to;
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
      return obj.label !== item.label;
    });
    this.collaborators.push({name: item.label, imageUrl: item.imageUrl});
  }

  onInputChangedEvent(val: string) {
    this.inputChanged = val;
  }

  removeUser(i: number) {
    const item = this.collaborators[i];
    this.items2.push({id: this.items2.length, label: item.name, imageUrl: item.imageUrl});
    this.collaborators.splice(i, 1);
    this.isAutocompleteUpdated = !this.isAutocompleteUpdated;
  }

  selectCreatedFrom(event) {
    this.deliveryDateFrom = event.value;
    this.createdMin = this.deliveryDateFrom;
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
    this.projectHealthFrom = 0;
    this.projectHealthTo = this.maxProjectHealth;
    this.projectTotalFrom = 0;
    this.projectTotalTo = this.maxProjectTotal;

    this.filters = {
      projectHealthFrom : 0,
      projectHealthTo : this.maxProjectHealth,
      projectTotalFrom : 0,
      projectTotalTo : this.maxProjectTotal,
      createdFrom: '',
      createdTo: '',
      selectCustomer: '',
      selectProject: '',
      collaborators: '',
      projectName: '',
    };
    this.ref.detectChanges();
  }

  applyFilter() {

    this.filters.projectHealthFrom = this.projectHealthFrom;
    this.filters.projectHealthTo = this.projectHealthTo;

    this.filters.projectTotalFrom = this.projectTotalFrom;
    this.filters.projectTotalTo = this.projectTotalTo;

    this.applyClicked = true;
    this.filteredProjectsList = this.backUpProjectsList;

    if (this.collaborators[0]) {
      let ownerFiltered = [];
      let ownerFilteredList = [];
      for ( let i = 0; i <= this.collaborators.length - 1; i ++) {
        ownerFiltered = this.filterTxt(this.filteredProjectsList, this.collaborators[i].name);
        ownerFilteredList = ownerFilteredList.concat(ownerFiltered);
      }
      this.filteredProjectsList = ownerFilteredList;
    }

    if (!this.projectHealthFrom) { this.filters.projectHealthFrom = 0; }
    if (!this.projectHealthTo) { this.filters.projectHealthTo = this.maxProjectHealth; }

    if (!this.projectTotalFrom) { this.filters.projectTotalFrom = 0; }
    if (!this.projectTotalTo) { this.filters.projectTotalTo = this.maxProjectTotal; }

    // Filter function

    this.filteredProjectsList = this.filteredProjectsList.filter(projectslist =>
      projectslist.projectHealth >= this.filters.projectHealthFrom && projectslist.projectHealth <= this.filters.projectHealthTo);

    this.filteredProjectsList = this.filteredProjectsList.filter(projectslist =>
      projectslist.total >= this.filters.projectTotalFrom && projectslist.total <= this.filters.projectTotalTo);
    if (this.filters.selectCustomer) {
      this.filteredProjectsList = this.filteredProjectsList.filter(customer => customer.customerName === this.filters.selectCustomer);
    }
    if (this.filters.selectProject) {
      this.filteredProjectsList = this.filteredProjectsList.filter(project => project.projectNumber === this.filters.selectProject);
    }
    if (this.filters.createdFrom) {
      this.filteredProjectsList = this.filteredProjectsList.filter(
        projectslist => Date.parse(projectslist.deliveryDate) >= Number(this.filters.createdFrom)
      );
    }
    if (this.filters.createdTo) {
      this.filteredProjectsList = this.filteredProjectsList.filter(
        projectslist => Date.parse(projectslist.deliveryDate) <= Number(this.filters.createdTo)
      );
    }
    // remove duplicates from array
    this.filteredProjectsList = Array.from(new Set(this.filteredProjectsList));

    this.filterParent.emit({filtered: this.filteredProjectsList, clicked: this.applyClicked});
  }
}
