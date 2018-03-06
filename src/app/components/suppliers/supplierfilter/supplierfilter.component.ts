import { Component, ChangeDetectorRef, Input, OnInit, HostListener, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import * as _ from 'lodash';
import { FilterService } from '../filter.service';


@Component({
  selector: 'app-supplierfilter',
  templateUrl: './supplierfilter.component.html',
  styleUrls: [
    './supplierfilter.component.css',
  ],
  providers: [FilterService]
})


export class SupplierFilterComponent implements OnInit {

  @Input() suppliersListInfo;
  @Input() filters;
  @Input() supplierOwners;
  @Input() supplierStatus;
  @Input() supplierTypes;
  @Output() filterParent: EventEmitter<any> = new EventEmitter;


  items2: any[] = [
    'John Smith', 'John Moss', 'Diana Ilic'
  ];
  config2: any = {'placeholder': 'Type here', 'sourceField': ''};

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
  filteredSuppliersList: any;
  applyClicked = false;
  filteredSuppliers: any;
  backUpSuppliers: any;
  editable: boolean;
  newKeyword: string;
  selectedItem: any = '';
  inputChanged: any = '';

  constructor( private filterService: FilterService, private ref: ChangeDetectorRef ) {
    const comp = this;
    document.addEventListener('click', function() {
      comp.editable = false;
    });
  }

  ngOnInit() {
    this.filteredSuppliers = this.suppliersListInfo;
    this.backUpSuppliers = this.suppliersListInfo;
    this.originFilters = Object.assign({}, this.filters);
    // this.scoreFrom = this.filters.scoreFrom;
    // this.scoreTo = this.filters.scoreTo;
  }

  onSelect(item: any) {
    this.selectedItem = item;
    this.items2 = this.items2.filter(function( obj ) {
      return obj !== item;
    });
    this.supplierOwners.push(item);
  }

  onInputChangedEvent(val: string) {
    this.inputChanged = val;
  }

  removeUser(i: number) {
    const item = this.supplierOwners[i];
    this.items2.push(item);
    this.supplierOwners.splice(i, 1);
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
    console.log('reset');
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
    console.log('filters:', this.filters);
    // this.filters.scoreFrom = this.scoreFrom;
    // this.filters.scoreTo = this.scoreTo;
    this.applyClicked = true;
    this.filteredSuppliers = this.backUpSuppliers;

    if (this.supplierOwners[0]) {
      let ownerFiltered = [];
      let ownerFilteredList = [];
      for ( let i = 0; i <= this.supplierOwners.length - 1; i ++) {
        ownerFiltered = this.filterTxt(this.suppliersListInfo, this.supplierOwners[i]);
        ownerFilteredList = ownerFilteredList.concat(ownerFiltered);
      }
      this.filteredSuppliers = ownerFilteredList;
    }

    if (this.filters.location) {
      this.filteredSuppliers = this.filterTxt(this.suppliersListInfo, this.filters.location);
    }

    // this.filteredSuppliers = this.filteredSuppliers.filter(
    //   supplier => supplier.score >= this.filters.scoreFrom && supplier.score <= this.filters.scoreTo
    // );

    if (this.filters.selectStatus) {
      console.log('selectStatus:', this.selectStatus);
      if (this.filters.selectStatus == 'Project') {
        this.filteredSuppliers = this.filteredSuppliers.filter(supplier => supplier.account > 0);
      } else if (this.filters.selectStatus == 'Invoice') {
        this.filteredSuppliers = this.filteredSuppliers.filter(supplier => supplier.association > 0);
      } else {
        this.filteredSuppliers = this.filteredSuppliers.filter(supplier => supplier.association > 0 && supplier.account > 0);
      }
    }

    if (this.filters.selectType) {
      this.filteredSuppliers = this.filteredSuppliers.filter(supplier => supplier.accountType == this.filters.selectType);
    }

    if (this.filters.createdFrom) {
      this.filteredSuppliers = this.filteredSuppliers.filter(
        supplier => Date.parse(supplier.createDate) >= Number(this.filters.createdFrom)
      );
    }
    if (this.filters.createdTo) {
      this.filteredSuppliers = this.filteredSuppliers.filter(
        supplier => Date.parse(supplier.createDate) <= Number(this.filters.createdTo)
      );
    }

    if (this.filters.updatedFrom) {
      this.filteredSuppliers = this.filteredSuppliers.filter(
        supplier => Date.parse(supplier.updatedDate) >= Number(this.filters.updatedFrom)
      );
    }
    if (this.filters.updatedTo) {
      this.filteredSuppliers = this.filteredSuppliers.filter(
        supplier => Date.parse(supplier.updatedDate) <= Number(this.filters.updatedTo)
      );
    }

    if (this.filters.lastFrom) {
      this.filteredSuppliers = this.filteredSuppliers.filter(
        supplier => Date.parse(supplier.lastSupplieredDate) >= Number(this.filters.lastFrom)
      );
    }

    if (this.filters.lastTo) {
      this.filteredSuppliers = this.filteredSuppliers.filter(
        supplier => Date.parse(supplier.lastSupplieredDate) <= Number(this.filters.lastTo)
      );
    }

    this.filterParent.emit({filtered: this.filteredSuppliers, clicked: this.applyClicked});
  }
}
