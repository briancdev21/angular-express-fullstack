import { Component, ChangeDetectorRef, Input, OnInit, HostListener, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import * as _ from 'lodash';
import { FilterService } from '../filter.service';
import { Ng2CompleterComponent } from '../../../common/ng2completer/ng2completer.component';


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
  @Input() productTags;
  @Input() productStatus;
  @Input() productTypes;
  @Output() filterParent: EventEmitter<any> = new EventEmitter;

  suppliersList = ['John Smith', 'Rob Harding', 'Diana Ilic'];
  items2: any[] = [
    'Home', 'Controller', 'Adaptive', 'Dimmer', 'Keypad', 'TV', 'Samsung', 'Service'
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
  selectTag: string;
  productName: string;
  selectStatus: string;
  filteredProductsList: any;
  applyClicked = false;
  filteredProducts: any;
  backUpProducts: any;
  editable: boolean;
  newKeyword: string;
  selectedItem: any = '';
  inputChanged: any = '';
  selectSupplier =  '';
  filterClicked: any;
  isAutocompleteUpdated = false;

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
    const cmp = this;
    for (let i = 0; i < this.productTags.length; i++) {
      this.items2 = this.items2.filter(function( obj ) {
        return obj !== cmp.productTags[i];
      });
    }
    // this.scoreFrom = this.filters.scoreFrom;
    // this.scoreTo = this.filters.scoreTo;
  }

  onSelectedSupplier(val) {
    this.filters.selectSupplier = val;
    this.selectSupplier = val;
  }

  onSelect(item: any) {
    this.selectedItem = item;
    this.items2 = this.items2.filter(function( obj ) {
      return obj !== item;
    });
    this.productTags.push(item);
  }

  onInputChangedEvent(val: string) {
    this.inputChanged = val;
  }

  removeUser(i: number) {
    const item = this.productTags[i];
    this.items2.push(item);
    this.productTags.splice(i, 1);
    this.isAutocompleteUpdated = !this.isAutocompleteUpdated;
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

  filterTxt (arr, searchKey) {
    return arr.filter(function(obj){
      return Object.keys(obj).some(function(key) {
        return obj[key].toString().includes(searchKey);
      });
    });
  }

  resetFilter() {
    this.selectSupplier = '';
    this.filters = {
      createdFrom: '',
      createdTo: '',
      updatedFrom: '',
      updatedTo: '',
      selectSupplier: '',
      productTags: '',
      productName: '',
      selectStatus: '',
    };
    this.ref.detectChanges();
  }

  applyFilter() {
    this.applyClicked = true;
    this.filteredProducts = this.backUpProducts;

    if (this.productTags[0]) {
      let tagFiltered = [];
      let tagFilteredList = [];
      for ( let i = 0; i <= this.productTags.length - 1; i ++) {
        tagFiltered = this.filterTxt(this.productsListInfo, this.productTags[i]);
        tagFilteredList = tagFilteredList.concat(tagFiltered);
      }
      this.filteredProducts = tagFilteredList;
    }
    if (this.filters.productName) {
      this.filteredProducts = this.filterTxt(this.productsListInfo, this.filters.productName);
    }

    if (this.filters.selectSupplier) {
      this.filteredProducts = this.filteredProducts.filter(supplier => supplier.supplier === this.filters.selectSupplier);
    }

    if (this.filters.selectStatus) {
      this.filteredProducts = this.filteredProducts.filter(product => product.status === this.filters.selectStatus);
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

    // remove duplicates from array
    this.filteredProducts = Array.from(new Set(this.filteredProducts));

    this.filterParent.emit({filtered: this.filteredProducts, clicked: this.applyClicked});
  }
}
