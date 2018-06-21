import { Component, Input, OnInit, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import * as _ from 'lodash';
import { ProductDetailInfo } from '../../../../../models/ProductDetailInfo.model';
import { CompleterService, CompleterData, CompleterItem } from 'ng2-completer';
import { SharedService } from '../../../../../services/shared.service';

@Component({
  selector: 'app-po-table',
  templateUrl: './po-table.component.html',
  styleUrls: [
    './po-table.component.css',
  ]
})

export class POTableComponent implements OnInit {
  @Input() set productDetailsData (val) {
    console.log('product details: ', val);
    if (val.length !== 0) {
      this.productDetails = val;
      this.sharedService.getInventoryProducts().subscribe(productsRes => {
        productsRes.results.forEach(product => {
          this.sharedService.getInventoryProductSkus(product.id).subscribe(skuRes => {
            this.skus = this.skus.concat(skuRes.results);
            this.skus = _.uniqBy(this.skus, 'sku');
            this.productDetails.forEach(productDetail => {
              this.skus = this.skus.filter(sku => sku.sku !== productDetail.sku);
            });
            this.originSkus = this.skus.slice();
            this.skuService = this.completerService.local(this.skus, 'sku', 'sku');
          });
        });
        this.sharedService.getTaxRates().subscribe(taxRateRes => {
          this.taxRateOptions = taxRateRes.results;
          this.addNewProduct();
        });
      });
    } else {
      console.log('product added');
      this.sharedService.getInventoryProducts().subscribe(productsRes => {
        productsRes.results.forEach(product => {
          this.sharedService.getInventoryProductSkus(product.id).subscribe(skuRes => {
            this.skus = this.skus.concat(skuRes.results);
            this.skus = _.uniqBy(this.skus, 'sku');
            this.productDetails.forEach(productDetail => {
              this.skus = this.skus.filter(sku => sku.sku !== productDetail.sku);
            });
            this.originSkus = this.skus.slice();
            this.skuService = this.completerService.local(this.skus, 'sku', 'sku');
          });
        });
        this.sharedService.getTaxRates().subscribe(taxRateRes => {
          this.taxRateOptions = taxRateRes.results;
          if (this.productDetails.length === 0) { this.addNewProduct(); }
        });
      });
    }
  }
  @Input() set trId(_id: string) {
    this.po_id = parseInt(_id.replace('TR-', ''), 10);
  }
  @Output() priceChange: EventEmitter<any> = new EventEmitter();
  private selectedSku: string;
  private skuService: CompleterData;
  private skus = [];
  private originSkus = [];
  po_id: number;
  taxRateOptions = [];
  selectedTaxRateId: number;
  trProductModel: any;
  productDetails = [];

  constructor(private completerService: CompleterService, private sharedService: SharedService) {
  }

  ngOnInit() {
  }

  addNewProduct() {
    console.log('new product added');
    const newProduct = new ProductDetailInfo();
    newProduct.taxRateId = this.taxRateOptions[0].id;
    this.productDetails.push(newProduct);
  }

  removeProduct(index) {
    // Add sku of removing item to skus service
    const addingItem = this.originSkus.filter(sku => sku.sku === this.productDetails[index].sku);
    this.skus = this.skus.concat(addingItem);

    this.skuService = this.completerService.local(this.skus, 'sku', 'sku');
    console.log('product details:',  this.productDetails[index]);
    this.sharedService.deleteTransferProduct(this.po_id, this.productDetails[index].id).subscribe(res => {
      this.productDetails.splice(index, 1);
      this.priceChange.emit(null);
    });
  }

  onSkuSelected(item: CompleterItem, index) {
    this.sharedService.getInventoryProduct(item.originalObject.productId).subscribe(res => {
      // Remove selected Sku from SkuService (Autocomplete service for skus)
      this.skus = this.skus.filter((sku) => sku.sku !== item.originalObject.sku);
      this.skuService = this.completerService.local(this.skus, 'sku', 'sku');


      const product = res.data;
      this.productDetails[index].sku = item.originalObject.sku;
      this.productDetails[index].readonly = true;
      this.productDetails[index].taxRateId = this.taxRateOptions[0].id;
      this.selectedTaxRateId = this.taxRateOptions[0].id;
      this.productDetails[index].taxrate = this.taxRateOptions[0].rate;
      this.productDetails[index].supplierId = product.supplierId;
      this.productDetails[index].model = product.model;
      this.productDetails[index].unitPrice = item.originalObject.cost;
      this.productDetails[index].name = product.name;
      this.productDetails[index].measure = product.unitOfMeasure.quantity;
      this.trProductModel = {
        taxRateId: this.taxRateOptions[0].id,
        quantity: 1
      };
      this.sharedService.addTransferProduct(this.po_id, this.trProductModel).subscribe(resp => {
        this.productDetails[index].purchaseOrderProductId = resp.data.id;
      });
    });
    if (index === this.productDetails.length - 1) {
      this.addNewProduct();
    }
  }

  keyListener(event, index) {
    if (event.key === 'Enter' && index === this.productDetails.length - 1) {
      this.addNewProduct();
    }
  }

  calcualteTotalPrice(index: number) {
    this.updatePurchaseOrderProduct(index);
  }

  checkValue(e) {
    if (e.which < 47 || e.which > 58 ) { return false; }
    if (e.target.value < 0) { e.target.value = undefined; return false;  }
  }


  changedTaxRate(index, e) {
    this.selectedTaxRateId =  this.taxRateOptions[e.target.selectedIndex].id;
    this.productDetails[index].taxrate = this.taxRateOptions[e.target.selectedIndex].rate;
    this.updatePurchaseOrderProduct(index);
  }

  updatePurchaseOrderProduct(index) {
    if (this.productDetails[index].quantity === undefined) {
      this.productDetails[index].quantity = 0;
    }
    this.trProductModel = {
      taxRateId: this.selectedTaxRateId,
      quantity: parseInt(this.productDetails[index].quantity, 10)
    };
    this.sharedService.updateTransferProduct(this.trId,
      this.productDetails[index].transferProductId, this.trProductModel).subscribe(res => {
        this.productDetails[index].total = res.data.total;
    });
  }
}
