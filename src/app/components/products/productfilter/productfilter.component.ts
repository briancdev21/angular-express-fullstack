import { Component, ChangeDetectorRef, Input, OnInit, HostListener, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import * as _ from 'lodash';
import { FilterService } from '../filter.service';


@Component({
  selector: 'app-productfilter',
  templateUrl: './productfilter.component.html',
  styleUrls: [
    './productfilter.component.css',
  ],
  providers: [FilterService]
})


export class ProductFilterComponent implements OnInit {

  @Input() productsListInfo;
  @Input() filters;
  @Input() productOwners;
  @Input() productStatus;
  @Input() productTypes;
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
  filteredProductsList: any;
  applyClicked = false;
  filteredProducts: any;
  backUpProducts: any;
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
    this.filteredProducts = this.productsListInfo;
    this.backUpProducts = this.productsListInfo;
    this.originFilters = Object.assign({}, this.filters);
    // this.scoreFrom = this.filters.scoreFrom;
    // this.scoreTo = this.filters.scoreTo;
  }

  onSelect(item: any) {
    this.selectedItem = item;
    this.items2 = this.items2.filter(function( obj ) {
      return obj !== item;
    });
    this.productOwners.push(item);
  }

  onInputChangedEvent(val: string) {
    this.inputChanged = val;
  }

  removeUser(i: number) {
    const item = this.productOwners[i];
    this.items2.push(item);
    this.productOwners.splice(i, 1);
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
    this.filteredProducts = this.backUpProducts;

    if (this.productOwners[0]) {
      let ownerFiltered = [];
      let ownerFilteredList = [];
      for ( let i = 0; i <= this.productOwners.length - 1; i ++) {
        ownerFiltered = this.filterTxt(this.productsListInfo, this.productOwners[i]);
        ownerFilteredList = ownerFilteredList.concat(ownerFiltered);
      }
      this.filteredProducts = ownerFilteredList;
    }

    if (this.filters.location) {
      this.filteredProducts = this.filterTxt(this.productsListInfo, this.filters.location);
    }

    // this.filteredProducts = this.filteredProducts.filter(
    //   product => product.score >= this.filters.scoreFrom && product.score <= this.filters.scoreTo
    // );

    if (this.filters.selectStatus) {
      if (this.filters.selectStatus == 'Project') {
        this.filteredProducts = this.filteredProducts.filter(product => product.account > 0);
      } else if (this.filters.selectStatus == 'Invoice') {
        this.filteredProducts = this.filteredProducts.filter(product => product.association > 0);
      } else {
        this.filteredProducts = this.filteredProducts.filter(product => product.association > 0 && product.account > 0);
      }
    }

    if (this.filters.selectType) {
      this.filteredProducts = this.filteredProducts.filter(product => product.accountType == this.filters.selectType);
    }

    if (this.filters.createdFrom) {
      this.filteredProducts = this.filteredProducts.filter(
        product => Date.parse(product.createDate) >= Number(this.filters.createdFrom)
      );
    }
    if (this.filters.createdTo) {
      this.filteredProducts = this.filteredProducts.filter(
        product => Date.parse(product.createDate) <= Number(this.filters.createdTo)
      );
    }

    if (this.filters.updatedFrom) {
      this.filteredProducts = this.filteredProducts.filter(
        product => Date.parse(product.updatedDate) >= Number(this.filters.updatedFrom)
      );
    }
    if (this.filters.updatedTo) {
      this.filteredProducts = this.filteredProducts.filter(
        product => Date.parse(product.updatedDate) <= Number(this.filters.updatedTo)
      );
    }

    if (this.filters.lastFrom) {
      this.filteredProducts = this.filteredProducts.filter(
        product => Date.parse(product.lastProductedDate) >= Number(this.filters.lastFrom)
      );
    }

    if (this.filters.lastTo) {
      this.filteredProducts = this.filteredProducts.filter(
        product => Date.parse(product.lastProductedDate) <= Number(this.filters.lastTo)
      );
    }

    this.filterParent.emit({filtered: this.filteredProducts, clicked: this.applyClicked});
  }
}
