import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import * as _ from 'lodash';
import { CompleterService, CompleterData, CompleterItem } from 'ng2-completer';
import { SharedService } from '../../../../services/shared.service';

@Component({
  selector: 'app-po-receive-productlisttable',
  templateUrl: './po-productlisttable.component.html',
  styleUrls: [
    './po-productlisttable.component.css',
  ]
})


export class POProductListTableComponent implements OnInit {
  @Input() set productsInfo(val) {
    if (val !== undefined && val.length !== 0) {
      this.originProductsInfo = val;
      this.originProductsInfo.forEach(product => {
        product.quantityCopy = product.quantity;
        product.recievedCopy = product.recieved;
      });
    }
  }

  originProductsInfo = [];

  constructor(private router: Router, private sharedService: SharedService) {

  }

  ngOnInit() {    
  }

  onChangeQuantity(index, e) {
    if (e.which < 47 || e.which > 58 ) {  return false; }
    this.originProductsInfo[index].quantityCopy = parseInt(e.target.value, 10);
    if (this.originProductsInfo[index].quantityCopy < this.originProductsInfo[index].recievedCopy) {
      this.originProductsInfo[index].quantityCopy = this.originProductsInfo[index].recievedCopy;
    }
    console.log('origin product info:', this.originProductsInfo);
  }
  onChangeReceived(index, e) {
    if (e.which < 47 || e.which > 58 ) {  return false; }
    this.originProductsInfo[index].recievedCopy = parseInt(e.target.value, 10);
    if (this.originProductsInfo[index].recievedCopy < this.originProductsInfo[index].recieved) {
      this.originProductsInfo[index].recievedCopy = this.originProductsInfo[index].recieved;
    }

    if (this.originProductsInfo[index].quantityCopy < this.originProductsInfo[index].recievedCopy)
    {
      this.originProductsInfo[index].quantityCopy = this.originProductsInfo[index].recievedCopy;
    }
    console.log('origin product info:', this.originProductsInfo);

  }

  savePurchaseOrderProducts() {
    let count = 0;
    this.originProductsInfo.forEach(product => {
      product.recieved = product.recievedCopy;
      product.quantity = product.quantityCopy;
      this.sharedService.updatePurchaseOrderProduct(product.purchaseOrderId, product.id, product).subscribe(() => {
        count++;
        if (count === this.originProductsInfo.length) {
          this.router.navigate[""];
        }
      });
    });
  }

  clearProductChange(index) {
    this.originProductsInfo[index].quantityCopy = this.originProductsInfo[index].quantity;
    this.originProductsInfo[index].recievedCopy = this.originProductsInfo[index].recieved;
  }
}

