import { Component, Input, OnInit, HostListener, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProposalService } from '../proposal.service';
import { ProductsService } from '../../../../services/inventory/products.service';
import { SharedService } from '../../../../services/shared.service';
import { ProposalsService } from '../../../../services/proposals.service';
import { CommonService } from '../../../common/common.service';

@Component({
  selector: 'app-productdetails',
  templateUrl: './productdetails.component.html',
  styleUrls: [
    './productdetails.component.css',
  ]
})

export class ProductDetailsComponent implements OnInit, OnDestroy {

  // @Input() productType;
  @Input() proposalInfo;
  productsInfoAll: any;
  productType: any;
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
  proposalId: any;
  brandsList = [];

  constructor( private proposalService: ProposalService, private productsService: ProductsService, private sharedService: SharedService,
    private route: ActivatedRoute, private proposalsService: ProposalsService, private commonService: CommonService ) {
    this.selectedData = this.productsInfoAll || [];
    this.proposalId = this.route.snapshot.paramMap.get('id');
    this.searchableList = ['name', 'model'];
    this.onSelect('all');
    this.productsService.getProductCatalog().subscribe(res => {
      console.log('catalog items', res);
      this.productsInfoAll = res.results;
      this.productsInfoAll.forEach(element => {
        element.addingQty = 1;
      });
    });

    this.sharedService.getProductTypes().subscribe(res => {
      this.productType = res.results;
    });

    this.sharedService.getBrands().subscribe(res => {
      this.brandsList = res.results;
    });
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
    // Add Mock data
  }

  onClickedOutside(event) {
    this.selectedRows = [];
  }

  onSelect(val) {
    if (val === 'all') {
      this.selectedData = this.productsInfoAll;
    } else {
      this.selectedData = this.productsInfoAll.filter(x => x.productTypeId === parseInt(val, 10));
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
    let count = 1;
    for (let i = 0; i <= this.selectedRows.length - 1; i += 1) {
      sendData.push(this.productsInfoAll.filter(p => p.sku === this.selectedRows[i])[0]);
    }
    if (sendData.length === 1) {
      this.sendIndividualProduct(sendData[0][0]);
    } else {
      // set option field as undefined for resolving conflice when expand table
      // sendData.map( s => s[0].option = undefined );
      // this.proposalService.insertToTable(sendData);
      sendData.forEach(ele => {
        ele.quantity = parseInt(ele.quantity, 10);
        if ( this.proposalInfo.dealStatus === 'WON') {
          this.commonService.showAlertModal.next(true);
        } else {
          this.proposalsService.createProposalProduct(this.proposalId, ele).subscribe(res => {
            count = count + 1;
            if (sendData.length === count) {
              this.proposalService.insertSucess.next(true);
              this.showDialog = false;
              this.sidebarCollapsed = true;
            }
          });
        }
      });
    }
  }

  sendIndividualProduct(product) {
    if ( this.proposalInfo.dealStatus === 'WON') {
      this.commonService.showAlertModal.next(true);
    } else {
      this.openAttachmentModal(product);
    }

    // this.sharedService.insertToTable([[product]]);
  }

  updateIndividualProduct(product) {
    this.openAttachmentModal(product);
    this.insertToTable([[product]]);
  }
  openAddProductModal() {

    this.showAddProductModal = true;
    this.addProductModalCollapsed = false;
    // this.productsService.createProduct(this.newProductMock).subscribe(res => {
    //   this.proposalService.newProductId.next({'id': res.data.id});
    // });
  }

  openAttachmentModal(product) {
    this.addAttachmentModalCollapsed = false;
    this.selectedProduct = product;
    this.selectedProduct.brandName = this.brandsList.filter(brand => brand.id === this.selectedProduct.brandId)[0].name;
    this.productsService.getProductAlternativesList(product.productId).subscribe(res => {
      this.addedAlterList = res.results;
    });
    this.productsService.getProductAccessoriesList(product.productId).subscribe(res => {
      this.addedAccList = res.results;
      console.log('Acc List: ', this.addedAccList);
    });
    // this.addedAccList = this.selectedProduct.addedAccList ? this.selectedProduct.addedAccList : [];
    // this.addedAlterList = this.selectedProduct.addedAlterList ? this.selectedProduct.addedAlterList : [];
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
      // this.addedAcc = {
      //   sku: product.sku,
      //   name: product.name,
      //   model: product.model,
      //   brand: product.brand,
      //   qty: product.qty,
      //   price: product.price,
      //   optionType: product.option
      // };
      product.option = 'OPTIONAL';
      this.addedAccList.push(product);
    }
  }

  addToAlternatives(product) {
    if (!this.addedAlterList.map(a => a.skuNumber).includes(product.sku)) {
      // this.addedAlter = {
      //   sku: product.sku,
      //   name: product.name,
      //   model: product.model,
      //   brand: product.brand,
      //   qty: product.qty,
      //   price: product.price
      // };
      this.addedAlterList.push(product);
    }
  }

  getSkuCheckColor(acc) {
    if (acc.option === 'OPTIONAL') {
      return 'gray';
    } else {
      return 'green';
    }
  }

  changeOption(product) {
    console.log('changing product: ', product);
    const accSkuList = this.addedAccList.map(p => p.sku);
    const pos = accSkuList.indexOf(product.sku);
    if (product.option === 'OPTIONAL') {
      this.addedAccList[pos].option = 'AUTOMATICALLY';
    } else {
      this.addedAccList[pos].option = 'OPTIONAL';
    }

  }

  removeSearchModal() {
    this.searchModalCollapsed = true;
    this.searchAlterModalCollapsed = true;
  }

  removeAcc(i, acc) {
    this.addedAccList.splice(i, 1);
    this.productsService.deleteIndividualAccessory (this.selectedProduct.productId, acc.variant.sku).subscribe(res => {
    });
  }

  removeAlter(i, alter) {
    this.addedAlterList.splice(i, 1);
    this.productsService.deleteIndividualAlternative(this.selectedProduct.productId, alter.variant.sku).subscribe(res => {
    });
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

    const requiredAccSkus = this.addedAccList.filter(p => p.option === 'AUTOMATICALLY').map(ele => ele.variant.sku);
    this.selectedProduct.accessorySkus = requiredAccSkus;

    this.accQueryString = '';
    this.alterQueryString = '';
    this.addAttachmentModalCollapsed = true;
    this.sidebarCollapsed = true;
    this.selectedProduct.quantity = parseInt(this.selectedProduct.quantity, 10);
    this.proposalsService.createProposalProduct(this.proposalId, this.selectedProduct).subscribe(res => {
      this.proposalService.insertToTable([[this.selectedProduct]]);
    });
  }

  updateAttachmentModal() {
    // Modal for update attachment

    this.accQueryString = '';
    this.alterQueryString = '';
    this.addAttachmentModalCollapsed = true;
    this.sidebarCollapsed = true;
    this.proposalService.insertToTable([[this.selectedProduct]]);

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

  }
  insertToTable(products) {
    // inssert product to table
    this.productsInfoAll = products;
  }

  ngOnDestroy() {
    this.commonService.showAlertModal.next(false);
  }
}
