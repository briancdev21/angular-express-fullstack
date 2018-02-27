import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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

  showProductDetailsModal: boolean = false;
  sidebarCollapsed = true;
  searchableList: any;
  selectedData: any = [];
  constructor() {
    this.selectedData = this.productsInfoAll || [];
    this.searchableList = ['productName', 'model'];
    this.onSelect('all');
  }

  onSelect(val) {
    if (val === 'all') {
      this.selectedData = this.productsInfoAll;
    } else {
      this.selectedData = this.productsInfoAll.filter(x => x.productType === val);
    }
  }

  ngOnInit() {
    this.onSelect('all');
  }

}
