import { Component, ChangeDetectorRef, Input, OnInit, HostListener, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import * as _ from 'lodash';
import { FilterService } from '../filter.service';


@Component({
  selector: 'app-contactfilter',
  templateUrl: './contactfilter.component.html',
  styleUrls: [
    './contactfilter.component.css',
  ],
  providers: [FilterService]
})


export class ContactFilterComponent implements OnInit {

  @Input() contactsListInfo;
  @Input() filters;
  @Input() contactOwners;
  @Input() contactStatus;
  @Input() contactTypes;
  @Output() filterParent: EventEmitter<any> = new EventEmitter;


  items2: any[] = [
    'John Smith', 'John Moss', 'Diana Ilic'
  ];
  config2: any = {'placeholder': 'No Result', 'sourceField': ''};

  public selectedMoment = new Date();
  public createdMin;
  public updatedMin;
  public createdMax;
  public updatedMax;
  public lastMax;
  public lastMin;
  public originFilters;
  // scoreFrom = 28;
  // scoreTo = 60;
  createdDateFrom: Date;
  createdDateTo: Date;
  updatedDateFrom: Date;
  updatedDateTo: Date;
  lastDateTo: Date;
  lastDateFrom: Date;
  selectOwner: string;
  location: string;
  selectStatus: string;
  filteredContactsList: any;
  applyClicked = false;
  filteredContacts: any;
  backUpContacts: any;
  editable: boolean;
  newKeyword: string;
  selectedItem: any = '';
  inputChanged: any = '';
  filterClicked = false;
  isAutocompleteUpdated = false;

  constructor( private filterService: FilterService, private ref: ChangeDetectorRef ) {
    const comp = this;
    document.addEventListener('click', function() {
      comp.editable = false;
    });
  }

  ngOnInit() {
    this.filteredContacts = this.contactsListInfo;
    this.backUpContacts = this.contactsListInfo;
    this.originFilters = Object.assign({}, this.filters);
    const cmp = this;
    for (let i = 0; i < this.contactOwners.length; i++) {
      this.items2 = this.items2.filter(function( obj ) {
        return obj !== cmp.contactOwners[i];
      });
    }

    // this.scoreFrom = this.filters.scoreFrom;
    // this.scoreTo = this.filters.scoreTo;
  }

  onSelect(item: any) {
    this.selectedItem = item;
    this.items2 = this.items2.filter(function( obj ) {
      return obj !== item;
    });
    this.contactOwners.push(item);
  }

  onInputChangedEvent(val: string) {
    this.inputChanged = val;
  }

  removeUser(i: number) {
    const item = this.contactOwners[i];
    this.items2.push(item);
    this.contactOwners.splice(i, 1);
    this.isAutocompleteUpdated = !this.isAutocompleteUpdated;
  }

  // rangeSliderChange(event) {
  //   this.scoreFrom = event.from;
  //   this.scoreTo = event.to;
  // }

  selectCreatedFrom(event) {
    this.createdDateFrom = event.value;
    this.createdMin = this.createdDateFrom;
  }

  selectCreatedTo(event) {
    this.createdDateTo = event.value;
    this.createdMax = this.createdDateTo;
  }

  selectLastFrom(event) {
    this.lastDateFrom = event.value;
    this.lastMin = this.lastDateFrom;
  }

  selectLastTo(event) {
    this.lastDateTo = event.value;
    this.lastMax = this.lastDateTo;
  }

  selectUpdatedFrom(event) {
    this.updatedDateFrom = event.value;
    this.updatedMin = this.updatedDateFrom;
  }

  selectUpdatedTo(event) {
    this.updatedDateTo = event.value;
    this.updatedMax = this.updatedDateTo;
  }

  filterTxt (arr, searchKey) {
    return arr.filter(function(obj){
      return Object.keys(obj).some(function(key) {
        return obj[key].toString().includes(searchKey);
      });
    });
  }

  resetFilter() {
    // this.scoreFrom = 0;
    // this.scoreTo = 100;
    this.filters = {
      // scoreFrom : 0,
      // scoreTo : 100,
      createdDateFrom: '',
      createdDateTo: '',
      updatedDateFrom: '',
      updatedDateTo: '',
      lastDateFrom: '',
      lastDateTo: '',
      selectOwner: '',
      location: '',
      selectStatus: '',
    };
    this.ref.detectChanges();
  }

  applyFilter() {
    // this.filters.scoreFrom = this.scoreFrom;
    // this.filters.scoreTo = this.scoreTo;
    this.applyClicked = true;
    this.filteredContacts = this.backUpContacts;

    if (this.contactOwners[0]) {
      let ownerFiltered = [];
      let ownerFilteredList = [];
      for ( let i = 0; i <= this.contactOwners.length - 1; i ++) {
        ownerFiltered = this.filterTxt(this.contactsListInfo, this.contactOwners[i]);
        ownerFilteredList = ownerFilteredList.concat(ownerFiltered);
      }
      this.filteredContacts = ownerFilteredList;
    }

    if (this.filters.location) {
      this.filteredContacts = this.filterTxt(this.contactsListInfo, this.filters.location);
    }

    // this.filteredContacts = this.filteredContacts.filter(
    //   contact => contact.score >= this.filters.scoreFrom && contact.score <= this.filters.scoreTo
    // );

    if (this.filters.selectStatus) {
      if (this.filters.selectStatus === 'Project') {
        this.filteredContacts = this.filteredContacts.filter(contact => contact.account > 0);
      } else if (this.filters.selectStatus === 'Invoice') {
        this.filteredContacts = this.filteredContacts.filter(contact => contact.association > 0);
      } else {
        this.filteredContacts = this.filteredContacts.filter(contact => contact.association > 0 && contact.account > 0);
      }
    }

    if (this.filters.selectType) {
      this.filteredContacts = this.filteredContacts.filter(contact => contact.accountType == this.filters.selectType);
    }

    if (this.filters.createdFrom) {
      this.filteredContacts = this.filteredContacts.filter(
        contact => Date.parse(contact.createDate) >= Number(this.filters.createdFrom)
      );
    }
    if (this.filters.createdTo) {
      this.filteredContacts = this.filteredContacts.filter(
        contact => Date.parse(contact.createDate) <= Number(this.filters.createdTo)
      );
    }

    if (this.filters.updatedFrom) {
      this.filteredContacts = this.filteredContacts.filter(
        contact => Date.parse(contact.updatedDate) >= Number(this.filters.updatedFrom)
      );
    }
    if (this.filters.updatedTo) {
      this.filteredContacts = this.filteredContacts.filter(
        contact => Date.parse(contact.updatedDate) <= Number(this.filters.updatedTo)
      );
    }

    if (this.filters.lastFrom) {
      this.filteredContacts = this.filteredContacts.filter(
        contact => Date.parse(contact.lastContactedDate) >= Number(this.filters.lastFrom)
      );
    }

    if (this.filters.lastTo) {
      this.filteredContacts = this.filteredContacts.filter(
        contact => Date.parse(contact.lastContactedDate) <= Number(this.filters.lastTo)
      );
    }

    this.filterParent.emit({filtered: this.filteredContacts, clicked: this.applyClicked});
  }
}
