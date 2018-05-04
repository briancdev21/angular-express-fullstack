import { Component, Input, OnInit, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import * as _ from 'lodash';
import { ProductDetailInfo } from '../../../../../models/ProductDetailInfo.model';
import { CompleterService, CompleterData, CompleterItem } from 'ng2-completer';

@Component({
  selector: 'app-po-table',
  templateUrl: './po-table.component.html',
  styleUrls: [
    './po-table.component.css',
  ],
  encapsulation: ViewEncapsulation.None
})


export class POTableComponent implements OnInit {
  @Input() productDetails;
  @Output() priceChange: EventEmitter<any> = new EventEmitter();
  private selectedSku: string;
  private skuService: CompleterData;
  private modelService: CompleterData;
  private nameService: CompleterData;
  private skus = [
    {sku: 'product1'},
    {sku: 'product2'},
    {sku: 'product3'},
    {sku: 'product4'},
    {sku: 'product5'}
  ];
  private models = [
    {model: 'model1'},
    {model: 'model2'},
    {model: 'model3'},
    {model: 'model4'},
    {model: 'model5'}
  ];
  private names = [
    {productname: 'name1'},
    {productname: 'name2'},
    {productname: 'name3'},
    {productname: 'name4'},
    {productname: 'name5'}
  ];

  constructor(private completerService: CompleterService) {
    this.skuService = completerService.local(this.skus, 'sku', 'sku');
    this.modelService = completerService.local(this.models, 'model', 'model');
    this.nameService = completerService.local(this.names, 'productname', 'productname');

  }
  ngOnInit() {
    this.addNewProduct();
  }

  addNewProduct() {
    const newProduct = new ProductDetailInfo();
    console.log(newProduct);
    this.productDetails.push(newProduct);
  }

  removeProduct(index) {
    this.productDetails.splice(index, 1);
    this.priceChange.emit(null);
  }

  onSkuSelected(item: CompleterItem, index) {
    if (index === this.productDetails.length - 1) {
      this.addNewProduct();
    }
  }
  onModelSelected(item: CompleterItem, index) {
    if (index === this.productDetails.length - 1) {
      this.addNewProduct();
    }
  }
  onNameSelected(item: CompleterItem, index) {
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
    const product = this.productDetails[index];
    console.log('before:', product.discount);
    if (product.discount < 0 )  { product.discount = 0; }
    if (product.discount > 100 ) { product.discount = 100; }
        console.log(product.discount);

    let discount = product.discount;
    if ( discount === undefined ) { discount = 0; }
    if ( product.unitprice !== undefined && product.quantity !== undefined ) {
      product.total = product.unitprice * product.quantity * (100 - discount)  / 100;
      console.log('total price', product.total);
      this.priceChange.emit(null);
    }
  }

  checkDiscount(e) {
    if (e.target.value > 100) { e.target.value = 100; }
    if (e.target.value < 0) { e.target.value = undefined; }
  }

  checkValue(e) {
    if (e.target.value < 0) { e.target.value = undefined; }
  }
}

