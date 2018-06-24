import { Component, Input, OnInit, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import * as _ from 'lodash';
import { ProductDetailInfo } from '../../../../../models/ProductDetailInfo.model';
import { CompleterService, CompleterData, CompleterItem } from 'ng2-completer';
import { SharedService } from '../../../../../services/shared.service';
import { InvoicesService } from '../../../../../services/invoices.service';
import * as moment from 'moment';

@Component({
  selector: 'app-in-profile-table',
  templateUrl: './in-table.component.html',
  styleUrls: [
    './in-table.component.css',
  ],
  encapsulation: ViewEncapsulation.None
})


export class InProfileTableComponent implements OnInit {
  @Input() set productDetails(val) {
    this._productDetails = val;
    this.addNewProduct();
  }
  @Input() invoiceId;
  @Output() priceChange: EventEmitter<any> = new EventEmitter();
  private selectedSku: string;
  private skuService: CompleterData;
  private modelService: CompleterData;
  private nameService: CompleterData;
  private skus = [];
  private originSkus = [];
  public unitpriceEditable = false;
  taxRateOptions = [];
  // selectedTaxRateId: number;
  invoiceProductModel: any;
  _productDetails = [];
  serviceDate: any;

  constructor(private completerService: CompleterService, private sharedService: SharedService, private invoicesService: InvoicesService) {
    this.sharedService.getTaxRates().subscribe(taxRateRes => {
      this.taxRateOptions = taxRateRes.results;
    });
    this.sharedService.getInventoryProducts().subscribe(productsRes => {
      productsRes.results.forEach(product => {
        this.sharedService.getInventoryProductSkus(product.id).subscribe(skuRes => {
          this.skus = this.skus.concat(skuRes.results);
          this.originSkus = this.skus.slice();
          this.skuService = completerService.local(this.skus, 'sku', 'sku');
        });
      });
    });
  }
  ngOnInit() {
  }

  addNewProduct() {
    const newProduct = new ProductDetailInfo();
    // newProduct.taxRateId = this.taxRateOptions[0].id;
    newProduct.readonly = true;
    this._productDetails.push(newProduct);
  }

  removeProduct(index) {
    // Add sku of removing item to skus service
    const addingItem = this.originSkus.filter(sku => sku.sku == this._productDetails[index].sku);
    this.skus = this.skus.concat(addingItem);

    this.skuService = this.completerService.local(this.skus, 'sku', 'sku');

    this.invoicesService.deleteInvoiceProduct(this.invoiceId, this._productDetails[index].id).subscribe(res => {
      this._productDetails.splice(index, 1);
      this.priceChange.emit(null);
    });
  }

  onSkuSelected(item: CompleterItem, index) {
    this.sharedService.getInventoryProduct(item.originalObject.productId).subscribe(res => {

      // Remove selected Sku from SkuService (Autocomplete service for skus)
      this.skus = this.skus.filter((sku) => sku.sku !== item.originalObject.sku);
      this.skuService = this.completerService.local(this.skus, 'sku', 'sku');


      const product = res.data;
      this._productDetails[index].sku = item.originalObject.sku;
      this._productDetails[index].readonly = true;
      this._productDetails[index].taxRateId = this.taxRateOptions[0].id;
      // this.selectedTaxRateId = this.taxRateOptions[0].id;
      this._productDetails[index].taxrate = this.taxRateOptions[0].rate;
      this._productDetails[index].supplierId = product.supplierId;
      this._productDetails[index].model = product.model;
      this._productDetails[index].unitprice = item.originalObject.cost;
      this._productDetails[index].name = product.name;
      this._productDetails[index].measure = product.unitOfMeasure.quantity;
      this.invoiceProductModel = {
        sku: item.originalObject.sku,
        taxRateId: this.taxRateOptions[0].id,
        discount: {
          value: 0,
          unit: 'PERCENT'
        },
        quantity: 1,
      };
      this.invoicesService.addInvoiceProduct(this.invoiceId, this.invoiceProductModel).subscribe(data => {
        this._productDetails[index].id = data.data.id;
      });
    });
    if (index === this._productDetails.length - 1) {
      this.addNewProduct();
    }
  }

  keyListener(event, index) {
    if (event.key === 'Enter' && index === this._productDetails.length - 1) {
      this.addNewProduct();
    }
  }

  calcualteTotalPrice(index: number) {
    this.updatePurchaseOrderProduct(index);
  }

  checkDiscount(e) {
    if (e.target.value > 100) { e.target.value = 100; }
    if (e.target.value < 0) { e.target.value = undefined; }
  }

  checkValue(e) {
    if (e.target.value < 0) { e.target.value = undefined; }
  }

  changedTaxRate(index, e) {
    // this.selectedTaxRateId =  this.taxRateOptions[e.target.selectedIndex].id;
    this._productDetails[index].taxrate = this.taxRateOptions[e.target.selectedIndex].rate;
    this._productDetails[index].taxRateId = this.taxRateOptions[e.target.selectedIndex].id;
    this.updatePurchaseOrderProduct(index);
  }

  selectCreatedFrom(index, event) {
    this.serviceDate = event.value;
    this._productDetails[index].serviceDate = event.value;
    this.updatePurchaseOrderProduct(index);
  }

  updatePurchaseOrderProduct(index) {

      if (this._productDetails[index].quantity !== undefined &&
        this._productDetails[index].serviceDate !== undefined &&
        this._productDetails[index].taxRateId !== undefined
      ) {
      this.invoiceProductModel = {
        sku: this._productDetails[index].sku,
        taxRateId: parseInt(this._productDetails[index].taxRateId, 10),
        discount: {
          value: this._productDetails[index].discount ? this._productDetails[index].discount : 0,
          unit: 'PERCENT'
        },
        received: 0,
        serviceDate: this._productDetails[index].serviceDate.toISOString().slice(0, 10),
        quantity: this._productDetails[index].quantity
      };
      this.invoicesService.updateInvoiceProduct(this.invoiceId, this._productDetails[index].id, this.invoiceProductModel).
      subscribe(res => {
        this._productDetails[index].total = res.data.total;
        this.priceChange.emit(null);
      });
    }
  }
}

