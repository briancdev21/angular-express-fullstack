import { Component, OnInit, OnDestroy } from '@angular/core';
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
export class ProductsComponent implements OnInit, OnDestroy {

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

  showEditImageModal = false;
  keywordsList;
  imageChangedEvent: any = '';
  croppedImage: any = '';
  selectedUncroppedFile: any;

  constructor( private filterService: FilterService, private productsService: ProductsService, private proposalService: ProposalService ) {
    this.filterAvaliableTo = 'everyone';

    this.retrieveProductsListData();

    this.proposalService.onModalStatus.subscribe(res => {
      if (res) {
        this.showAddProductModal = false;
        this.addProductModalCollapsed = true;

        this.retrieveProductsListData();
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
    this.filterService.openImageUploadModal.subscribe(data => {
      if (data) {
        this.showEditImageModal = true;
      }
    });
  }

  retrieveProductsListData() {
    this.productsService.getProductsList().subscribe(res => {
      this.productsListInfo = res.results;
      console.log('productslist: ', res);
    });
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

  changeImage() {
    this.showEditImageModal = true;
  }

  cancelCrop() {
    this.showEditImageModal = false;
  }

  saveCrop() {
    this.showEditImageModal = false;
    const uploadData = new FormData();
    uploadData.append('productPicture', this.selectedUncroppedFile, this.selectedUncroppedFile.name);
    const sendingData = {
      'cropped': this.croppedImage,
      'saving': uploadData
    };
    this.filterService.sendImageData.next(sendingData);

    // this.productsService.uploadProductProfileImage(this._productInfo.id, uploadData).subscribe(res => {
    //   console.log('imga result: ', res);
    // });
  }

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
    this.selectedUncroppedFile = event.target.files[0];
  }
  imageCropped(image: string) {
    this.croppedImage = image;
  }

  imageLoaded() {
  }

  loadImageFailed() {
  }

  ngOnDestroy() {
    this.filterService.sendImageData.next(undefined);
  }
}
