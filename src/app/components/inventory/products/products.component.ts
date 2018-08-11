import { Component, OnInit } from '@angular/core';
import { CommonComponent } from '../../common/common.component';
import { FilterService } from './filter.service';
import { ProductsService } from '../../../services/inventory/products.service';
import { ProposalService } from '../../sales/proposal/proposal.service';
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
  public showAddProductModal = false;
  public addProductModalCollapsed = true;
  productsInfoAll: any;

  constructor( private filterService: FilterService, private productsService: ProductsService, private proposalService: ProposalService ) {
    this.filterAvaliableTo = 'everyone';

    this.productsService.getProductsList().subscribe(res => {
      this.productsListInfo = res.results;
      console.log('productslist: ', res);
    });

    this.proposalService.onModalStatus.subscribe(res => {
      if (res) {
        this.showAddProductModal = false;
        this.addProductModalCollapsed = true;
      }
    });
  }


  public filters  = {
    createdFrom: '',
    createdTo: '',
    updatedFrom: '',
    updatedTo: '',
    selectTag: '',
    selectStatus: '',
  };

  public productTags: Array<Object> = [
    'Home'
  ];

  public productStatus: Array<string> = [
    'Place order', 'Below re-order point', 'No stock!', 'Active'
  ];

  public productsListInfo: Array<Object> = [
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
      createdFrom: '',
      createdTo: '',
      updatedFrom: '',
      updatedTo: '',
      selectTag: '',
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

  openAddProductModal() {
    this.showAddProductModal = true;
    this.addProductModalCollapsed = false;
  }
}
