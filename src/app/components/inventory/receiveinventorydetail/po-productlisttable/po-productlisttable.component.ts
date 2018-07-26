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
    console.log('proudts info updated: detail po table');
    if (val !== undefined) {
      this.originProductsInfo = val;
      this.originProductsInfo.forEach(product => {
        product.quantityCopy = product.quantity;
        product.recievedCopy = product.recieved;
      });
      if (this.originProductsInfo.length === 0) {
        this.emptyRow = true;
      } else {
        this.emptyRow = false;
      }
    }
  }

  @Output() productInfoUpdated: EventEmitter<any> = new EventEmitter;


  originProductsInfo = [];
  emptyRow: boolean;
  sortScoreClicked: boolean;

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
    // console.log('origin product info:', this.originProductsInfo);
    this.savePurchaseOrderProducts();

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
    // console.log('origin product info:', this.originProductsInfo);
    this.savePurchaseOrderProducts();
  }

  savePurchaseOrderProducts() {
    let count = 0;
    this.originProductsInfo.forEach(product => {
      product.recieved = product.recievedCopy;
      product.received = product.recievedCopy;
      product.quantity = product.quantityCopy;
    });
    this.productInfoUpdated.emit(this.originProductsInfo);
  }

  clearProductChange(index) {
    this.originProductsInfo[index].quantityCopy = this.originProductsInfo[index].quantity;
    this.originProductsInfo[index].recievedCopy = this.originProductsInfo[index].recieved;
    this.savePurchaseOrderProducts();
  }


  sortArray(field) {
    const cmp = this;
    cmp.sortScoreClicked = ! cmp.sortScoreClicked;
    if (!cmp.sortScoreClicked) {
      this.originProductsInfo.sort( function(name1, name2) {
        if ( name1[field] < name2[field] ) {
          return -1;
        } else if ( name1[field] > name2[field]) {
          return 1;
        } else {
          return 0;
        }
      });
    } else {
      this.originProductsInfo.reverse();
    }
  }

  sortDateArray(field) {
    const cmp = this;
    cmp.sortScoreClicked = ! cmp.sortScoreClicked;
    if (!cmp.sortScoreClicked) {
      this.originProductsInfo.sort( function(name1, name2) {
        console.log('999', name1[field], name2[field]);
        if ( Date.parse(name1[field]) < Date.parse(name2[field]) ) {
          return -1;
        } else if ( Date.parse(name1[field]) > Date.parse(name2[field]) || name2[field] === '') {
          return 1;
        } else {
          return 0;
        }
      });
    } else {
      this.originProductsInfo.reverse();
    }
  }
}

