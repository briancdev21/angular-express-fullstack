import { Component, Input, ViewChild, ElementRef, OnInit, EventEmitter, Output } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductProfileService } from '../productprofile.service';
import { CompleterService, CompleterData } from 'ng2-completer';
import { MultiKeywordSelectComponent } from '../../../../profile/multikeywordselect/multikeywordselect.component';
import { SuppliersService } from '../../../../../services/suppliers.service';
import { SharedService } from '../../../../../services/shared.service';
import { ProductsService } from '../../../../../services/inventory/products.service';

@Component({
  selector: 'app-editproductmodal',
  templateUrl: './editproductmodal.component.html',
  styleUrls: [
    './editproductmodal.component.css',
  ],
  entryComponents: [
  ]
})

export class EditProductModalComponent implements OnInit {
  @ViewChild('tabsRef', {read: ElementRef}) tabsRef: ElementRef;
  @Input() showAddProductModal;
  @Input() addProductModalCollapsed;
  @Input() productsInfoAll;
  @Output() closeEditProductModal: EventEmitter<any> = new EventEmitter;
  @Input() set productInfo (val: any) {
    this._productInfo = val;
    // this.addedProduct = val;
    // console.log('added proudct: ', this.addedProduct);
    // this.brand = val.brandName;
    // this.selectedBrandId = val.brandId;
    // this.selectedProductTypeId = val.productTypeId;
    // this.selectedSupplierId = val.supplierId;
    // this.selectedKeywordsId = val.keywordIds;
    // this.addedProduct.productName = val.name;
    // this.addedProduct.productDesc = val.description;
    // this.addedProduct.measure = val.unitOfMeasure.unit;
    // this.addedProduct.measureCount = val.unitOfMeasure.quantity;
    // this.addedProduct.expirationType = val.expiration.unit;
    // this.addedProduct.expiration = val.expiration.duration;
    // this.addedProduct.leadTime = val.leadTime.unit;
    // this.addedProduct.leadTimeCount = val.leadTime.duration;
  }
  @Input() set productVariants (val: any) {
    this.variantsInfo = val;
  }
  searchModalCollapsed = true;
  searchAlterModalCollapsed = true;
  addAttachmentModalCollapsed = true;
  tabActiveFirst = true;
  tabActiveSecond = false;
  tabActiveThird = false;
  tabActiveFour = false;
  customClass = 'img-upload';
  imageCount = 0;
  productTags = [];
  addedProduct: any;
  switch = false;
  randSku: number;
  addVariantConfirm = true;
  addVariantContent = false;
  editVariant = false;
  possibleCombination = [];
  searchableList: any;
  addedAccList = [];
  addedAlterList = [];
  addedAcc: any;
  addedAlter: any;
  greyedNonStock = false;
  greyedService = false;
  pricingType = ['Friend & Family', 'Royalty Program', 'Retail', 'Builders Program', 'Wholesale', 'Cost'];
  searchStr: string;
  protected type: string;
  supplier: string;
  brand: string;
  dataService: CompleterData;
  protected searchData = [
    { color: 'red', value: '#f00' },
    { color: 'green', value: '#0f0' },
    { color: 'blue', value: '#00f' },
    { color: 'cyan', value: '#0ff' },
    { color: 'magenta', value: '#f0f' },
    { color: 'yellow', value: '#ff0' },
    { color: 'black', value: '#000' }
  ];
  protected types = ['STOCKABLE', 'NON_STOCKABLE', 'SERVICE'];
  suppliers: any;
  brands: any;
  accQueryString: any;
  queryString: any;

  invalidModelNumber = false;
  invalidProductType = false;
  invalidSupplier = false;
  invalidProductName = false;
  invalidManufacturer = false;
  invalidProductDescription = false;
  suppliersListInfo: any;
  newProductId: any;
  currenciesListInfo: any;
  pricingCategoriesListInfo: any;
  productCategories = [];
  emptyArr = [];
  showVariantConfirmModal = false;
  missingSupplierCode = false;
  missingUpcNumber = false;
  productTypesListInfo: any;
  productTypeNames: any;
  _productInfo: any;
  selectedProductTypeId: any;
  selectedBrandId: any;
  selectedSupplierId: any;
  selectedKeywordsId: any;
  keywordsListInfo: any;
  variantsInfo: any;
  productId: any;
  brandsList = [];
  availableProductsAll = [];
  productsAll = [];
  productAccessories = [];
  productAlternatives = [];

  constructor(private productProfileService: ProductProfileService, private completerService: CompleterService,
    private route: ActivatedRoute, private suppliersService: SuppliersService,
    private sharedService: SharedService, private productsService: ProductsService) {

    // this.proposalService.newProductId.subscribe(data => {
    //   if (data.id) {
    //     this.newProductId = data.id;
    //   }
    // });

    this.productId = this.route.snapshot.paramMap.get('id');
    this.sharedService.getBrands().subscribe(res => {
      this.brandsList = res.results;
      this.brands = completerService.local(this.brandsList, 'name', 'name');
      this.productsService.getIndividualProduct(this.productId).subscribe(response => {
        console.log('product data123: ', response.data);
        const backedData = response.data;
        // this.productInfo = response.data;
        this.brand = this.getBrandNameFromId(response.data.brandId);
        this.addedProduct = response.data;
        this.selectedBrandId = response.data.brandId;
        this.selectedProductTypeId = response.data.productTypeId;
        this.selectedSupplierId = response.data.supplierId;
        this.selectedKeywordsId = response.data.keywordIds;
        this.addedProduct.productName = response.data.name;
        this.addedProduct.productDesc = response.data.description;
        this.addedProduct.measureUnit = response.data.unitOfMeasure.unit;
        this.addedProduct.measureCount = response.data.unitOfMeasure.quantity;
        // for variant group add
        this.addedProduct.variantValue = [{id: 1, data: []}];
        this.addedProduct.varuantProducts = [];
        if (backedData.expiration) {
          this.addedProduct.expirationType = backedData.expiration.unit;
          this.addedProduct.expirationCount = backedData.expiration.duration;
        }
        if (response.data.leadTime) {
          this.addedProduct.leadTimeUnit = response.data.leadTime.unit;
          this.addedProduct.leadTimeCount = response.data.leadTime.duration;
        }
        this.addedProduct.model = response.data.model;
        this.autoGenerate();

        // get variant info
        this.productsService.getVariantsList(this.productId).subscribe(data => {
          console.log('variants: ', data);
          this.productVariants = data.results;
        });

        this.suppliersService.getSuppliersList().subscribe(data => {
          this.suppliersListInfo = data.results;
          this.suppliers = completerService.local(this.suppliersListInfo, 'name', 'name');
          this.supplier = this.suppliersListInfo.filter(s => s.id === this.addedProduct.supplierId)[0].name;
        });

        this.sharedService.getProductTypes().subscribe(data => {
          this.productTypesListInfo = data.results;
          this.productTypeNames = completerService.local(this.productTypesListInfo, 'type', 'type');
          this.addedProduct.type = this.productTypesListInfo.filter(p => p.id === this.addedProduct.productTypeId)[0].type;
        });

        this.sharedService.getKeywords().subscribe(data => {
          this.keywordsListInfo = data.results;
          // this.productTags = this.getKeywordsName(this.addedProduct.keywordIds);
          this.productTags = this.addedProduct.keywordIds;
        });
      });

      this.productsService.getProductsList().subscribe(response => {
        this.productsAll = response.results;
        console.log('products All: ', response);

        this.productsService.getProductCatalog().subscribe(data => {
          this.availableProductsAll = data.results;
          console.log('availableproudcts : ', this.availableProductsAll);
          this.availableProductsAll = this.availableProductsAll.filter(p => p.id !== this.productId);
          this.availableProductsAll.forEach(ele => {
            ele.pictureURI = this.productsAll.filter(p => p.id === ele.productId)[0].pictureURI;
            ele.brandId =  this.productsAll.filter(p => p.id === ele.productId)[0].brandId;
          });
        });

        this.productsService.getProductAccessoriesList(this.productId).subscribe(data => {
          this.productAccessories = data.results;
          this.productAccessories.forEach(element => {
            this.addedAccList.push({
              skuNumber: element.variant.sku,
              productName: element.variant.name,
              modelNumber: this.productsAll.filter(p => p.id === element.productId)[0].model,
              brandId: this.productsAll.filter(p => p.id === element.productId)[0].brandId,
              brandName: this.getBrandNameFromId(this.productsAll.filter(p => p.id === element.productId)[0].brandId),
              qty: element.quantity,
              option: element.option,
              price: element.variant.cost
            });
          });
          console.log('accessories: ', data);
        });

        this.productsService.getProductAlternativesList(this.productId).subscribe(data => {
          this.productAlternatives = data.results;
          console.log('alternatives: ', data);
          this.productAlternatives.forEach(element => {
            this.addedAlterList.push({
              skuNumber: element.variant.sku,
              productName: element.variant.name,
              modelNumber: this.productsAll.filter(p => p.id === element.productId)[0].model,
              brandId: this.productsAll.filter(p => p.id === element.productId)[0].brandId,
              brandName: this.getBrandNameFromId(this.productsAll.filter(p => p.id === element.productId)[0].brandId),
              qty: element.quantity,
              price: element.variant.cost
            });
          });
        });
      });
    });

    this.sharedService.getCurrencies().subscribe(res => {
      this.currenciesListInfo = res.results;
    });

    this.sharedService.getPricingCategories().subscribe(res => {
      this.pricingCategoriesListInfo = res.results;
      this.pricingCategoriesListInfo.map(p => p['price'] = 0);
    });

    this.searchableList = ['productName', 'model', 'brand'];
    // this.variants = this.addedProduct.variantValue;
  }
  ngOnInit() {
    // this.autoGenerate();
  }

  closeModal() {
    if (this.editVariant) {
      this.addVariantContent = true;
      this.addVariantConfirm = false;
      this.editVariant = false;
      return;
    }
    this.closeEditProductModal.emit({'close': true});
    this.tabActiveFirst = true;
    this.tabActiveSecond = this.tabActiveThird = this.tabActiveFour = false;
    this.addVariantConfirm = true;
    this.addVariantContent = false;
    this.editVariant = false;
  }

  clickNext(pos) {
    if (pos === 'tab-one') {
      this.invalidModelNumber = false;
      this.invalidProductType = false;
      this.invalidSupplier = false;
      this.invalidProductName = false;
      this.invalidManufacturer = false;
      this.invalidProductDescription = false;

      if (this.addedProduct.model && this.addedProduct.type && this.supplier && this.brand
        && this.addedProduct.productName && this.addedProduct.productDesc) {
        this.tabActiveSecond = true;
        this.tabActiveFirst = false;
        this.tabActiveThird = false;
        this.tabActiveFour = false;
      } else {
        if (!this.addedProduct.modelNumber) {
          this.invalidModelNumber = true;
        }
        if (!this.addedProduct.productName) {
          this.invalidProductName = true;
        }
        if (!this.addedProduct.productDesc) {
          this.invalidProductDescription = true;
        }
        if (!this.addedProduct.type) {
          this.invalidProductType = true;
        }
        if (!this.supplier) {
          this.invalidSupplier = true;
        }
        if (!this.brand) {
          this.invalidManufacturer = true;
        }
        setTimeout(() => {
          this.tabActiveSecond = false;
          this.tabActiveFirst = true;
          this.tabActiveThird = false;
          this.tabActiveFour = false;
        });
      }
    } else if (pos === 'tab-two') {
      this.tabActiveThird = true;
      this.tabActiveFirst = false;
      this.tabActiveSecond = false;
      this.tabActiveFour = false;
    } else if (pos === 'tab-three') {
      this.tabActiveFour = true;
      this.tabActiveFirst = false;
      this.tabActiveThird = false;
      this.tabActiveSecond = false;
    }
  }

  updateProduct() {
    const savingProductMd = {
      'brandId': this.selectedBrandId,
      'productTypeId': this.selectedProductTypeId,
      'supplierId': this.selectedSupplierId,
      'currencyId': this.addedProduct.currencyId,
      'keywordIds': this.selectedKeywordsId,
      'model': this.addedProduct.model,
      'name': this.addedProduct.productName,
      'description': this.addedProduct.productDesc,
      'inventoryType': this.addedProduct.inventoryType,
      'status': this.addedProduct.status,
      'unitOfMeasure': {
        'quantity': this.addedProduct.measureCount,
        'unit': this.addedProduct.measureUnit
      },
      'expiration': {
        'duration': this.addedProduct.expirationCount,
        'unit': this.addedProduct.expirationType
      },
      'leadTime': {
        'duration': this.addedProduct.leadTimeCount,
        'unit': this.addedProduct.leadTimeUnit
      }
    };
    // let savingProductData = JSON.stringify(savingProductMd);
    if (savingProductMd.keywordIds === null) {
      delete savingProductMd.keywordIds;
    }

    if (!savingProductMd.expiration.duration || !savingProductMd.expiration.unit) {
      delete savingProductMd.expiration;
    }

    if (!savingProductMd.leadTime.duration || !savingProductMd.leadTime.unit) {
      delete savingProductMd.leadTime;
    }

    Object.keys(savingProductMd).forEach((key) => (savingProductMd[key] == null) && delete savingProductMd[key]);
    this.productsService.updateIndividualProduct(this.productId, savingProductMd).subscribe(res => {
      console.log('saving edits: ', res);
    });
  }

  clickNextEditVariant() {
    // Skip variants edit for now

    // const variantSuppliercode = this.addedProduct.variantProducts.map(v => v.supplierCode);
    // if (variantSuppliercode.filter(s => s === '').length > 0) {
    //   this.missingSupplierCode = true;
    // } else {
    //   this.missingSupplierCode = false;
    // }
    // const variantUpcNumber = this.addedProduct.variantProducts.map(v => v.upcNumber);
    // if (variantUpcNumber.filter(s => s === '').length > 0) {
    //   this.missingUpcNumber = true;
    // } else {
    //   this.missingUpcNumber = false;
    // }
    // if (this.missingUpcNumber || this.missingSupplierCode) {
    //   return;
    // } else {
      this.tabActiveFour = true;
      this.tabActiveFirst = false;
      this.tabActiveThird = false;
      this.tabActiveSecond = false;
    // }
  }

  clickBack(pos) {
    if (pos === 'tab-three') {
      this.tabActiveSecond = true;
      this.tabActiveFirst = false;
      this.tabActiveThird = false;
      this.tabActiveFour = false;
    } else if (pos === 'tab-four') {
      this.tabActiveThird = true;
      this.tabActiveFirst = false;
      this.tabActiveSecond = false;
      this.tabActiveFour = false;
    } else if (pos === 'tab-two') {
      this.tabActiveFour = false;
      this.tabActiveFirst = true;
      this.tabActiveThird = false;
      this.tabActiveSecond = false;
    }
  }



  onUploadFinished(value) {
    this.imageCount ++;
    if (this.imageCount) {
      this.customClass = 'img-uploaded';
    }
  }

  onRemoved(value) {
    this.imageCount --;
    if (!this.imageCount) {
      this.customClass = 'img-upload';
    }
  }

  autoGenerate() {
    let randNum;
    if (!this.switch) {
      this.productsService.generateSku().subscribe(res => {
        randNum = res.sku;
        this.addedProduct.skuNumber = Number(randNum);
        console.log('sku: ', randNum);
        this.randSku = Number(randNum);
      });
    }
    this.switch = !this.switch;
  }

  skuChange(event) {
    this.randSku = event;
    console.log('this randSku: ', this.randSku);
    this.switch = false;
  }

  calcCost(value, i) {
    this.addedProduct.unitCost = +this.addedProduct.unitCost;

    if ((this.pricingCategoriesListInfo[i].price !== undefined) && (this.addedProduct.unitCost !== undefined) && (value === 'price')) {
      this.pricingCategoriesListInfo[i].margin = ((this.pricingCategoriesListInfo[i].price - this.addedProduct.unitCost) /
                                                  this.pricingCategoriesListInfo[i].price) * 100;
      // show 2 decimal places
      this.pricingCategoriesListInfo[i].margin = parseFloat(this.pricingCategoriesListInfo[i].margin).toFixed(2);
    }
    if ((this.pricingCategoriesListInfo[i].margin !== undefined) && (this.addedProduct.unitCost !== undefined) && (value === 'margin')) {
      this.pricingCategoriesListInfo[i].price = this.addedProduct.unitCost * 100 / (100 - this.pricingCategoriesListInfo[i].margin);
      // show 2 decimal places
      this.pricingCategoriesListInfo[i].price = parseFloat(this.pricingCategoriesListInfo[i].price).toFixed(2);
    }
  }


  changeCost() {
    for (let i = 0; i < this.pricingCategoriesListInfo.length; i ++) {
      this.pricingCategoriesListInfo[i].price = this.addedProduct.unitCost * 100 / (100 - this.pricingCategoriesListInfo[i].margin);
      this.pricingCategoriesListInfo[i].price = parseFloat(this.pricingCategoriesListInfo[i].price).toFixed(2);
    }
  }

  tabChange(event) {
    this.tabActiveFirst = this.tabActiveThird = this.tabActiveSecond = this.tabActiveFour = false;
    switch (event.tabTitle) {
      case 'PRODUCT DETAILS': {
        this.tabActiveFirst = true;
        break;
      }
      case 'PRODUCT VALUES': {
        this.tabActiveSecond = true;
        this.clickNext('tab-one');
        break;
      }
      case 'PRODUCT VARIANCE': {
        this.tabActiveThird = true;
        break;
      }
      case 'ACCESSORIES & ALTERNATIVES': {
        this.tabActiveFour = true;
        break;
      }
    }
  }

  moveToFourthTab() {
    this.tabActiveFour = true;
    this.tabActiveFirst = this.tabActiveThird = this.tabActiveSecond = false;
  }

  moveAddVariant() {
    if (this.addedProduct.inventoryType !== 'service' && this.addVariantConfirm) {
      this.addVariantConfirm = false;
      this.addVariantContent = true;
      this.editVariant = false;
    } else {
      this.clickNext('tab-one');
    }
  }

  addNewVariants() {
    if (this.addedProduct.variantValue.slice(-1)[0].data[0] ) {
      this.addedProduct.variantValue.push({id: this.addedProduct.variantValue.length + 1, data: []});
    } else {
      console.log('Enter Variant Values!');
    }
  }

  getKeywords(event) {
    const keywordNamesList = event;
    this.addedProduct.variantValue[this.addedProduct.variantValue.length - 1].data = keywordNamesList;
    // this.variantKeywordsIdList = event.map(k => k.id);
  }

  moveToConfirm() {
    this.addVariantConfirm = true;
    this.addVariantContent = false;
  }

  removeVariantList(index) {
    this.addedProduct.variantValue.splice(index, 1);
  }

  moveToEdit() {
    this.addVariantContent = false;
    this.editVariant = true;
    const allArrays = this.addedProduct.variantValue.map(e => e.data);
    this.possibleCombination = this.allPossibleCases(allArrays);
    const skuNumber = Number(this.randSku);
    for ( let i = 0; i < this.possibleCombination.length; i++) {
      this.addedProduct.variantProducts[i] = {
        name: this.possibleCombination[i],
        qty: 0,
        sku: skuNumber + i,
        cost: this.addedProduct.unitCost,
        supplierCode: '',
        priceAdjust: this.addedProduct.price,
        upcNumber: ''
      };
    }
  }

  allPossibleCases(arr) {
    if (arr.length === 1) {
      return arr[0];
    } else {
      const result = [];
      const allCasesOfRest = this.allPossibleCases(arr.slice(1));  // recur with the rest of array
      for (let i = 0; i < allCasesOfRest.length; i++) {
        for (let j = 0; j < arr[0].length; j++) {
          result.push(arr[0][j] + ' / ' + allCasesOfRest[i]);
        }
      }
      return result;
    }
  }

  startSearch() {
    this.searchModalCollapsed = false;
  }

  startAlterSearch() {
    this.searchAlterModalCollapsed = false;
  }

  addToAccessories(product) {
    if (!this.addedAccList.map(a => a.skuNumber).includes(product.sku)) {
      this.addedAcc = {
        skuNumber: product.sku,
        productName: product.name,
        modelNumber: product.model,
        brandId: product.brandId,
        qty: 1,
        price: product.price,
        option: 'OPTIONAL',
        brandName: this.getBrandNameFromId(product.brandId)
      };
      this.addedAccList.push(this.addedAcc);
      console.log('addedAccList: ', this.addedAccList);
    }
  }

  addToAlternatives(product) {
    if (!this.addedAlterList.map(a => a.skuNumber).includes(product.sku)) {
      this.addedAlter = {
        skuNumber: product.sku,
        productName: product.name,
        modelNumber: product.model,
        brandId: product.brandId,
        qty: 1,
        price: product.price,
        brandName: this.getBrandNameFromId(product.brandId)
      };
      this.addedAlterList.push(this.addedAlter);
    }
  }

  getSkuCheckColor(acc) {
    if (acc.option === 'optional') {
      return 'gray';
    } else {
      return 'green';
    }
  }

  changeType (value) {
    if (value === 'STOCKABLE') {
      this.greyedNonStock = false;
      this.greyedService = false;
    } else if (value === 'NON_STOCKABLE') {
      this.greyedNonStock = true;
      this.greyedService = false;
    } else {
      this.greyedNonStock = true;
      this.greyedService = true;
    }
  }

  removeSearchModal() {
    this.searchModalCollapsed = true;
    this.searchAlterModalCollapsed = true;
  }

  removeAcc(i, acc) {
    this.addedAccList.splice(i, 1);
  }

  removeAlter(i, alter) {
    this.addedAlterList.splice(i, 1);
  }

  // First variance list should not have trash icon
  getVisibility(i) {
    if (i === 0) {
      return 'no-visible';
    }
  }

  getBtnBackgoundColor() {
    if (this.addedProduct.inventoryType === 'SERVICE') {
      return 'greyed';
    }
  }

  getProductTypeNamefromId(id) {
    const filterProductType = this.productTypesListInfo.filter(p => p.id === id);
    return filterProductType.name;
  }

  onProductTypeSelected(item) {
    this.selectedProductTypeId = item.originalObject.id;
    this.updateProduct();
  }

  onSupplierSelected(item) {
    this.selectedSupplierId = item.originalObject.id;
    this.updateProduct();
  }

  onBrandSelected(item) {
    this.selectedBrandId = item.originalObject.id;
    this.updateProduct();
  }

  getKeywordsId(event) {
    this.selectedKeywordsId = event.map(e => e.id);
    this.updateProduct();
  }

  getKeywordsName(val) {
    const keywordsName = [];
    val.forEach(element => {
      const item = this.keywordsListInfo.filter(k => k.id === element)[0].name;
      keywordsName.push(item);
    });
    return keywordsName;
  }

  getBrandNameFromId(id) {
    const selectedBrand = this.brandsList.filter(b => b.id === id)[0];
    return selectedBrand.name;
  }

  onUploadStateChanged(event) {
  }

  saveAlterAcc() {
    this.closeEditProductModal.emit({'close': true});
    this.tabActiveFirst = true;
    this.tabActiveSecond = this.tabActiveThird = this.tabActiveFour = false;
    this.addVariantConfirm = true;
    this.addVariantContent = false;
    this.editVariant = false;
    console.log(this.addedAlterList, this.addedAccList);
    this.addedAlterList.forEach(ele => {
      const savingAlter = {
        sku: ele.skuNumber,
        quantity: ele.qty
      };
      this.productsService.createAlternative(this.productId, savingAlter).subscribe(res => {
        console.log('saved alter: ', res);
      });
    });

    this.addedAccList.forEach(ele => {
      const savingAcc = {
        sku: ele.skuNumber,
        quantity: ele.qty,
        option: ele.option
      };
      this.productsService.createAlternative(this.productId, savingAcc).subscribe(res => {
        console.log('saved acc: ', res);
        this.productProfileService.editModalClosed.next(true);
      });
    });
  }
}

