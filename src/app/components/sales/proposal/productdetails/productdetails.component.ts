import { Component, Input, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { ProposalService } from '../proposal.service';
import { ProductsService } from '../../../../services/products.service';

@Component({
  selector: 'app-productdetails',
  templateUrl: './productdetails.component.html',
  styleUrls: [
    './productdetails.component.css',
  ]
})

export class ProductDetailsComponent implements OnInit {

  @Input() productsInfoAll;
  @Input() productType;

  public showAddProductModal = false;
  public addProductModalCollapsed = true;
  showProductDetailsModal = false;
  sidebarCollapsed = true;
  addAttachmentModalCollapsed = true;
  searchableList: any;
  selectedData: any = [];
  selectedRows = [];
  isShift = false;
  isCtrl = false;
  clicked = false;
  quantity: any;
  searchModalCollapsed = true;
  searchAlterModalCollapsed = true;
  addedAcc: any;
  addedAccList = [];
  addedAlter: any;
  addedAlterList = [];
  selectedProduct: any;
  accQueryString = '';
  alterQueryString = '';
  showDialog = false;
  queryString: any;
  selected: any;
  measure: any;
  newProductMock = {
    'brandId': 1,
    'productTypeId': 1,
    'supplierId': 1,
    'currencyId': 1,
    'keywordIds': [
      1
    ],
    'model': 'model1',
    'name': 'product1',
    'description': 'prod-desc',
    'inventoryType': 'STOCKABLE',
    'unitOfMeasure': {
      'quantity': 1,
      'unit': 'PER_UNIT'
    },
    'expiration': {
      'duration': 10,
      'unit': 'HOURS'
    },
    'leadTime': {
      'duration': 1,
      'unit': 'HOURS'
    }
  };

  constructor( private proposalService: ProposalService, private productsService: ProductsService ) {
    this.selectedData = this.productsInfoAll || [];
    this.searchableList = ['productName', 'model'];
    this.onSelect('all');
  }

  @HostListener('window:keydown', ['$event'])
  keyDownEvent(event: KeyboardEvent) {
    if (event.keyCode === 16) {
      this.isShift = true;
    }
    if (event.keyCode === 91) {
      this.isCtrl = true;
    }
  }

  @HostListener('window:keyup', ['$event'])
  keyUpEvent(event: KeyboardEvent) {
    this.isShift = false;
    this.isCtrl = false;
  }

  onParentRowSelect(product, i) {
    if (this.isCtrl) {
      const index = this.selectedRows.indexOf(product.sku);
      if (index !== -1) {
        this.selectedRows.splice(index, 1);
      } else {
        this.selectedRows.push(product.sku);
      }
    } else if  ( this.isShift && this.selectedRows.length > 0) {
      const from = this.productsInfoAll.map(p => p.sku).indexOf(this.selectedRows[0]);
      const to = i;
      this.selectedRows = this.productsInfoAll.slice(Math.min(from, to), Math.max(from, to) + 1).map(p => p.sku);
    } else {
      this.selectedRows = [product.sku];
    }
    window.localStorage.setItem('selectedProducts', JSON.stringify(this.selectedRows) );
  }

  onClickedOutside(event) {
    this.selectedRows = [];
  }

  onSelect(val) {
    if (val === 'all') {
      this.selectedData = this.productsInfoAll;
    } else {
      this.selectedData = this.productsInfoAll.filter(x => x.productType === val);
    }
  }

  ngOnInit() {
    this.proposalService.onModalStatus.subscribe(
      data => {
        this.showAddProductModal = false;
        this.addProductModalCollapsed = true;
      });
    this.onSelect('all');
  }

  sendProducts() {
    const sendData = [];
    for (let i = 0; i <= this.selectedRows.length - 1; i += 1) {
      sendData.push(this.productsInfoAll.filter(p => p.sku === this.selectedRows[i]));
    }
    if (sendData.length === 1) {
      this.sendIndividualProduct(sendData[0][0]);
    } else {
      // set option field as undefined for resolving conflice when expand table
      sendData.map( s => s[0].option = undefined );
      this.proposalService.insertToTable(sendData);
    }
  }

  sendIndividualProduct(product) {
    this.openAttachmentModal(product);
    // this.sharedService.insertToTable([[product]]);
  }

  openAddProductModal() {
    this.showAddProductModal = true;
    this.addProductModalCollapsed = false;
    this.productsService.createProduct(this.newProductMock).subscribe(res => {
      console.log(res);
      this.proposalService.newProductId.next({'id': res.data.id});
    });
  }

  openAttachmentModal(product) {
    this.addAttachmentModalCollapsed = false;
    this.selectedProduct = product;
    this.addedAccList = this.selectedProduct.addedAccList ? this.selectedProduct.addedAccList : [];
    this.addedAlterList = this.selectedProduct.addedAlterList ? this.selectedProduct.addedAlterList : [];
  }

  closeModal() {
    this.addAttachmentModalCollapsed = true;
    this.accQueryString = '';
    this.alterQueryString = '';
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
        productName: product.productName,
        modelNumber: product.model,
        brand: product.brand,
        qty: product.qty,
        friendPrice: product.total,
        optionType: product.option
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
    if (acc.optionType === 'Optional') {
      return 'gray';
    } else {
      return 'green';
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

  filterTxt (arr, searchKey) {
    return arr.filter(function(obj){
      return Object.keys(obj).some(function(key) {
        return obj[key].toString().includes(searchKey);
      });
    });
  }

  searchSelectedData(data) {
    this.selectedData = this.productsInfoAll;
    this.selectedData = this.filterTxt(this.selectedData, data);
  }


  saveAttachmentModal() {

    if (!this.selectedProduct.addedAccList) {
      this.selectedProduct.addedAccList = this.addedAccList;
    } else {
      this.selectedProduct.addedAccList.concat(this.addedAccList);
    }

    if (!this.selectedProduct.addedAlterList) {
      this.selectedProduct.addedAlterList = this.addedAlterList;
    } else {
      this.selectedProduct.addedAlterList.concat(this.addedAlterList);
    }

    this.accQueryString = '';
    this.alterQueryString = '';
    this.addAttachmentModalCollapsed = true;
    this.sidebarCollapsed = true;
    this.proposalService.insertToTable([[this.selectedProduct]]);
  }
}
