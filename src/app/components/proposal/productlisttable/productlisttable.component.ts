import { Component, Input, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import * as _ from 'lodash';

@Component({
  selector: 'app-productlisttable',
  templateUrl: './productlisttable.component.html',
  styleUrls: [
    './productlisttable.component.css',
  ]
})

export class ProductListTableComponent implements OnInit {

  @Input() proposalProductList;
  @Input() proposalInfo;
  productTotal = 0;
  selectedRows = [];
  isShift = false;
  isCtrl = false;
  clicked = false;

  constructor() {
  }

  ngOnInit() {
    const cmp = this;
    cmp.proposalInfo.proposalAmount = 0;
    this.proposalProductList.forEach(product => {
      cmp.productTotal += product.unitPrice * product.qty * (100 - product.discount) / 100;
    });
    cmp.proposalInfo.proposalAmount = cmp.productTotal;
  }

  @HostListener('window:keydown', ['$event'])
  keyDownEvent(event: KeyboardEvent) {
    // console.log(event.keyCode);
    // event.preventDefault();
    // event.stopPropagation();
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

  onRowSelect(product, i, clicked) {
    if (this.isCtrl) {
      const index = this.selectedRows.indexOf(i);
      if (index !== -1) {
        this.selectedRows.splice(index, 1);
      } else {
        this.selectedRows.push(i);
      }
    } else if (this.isShift && this.selectedRows.length > 0) {
      const test = Math.min(i, this.selectedRows[0]);
      this.selectedRows = _.range(Math.min(i, this.selectedRows[0]), Math.max(i, this.selectedRows[0]) + 1);
    } else {
      this.selectedRows = [i];
    }
    window.localStorage.setItem('selectedRows', JSON.stringify(this.selectedRows) );
  }
}
