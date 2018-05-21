import { Component, Input, ViewChild, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MultiKeywordSelectComponent } from '../../../profile/multikeywordselect/multikeywordselect.component';
import { SharedService } from '../shared.service';
import { CompleterService, CompleterData } from 'ng2-completer';

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
  types = ['Type 1', 'TestType 2', 'Type 3', 'Type 4', 'Type 5'];
  suppliers = ['test1', 'test2', 'test3', 'test4', 'test5'];
  brands = ['test1', 'test2', 'test3', 'test4', 'test5'];

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

  constructor(private sharedService: SharedService, private completerService: CompleterService) {
    this.dataService = completerService.local(this.searchData, 'color', 'color');
    this.addedProduct = {
      productType: this.type,
      productSupplier: this.supplier,
      manufactaurer: this.brand,
      productName: '',
      modelNumber: '',
      productDesc: '',
      measureCount: '1',
      expiration: '',
      brand: '',
      inventoryType: 'stockable',
      measure: 'perUnit',
      expirationType: '',
      qty: 0,
      initialStockLevel: '',
      reorderPoint: '',
      unitCost: 0,
      currenty: 'cad',
      leadTime: 'days',
      leadTimeCount: 0,
      skuNumber: '',
      supplierCode: '',
      upc: '',
      option: 'optional',
      priceAdjust: 0,
      friendMargin: '0',
      friendPrice: '',
      royaltyPrice: '',
      royaltyMargin: '0',
      builderPrice: '',
      buildersMargin: '0',
      wholesalePrice: '',
      wholesaleMargin: '0',
      retailPrice: '',
      retailMargin: '0',
      costPrice: '',
      costMargin: '0',
      variantValue: [{id: 1, data: []}],
      variantProducts: []
    };

    this.searchableList = ['productName', 'model', 'brand'];
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
    this.sharedService.closeModal(true);
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

      if (this.addedProduct.modelNumber && this.addedProduct.type && this.supplier && this.brand
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
        if (!this.type) {
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

  calcFriend(value) {
    this.addedProduct.unitCost = +this.addedProduct.unitCost;
    this.addedProduct.friendPrice = +this.addedProduct.friendPrice;
    if ((this.addedProduct.friendPrice !== undefined) && (this.addedProduct.unitCost !== undefined) && (value === 'price')) {
      this.addedProduct.friendMargin = ((this.addedProduct.friendPrice - this.addedProduct.unitCost) / this.addedProduct.friendPrice) * 100;
      // show 2 decimal places
      this.addedProduct.friendMargin = parseFloat(this.addedProduct.friendMargin).toFixed(2);
    }
    if ((this.addedProduct.friendMargin !== undefined) && (this.addedProduct.unitCost !== undefined) && (value === 'margin')) {
      this.addedProduct.friendPrice = this.addedProduct.unitCost * 100 / (100 - this.addedProduct.friendMargin);
      // show 2 decimal places
      this.addedProduct.friendPrice = parseFloat(this.addedProduct.friendPrice).toFixed(2);
    }
  }

  calcCost(value) {
    this.addedProduct.unitCost = +this.addedProduct.unitCost;
    this.addedProduct.costPrice = +this.addedProduct.costPrice;
    if ((this.addedProduct.costPrice !== undefined) && (this.addedProduct.unitCost !== undefined) && (value === 'price')) {
      this.addedProduct.costMargin = ((this.addedProduct.costPrice - this.addedProduct.unitCost) / this.addedProduct.costPrice) * 100;
      // show 2 decimal places
      this.addedProduct.costMargin = parseFloat(this.addedProduct.costMargin).toFixed(2);
    }
    if ((this.addedProduct.costMargin !== undefined) && (this.addedProduct.unitCost !== undefined) && (value === 'margin')) {
      this.addedProduct.costPrice = this.addedProduct.unitCost * 100 / (100 - this.addedProduct.costMargin);
      // show 2 decimal places
      this.addedProduct.costPrice = parseFloat(this.addedProduct.costPrice).toFixed(2);
    }
  }

  calcRoyalty(value) {
    this.addedProduct.unitCost = +this.addedProduct.unitCost;
    this.addedProduct.royaltyPrice = +this.addedProduct.royaltyPrice;
    if ((this.addedProduct.royaltyPrice !== undefined) && (this.addedProduct.unitCost !== undefined) && (value === 'price')) {
      this.addedProduct.royaltyMargin = ((this.addedProduct.royaltyPrice - this.addedProduct.unitCost) / this.addedProduct.royaltyPrice) * 100;
      // show 2 decimal places
      this.addedProduct.royaltyMargin = parseFloat(this.addedProduct.royaltyMargin).toFixed(2);
    }
    if ((this.addedProduct.royaltyMargin !== undefined) && (this.addedProduct.unitCost !== undefined) && (value === 'margin')) {
      this.addedProduct.royaltyPrice = this.addedProduct.unitCost * 100 / (100 - this.addedProduct.royaltyMargin);
      // show 2 decimal places
      this.addedProduct.royaltyPrice = parseFloat(this.addedProduct.royaltyPrice).toFixed(2);
    }
  }

  calcRetail(value) {
    this.addedProduct.unitCost = +this.addedProduct.unitCost;
    this.addedProduct.retailPrice = +this.addedProduct.retailPrice;
    if ((this.addedProduct.retailPrice !== undefined) && (this.addedProduct.unitCost !== undefined) && (value === 'price')) {
      this.addedProduct.retailMargin = ((this.addedProduct.retailPrice - this.addedProduct.unitCost) / this.addedProduct.retailPrice) * 100;
      // show 2 decimal places
      this.addedProduct.retailMargin = parseFloat(this.addedProduct.retailMargin).toFixed(2);
    }
    if (this.addedProduct.retailMargin && this.addedProduct.unitCost && (value === 'margin')) {
      this.addedProduct.retailPrice = this.addedProduct.unitCost * 100 / (100 - this.addedProduct.retailMargin);
      // show 2 decimal places
      this.addedProduct.retailPrice = parseFloat(this.addedProduct.retailPrice).toFixed(2);
    }
  }

  calcBuilders(value) {
    this.addedProduct.unitCost = +this.addedProduct.unitCost;
    this.addedProduct.buildersPrice = +this.addedProduct.buildersPrice;
    if ((this.addedProduct.buildersPrice !== undefined) && (this.addedProduct.unitCost !== undefined) && (value === 'price')) {
      this.addedProduct.buildersMargin = ((this.addedProduct.buildersPrice - this.addedProduct.unitCost) / this.addedProduct.buildersPrice) * 100;
      // show 2 decimal places
      this.addedProduct.buildersMargin = parseFloat(this.addedProduct.buildersMargin).toFixed(2);
    }
    if ((this.addedProduct.buildersMargin !== undefined) && (this.addedProduct.unitCost !== undefined) && (value === 'margin')) {
      this.addedProduct.buildersPrice = this.addedProduct.unitCost * 100 / (100 - this.addedProduct.buildersMargin);
      // show 2 decimal places
      this.addedProduct.buildersPrice = parseFloat(this.addedProduct.buildersPrice).toFixed(2);
    }
  }

  calcWholesale(value) {
    this.addedProduct.unitCost = +this.addedProduct.unitCost;
    this.addedProduct.wholesalePrice = +this.addedProduct.wholesalePrice;
    if ((this.addedProduct.wholesalePrice !== undefined) && (this.addedProduct.unitCost !== undefined) && (value === 'price')) {
      this.addedProduct.wholesaleMargin = ((this.addedProduct.wholesalePrice - this.addedProduct.unitCost) / this.addedProduct.wholesalePrice) * 100;
      // show 2 decimal places
      this.addedProduct.wholesaleMargin = parseFloat(this.addedProduct.wholesaleMargin).toFixed(2);
    }
    if ((this.addedProduct.wholesaleMargin !== undefined) && (this.addedProduct.unitCost !== undefined) && (value === 'margin')) {
      this.addedProduct.wholesalePrice = this.addedProduct.unitCost * 100 / (100 - this.addedProduct.wholesaleMargin);
      // show 2 decimal places
      this.addedProduct.wholesalePrice = parseFloat(this.addedProduct.wholesalePrice).toFixed(2);
    }
  }

  changeCost() {
    this.calcCost('margin');
    this.calcFriend('margin');
    this.calcRetail('margin');
    this.calcRoyalty('margin');
    this.calcWholesale('margin');
    this.calcBuilders('margin');
  }

  tabChange(event) {
    switch (event.tabTitle) {
      case 'PRODUCT DETAILS': {
        this.tabActiveSecond = false;
        this.tabActiveFirst = true;
        this.tabActiveThird = false;
        this.tabActiveFour = false;
        break;
      }
      case 'PRODUCT VALUES': {
        this.tabActiveSecond = true;
        this.tabActiveFirst = false;
        this.tabActiveThird = false;
        this.tabActiveFour = false;
        this.clickNext('tab-one');
        break;
      }
      case 'PRODUCT VARIANCE': {
        this.tabActiveSecond = false;
        this.tabActiveFirst = false;
        this.tabActiveThird = true;
        this.tabActiveFour = false;
        break;
      }
      case 'ACCESSORIES & ALTERNATIVES': {
        this.tabActiveSecond = false;
        this.tabActiveFirst = false;
        this.tabActiveThird = false;
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

  moveToConfirm() {
    this.addVariantConfirm = true;
    this.addVariantContent = false;
  }

  removeVariantList(index) {
    this.addedProduct.variantValue.splice(index, 1);
    console.log('111', this.addedProduct.variantValue);
  }

  moveToEdit() {
    this.addVariantContent = false;
    this.editVariant = true;
    const allArrays = this.addedProduct.variantValue.map(e => e.data);
    this.possibleCombination = this.allPossibleCases(allArrays);
    const skuNumber = this.autoGenerate();
    console.log('added product: ', this.addedProduct);
    for ( let i = 0; i < this.possibleCombination.length; i++) {
      this.addedProduct.variantProducts[i] = {
        name: this.possibleCombination[i],
        sku: skuNumber + i,
        cost: this.addedProduct.unitCost,
        supplierCode: '',
        priceAdjust: this.addedProduct.friendPrice,
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
    console.log('product', product);
    if (!this.addedAccList.map(a => a.skuNumber).includes(product.sku)) {
      this.addedAcc = {
        skuNumber: product.sku,
        productName: product.productName,
        modelNumber: product.model,
        brand: product.brand,
        qty: product.qty,
        friendPrice: product.total,
        option: 'optional'
      };
      this.addedAccList.push(this.addedAcc);
    }
  }

  addToAlternatives(product) {
    if (!this.addedAlterList.map(a => a.skuNumber).includes(product.sku)) {
      this.addedAlter = {
        skuNumber: product.sku,
        productName: product.productName,
        modelNumber: product.model,
        brand: product.brand,
        qty: product.qty,
        friendPrice: product.total
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
    if (value === 'stockable') {
      this.greyedNonStock = false;
      this.greyedService = false;
    } else if (value === 'non-stockable') {
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
}



