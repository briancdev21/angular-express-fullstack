import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-massedit',
  templateUrl: './massedit.component.html',
  styleUrls: [
    './massedit.component.css',
  ]
})

export class MassEditComponent implements OnInit {

  priceModalCollapsed = true;
  discountModalCollapsed = true;
  showPriceChangeSign = true;
  queryString = '';
  selected = 'increase';
  showPriceModal = false;

  constructor() {
  }

  onPriceSelectionChange(value) {
    if (value === 'amountPrice') {
      this.showPriceChangeSign = true;
    } else if (value === 'percentPrice') {
      this.showPriceChangeSign = false;
    } else {
      console.log('Invalid Type!');
    }
  }

  onPriceIncreaseSelect(selected) {
  }

  ngOnInit() {
    this.onPriceSelectionChange('amountPrice');
  }

  editPrice() {
    this.priceModalCollapsed = false;
    this.showPriceModal = true;
    const selectedRows = JSON.parse(window.localStorage.getItem('selectedRows'));
    console.log('selected Rows: ', selectedRows);
  }
}
