import { Component, Input, ViewChild, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MultiKeywordSelectComponent } from '../../../profile/multikeywordselect/multikeywordselect.component';
import { ProposalService } from '../proposal.service';
import { SuppliersService } from '../../../../services/suppliers.service';
import { SharedService } from '../../../../services/shared.service';
import { CompleterService, CompleterData } from 'ng2-completer';
import { ProductsService } from '../../../../services/inventory/products.service';

@Component({
  selector: 'app-addproductmodal',
  templateUrl: './addproductmodal.component.html',
  styleUrls: [
    './addproductmodal.component.css',
  ],
  entryComponents: [
    MultiKeywordSelectComponent,
  ]
})

export class AddProductModalComponent implements OnInit {
  @ViewChild('tabsRef', {read: ElementRef}) tabsRef: ElementRef;
  @Input() showAddProductModal;
  @Input() addProductModalCollapsed;
  @Input() productsInfoAll;
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
  type: string;
  supplier: string;
  brand: string;
  dataService: CompleterData;
  searchData = [
    { color: 'red', value: '#f00' },
    { color: 'green', value: '#0f0' },
    { color: 'blue', value: '#00f' },
    { color: 'cyan', value: '#0ff' },
    { color: 'magenta', value: '#f0f' },
    { color: 'yellow', value: '#ff0' },
    { color: 'black', value: '#000' }
  ];
  types = ['STOCKABLE', 'NON_STOCKABLE', 'SERVICE'];
  suppliers: any;
  brands: any;

  invalidModelNumber = false;
  invalidProductType = false;
  invalidSupplier = false;
  invalidProductName = false;
  invalidManufacturer = false;
  invalidProductDescription = false;
  measure: any;
  perUnit: any;
  expirationType: any;
  none: any;
  cad: any;
  retailPrice: any;
  retailMargin: any;
  accQueryString: any;
  queryString: any;
  onUploadStateChanged: any;
  brandsListInfo: any;
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
  selectedSupplierId: any;
  selectedBrandId: any;
  selectedProductTypeId: any;
  selectedKeywordsId: any;
  newCreatedProductId: number;
  availableProductsAll: any;
  productsAll: any;

  constructor(private proposalService: ProposalService, private completerService: CompleterService,
     private suppliersService: SuppliersService, private sharedService: SharedService, private productsService: ProductsService) {

    this.proposalService.newProductId.subscribe(data => {
      if (data.id) {
        this.newProductId = data.id;
      }
    });

    this.suppliersService.getSuppliersList().subscribe(res => {
      this.suppliersListInfo = res.results;
      // this.suppliers = res.results.map(s => s.name);
      this.suppliers = completerService.local(this.suppliersListInfo, 'name', 'name');
    });

    this.sharedService.getBrands().subscribe(res => {
      this.brandsListInfo = res.results;
      // this.brands = res.results.map(b => b.name);
      this.brands = completerService.local(this.brandsListInfo, 'name', 'name');
    });

    this.sharedService.getCurrencies().subscribe(res => {
      this.currenciesListInfo = res.results;
    });

    this.sharedService.getPricingCategories().subscribe(res => {
      this.pricingCategoriesListInfo = res.results;
      this.pricingCategoriesListInfo.map(p => p['price'] = 0);
    });

    this.sharedService.getProductTypes().subscribe(res => {
      this.productTypesListInfo = res.results;
      // this.productTypeNames = res.results.map(b => b.name);
      this.productTypeNames = completerService.local(this.productTypesListInfo, 'type', 'type');
    });

    this.dataService = completerService.local(this.searchData, 'color', 'color');
    this.addedProduct = {
      productType: this.type,
      productSupplier: this.supplier,
      manufactaurer: this.brand,
      productName: '',
      modelNumber: '',
      productDesc: '',
      measureCount: undefined,
      expiration: undefined,
      brand: '',
      inventoryType: 'STOCKABLE',
      measure: 'PER_UNIT',
      expirationType: 'HOURS',
      qty: 0,
      initialStockLevel: '',
      reorderPoint: '',
      unitCost: 0,
      currency: 'CAD',
      leadTime: 'DAYS',
      leadTimeCount: 0,
      skuNumber: '',
      supplierCode: '',
      upc: '',
      option: 'OPTIONAL',
      priceAdjust: 0,
      variantValue: [{id: 1, data: []}],
      variantProducts: []
    };

    this.searchableList = ['name', 'model', 'productType'];
    // this.variants = this.addedProduct.variantValue;
  }
  ngOnInit() {

  }

  closeModal() {
    if (this.editVariant) {
      this.addVariantContent = true;
      this.addVariantConfirm = false;
      this.editVariant = false;
      return;
    }
    this.proposalService.closeModal(true);
    this.tabActiveFirst = true;
    this.tabActiveSecond = this.tabActiveThird = this.tabActiveFour = false;
    this.addVariantConfirm = true;
    this.addVariantContent = false;
    this.editVariant = false;

  }

  cancelNewProduct() {
    this.proposalService.closeModal(true);
    // this.productsService.deleteIndividualProduct(this.newProductId).subscribe(res => {
    //   console.log('deleted: ', res);
    // });
  }

  clickNext(pos) {
    this.tabActiveFirst = this.tabActiveThird = this.tabActiveSecond = this.tabActiveFour = false;
    if (pos === 'tab-one') {
      this.invalidModelNumber = false;
      this.invalidProductType = false;
      this.invalidSupplier = false;
      this.invalidProductName = false;
      this.invalidManufacturer = false;
      this.invalidProductDescription = false;
      if (this.addedProduct.modelNumber && this.addedProduct.type && this.supplier && this.brand
        && this.addedProduct.productName && this.addedProduct.productDesc) {
        this.tabActiveSecond = true;
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
          this.tabActiveFirst = true;
        });
      }
    } else if (pos === 'tab-two') {
      this.tabActiveThird = true;
    } else if (pos === 'tab-three') {
      this.tabActiveFour = true;
    }
  }

  createProduct() {
    const savingProductMd = {
      'brandId': this.selectedBrandId,
      'productTypeId': this.selectedProductTypeId,
      'supplierId': this.selectedSupplierId,
      'keywordIds': this.selectedKeywordsId,
      'model': this.addedProduct.modelNumber,
      'name': this.addedProduct.productName,
      'description': this.addedProduct.productDesc,
      'inventoryType': this.addedProduct.inventoryType,
      'unitOfMeasure': {
        'quantity': this.addedProduct.measureCount ? this.addedProduct.measureCount : 0,
        'unit': this.addedProduct.measure
      },
      'expiration': {
        'duration': this.addedProduct.expiration ? this.addedProduct.expiration : 0,
        'unit': this.addedProduct.expirationType
      },
      'leadTime': {
        'duration': this.addedProduct.leadTimeCount ? this.addedProduct.leadTimeCount : 0,
        'unit': this.addedProduct.leadTime
      }
    };
    const savingProductData = JSON.stringify(savingProductMd);
    this.productsService.createProduct(savingProductData).subscribe(res => {
      this.newCreatedProductId = res.data.id;
      console.log('product created: ', res);

      // Get search modal data
      this.productsService.getProductsList().subscribe(response => {
        this.productsAll = response.results;
        console.log('products All: ', response);

        this.productsService.getProductCatalog().subscribe(data => {
          this.availableProductsAll = data.results;
          console.log('availableproudcts : ', this.availableProductsAll);
          this.availableProductsAll = this.availableProductsAll.filter(p => p.id !== this.newCreatedProductId);
          this.availableProductsAll.forEach(ele => {
            ele.pictureURI = this.productsAll.filter(p => p.id === ele.productId)[0].pictureURI;
            ele.brandId =  this.productsAll.filter(p => p.id === ele.productId)[0].brandId;
          });
        });
      });
    });
  }

  clickNextEditVariant() {
    const variantSuppliercode = this.addedProduct.variantProducts.map(v => v.supplierCode);
    if (variantSuppliercode.filter(s => s === '').length > 0) {
      this.missingSupplierCode = true;
    } else {
      this.missingSupplierCode = false;
    }
    const variantUpcNumber = this.addedProduct.variantProducts.map(v => v.upcNumber);
    if (variantUpcNumber.filter(s => s === '').length > 0) {
      this.missingUpcNumber = true;
    } else {
      this.missingUpcNumber = false;
    }
    if (this.missingUpcNumber || this.missingSupplierCode) {
      return;
    } else {
      this.createVariants();

    }
  }

  clickBack(pos) {
    this.tabActiveFirst = this.tabActiveThird = this.tabActiveSecond = this.tabActiveFour = false;
    if (pos === 'tab-three') {
      this.tabActiveSecond = true;
    } else if (pos === 'tab-four') {
      this.tabActiveThird = true;
    } else if (pos === 'tab-two') {
      this.tabActiveFirst = true;
    }
  }

  createVariants() {
    console.log('variants list: ', this.addedProduct.variantProducts);
    this.addedProduct.variantProducts.forEach(element => {
      element.quantity = element.qty;
      element.upc = element.upcNumber;
      element.priceAdjustment = element.priceAdjust;
      this.productsService.createVariants(this.newCreatedProductId, JSON.stringify(element)).subscribe(res => {
        console.log('variants created: ', res);
      });
    });
    this.tabActiveFour = true;
    this.tabActiveFirst = false;
    this.tabActiveThird = false;
    this.tabActiveSecond = false;
  }

  supplierIdSelected(event) {
    this.selectedSupplierId = event.originalObject.id;
  }

  brandIdSelected(event) {
    this.selectedBrandId = event.originalObject.id;
  }

  productTypeIdSelected(event) {
    this.selectedProductTypeId = event.originalObject.id;
  }

  getKeywordIds(event) {
    this.selectedKeywordsId = event.map(e => e.id);
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
    const randNum = Math.floor(Math.random() * 899999 + 100000);
    if (!this.switch) {
      this.addedProduct.skuNumber = randNum;
    } else {
      this.addedProduct.skuNumber = 0;
    }
    this.switch = !this.switch;
    this.randSku = randNum;
    return randNum;
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
    const skuNumber = this.autoGenerate();
    for ( let i = 0; i < this.possibleCombination.length; i++) {
      this.addedProduct.variantProducts[i] = {
        name: this.possibleCombination[i],
        qty: 0,
        sku: skuNumber + i,
        cost: this.addedProduct.unitCost,
        supplierCode: '',
        priceAdjust: this.addedProduct.priceAdjust,
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
        qty: product.quantity,
        price: product.price,
        option: 'OPTIONAL',
        brandName: this.getBrandNamefromId(product.brandId)
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
        qty: product.quantity,
        price: product.total,
        brandName: this.getBrandNamefromId(product.brandId)
      };
      this.addedAlterList.push(this.addedAlter);
    }
  }

  getSkuCheckColor(acc) {
    if (acc.option === 'OPTIONAL') {
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
    if (this.addedProduct.inventoryType === 'service') {
      return 'greyed';
    }
  }

  getProductTypeNamefromId(id) {
    const filterProductType = this.productTypesListInfo.filter(p => p.id === id)[0];
    return filterProductType.name;
  }

  getBrandNamefromId(id) {
    const filterBrandName = this.brandsListInfo.filter(p => p.id === id)[0];
    return filterBrandName.name;
  }

  saveAlterAcc() {
    this.proposalService.closeModal(true);
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
      this.productsService.createAlternative(this.newCreatedProductId, savingAlter).subscribe(res => {
        console.log('saved alter: ', res);
      });
    });

    this.addedAccList.forEach(ele => {
      const savingAcc = {
        sku: ele.skuNumber,
        quantity: ele.qty,
        option: ele.option
      };
      this.productsService.createAlternative(this.newCreatedProductId, savingAcc).subscribe(res => {
        console.log('saved acc: ', res);
      });
    });
  }
}



