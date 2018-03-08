import { Component, OnInit } from '@angular/core';
import { CommonComponent } from '../common/common.component';
import { FilterService } from './filter.service';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: [
    './products.component.css'
  ],
  entryComponents: [
    CommonComponent
  ],
  providers: [FilterService]
})
export class ProductsComponent implements OnInit {

  menuCollapsed = true;
  saveFilterModalCollapsed = true;
  showSaveFilterModal = false;
  filterClicked = false;
  backUpProducts: any;
  openSavedFiltersList = false;
  savedFiltersListCollapsed = true;
  savedFiltersArr = [];
  filterAvaliableTo: any;
  filterName = '';

  constructor( private filterService: FilterService ) {
    this.filterAvaliableTo = 'everyone';
  }

  public filters  = {
    // scoreFrom : 0,
    // scoreTo : 100,
    createdDateFrom: '',
    createdDateTo: '',
    updatedDateFrom: '',
    updatedDateTo: '',
    selectOwner: '',
    location: '',
    selectStatus: '',
  };

  public productOwners: Array<Object> = [
    'John Smith',
  ];

  public productsListInfo: Array<Object> = [
    {
      id: 0,
      name: 'John Moss',
      phone: '4039696480',
      email: 'John.Moss@outlook.com',
      createDate: 'Januanry 19, 2018',
      updatedDate: 'Januanry 25, 2018',
      lastProductedDate: 'Januanry 25, 2018',
      rating: '95',
      address: '2222 Crescent Hill Dr SW Calgary, AB T3C 0J4',
      owner: 'Diana Ilic',
      account: '1',
      association: '0',
      totalDeals: '1',
      accountType: 'Individual',
    },
    {
      id: 1,
      name: 'Rob Harding',
      phone: '4039696434',
      email: 'Rob.Harding@outlook.com',
      createDate: 'Januanry 19, 2017',
      updatedDate: 'Januanry 25, 2018',
      lastProductedDate: 'Januanry 25, 2018',
      rating: '100',
      address: '2222 Crescent Hill Dr SW Calgary, AB T3C 0J4',
      owner: 'John Moss',
      account: '0',
      association: '0',
      totalDeals: '3',
      accountType: 'Individual',
    },
    {
      id: 2,
      name: 'Hugh Williamson',
      phone: '4039436423',
      email: 'HughWilliamson@outlook.com',
      createDate: 'June 19, 2016',
      updatedDate: 'Januanry 25, 2017',
      lastProductedDate: 'Januanry 25, 2018',
      rating: '82',
      address: '2222 Crescent Hill Dr SW Calgary, AB T3C 0J4',
      owner: 'John Smith',
      account: '0',
      association: '1',
      totalDeals: '2',
      accountType: 'Individual',
    },
    {
      id: 3,
      name: 'Danny Shibley',
      phone: '4039602348',
      email: 'DannyShibley@outlook.com',
      createDate: 'Januanry 19, 2018',
      updatedDate: 'Januanry 25, 2018',
      lastProductedDate: 'Januanry 25, 2018',
      rating: '75',
      address: '2222 Crescent Hill Dr SW Calgary, AB T3C 0J4',
      owner: 'Diana Ilic',
      account: '1',
      association: '1',
      totalDeals: '1',
      accountType: 'Business',
    },
    {
      id: 4,
      name: 'Hayati Homes',
      phone: '5439696481',
      email: 'Hayati.Homes@outlook.com',
      createDate: 'April 29, 2017',
      updatedDate: 'Januanry 25, 2018',
      lastProductedDate: 'Januanry 25, 2018',
      rating: '75',
      address: '2222 Crescent Hill Dr SW Calgary, AB T3C 0J4',
      owner: 'Diana Ilic',
      account: '0',
      association: '0',
      totalDeals: '0',
      accountType: 'Individual',
    },
    {
      id: 5,
      name: 'John Stephen',
      phone: '1039692343',
      email: 'john.Stephen@outlook.com',
      createDate: 'Mar 19, 2018',
      updatedDate: 'Januanry 25, 2018',
      lastProductedDate: 'Januanry 25, 2018',
      rating: '85',
      address: '2222 Crescent Hill Dr SW Calgary, AB T3C 0J4',
      owner: 'John Smith',
      account: '0',
      association: '0',
      totalDeals: '1',
      accountType: 'Business',
    },
    {
      id: 6,
      name: 'Rockwood Homes',
      phone: '4039623086',
      email: 'Rockwood.Homes@outlook.com',
      createDate: 'December 19, 2017',
      updatedDate: 'April 5, 2018',
      lastProductedDate: 'June 25, 2018',
      rating: '73',
      address: '2222 Crescent Hill Dr SW Calgary, AB T3C 0J4',
      owner: 'John Moss',
      account: '0',
      association: '0',
      totalDeals: '1',
      accountType: 'Individual',
    }
  ];

  public productStatus = [
    'Project', 'Invoice', 'Project and Invoice'
  ];

  public productTypes = ['Individual', 'Business'];
  ngOnInit() {
    this.backUpProducts = this.productsListInfo;
  }

  getFilter(event) {
    this.productsListInfo = event.filtered;
    this.filterClicked = event.clicked;
  }

  addNewProduct(event) {
    this.productsListInfo.push(event.data);
  }

  toggleMenubar(data: boolean) {
    this.menuCollapsed  = data;
  }

  closeModal() {
    this.saveFilterModalCollapsed = true;
    this.showSaveFilterModal = false;
    this.filterClicked = false;
    this.productsListInfo = this.backUpProducts;
  }

  cancelFilter() {
    this.filters = {
      // scoreFrom : 0,
      // scoreTo : 100,
      createdDateFrom: '',
      createdDateTo: '',
      updatedDateFrom: '',
      updatedDateTo: '',
      selectOwner: '',
      location: '',
      selectStatus: '',
    };
    this.filterClicked = false;
    this.productsListInfo = this.backUpProducts;
  }

  clickSavedFilters() {
    this.openSavedFiltersList = true;
    this.savedFiltersListCollapsed = false;
  }

  onChangeAcailable(value) {
    this.filterAvaliableTo = value;
  }

  saveFilter() {
    // const savingFilterData = this.productsListInfo;
    // const savingFilterName = this.filterName;
    // const savingAvailability = this.filterAvaliableTo;
    this.savedFiltersArr.push({
                          savedFilter: this.productsListInfo,
                          savedFilterName: this.filterName,
                          savedAvailabilty: this.filterAvaliableTo
                        });
    this.saveFilterModalCollapsed = true;
    this.showSaveFilterModal = false;
    this.filterClicked = false;
    this.productsListInfo = this.backUpProducts;
  }

  applySavedFilter(selectedFilter) {
    this.productsListInfo = selectedFilter.savedFilter;
    this.savedFiltersListCollapsed = true;
    this.openSavedFiltersList = false;
  }

  removeFilter() {
    this.productsListInfo = this.backUpProducts;
    this.savedFiltersListCollapsed = true;
    this.openSavedFiltersList = false;
  }
}
