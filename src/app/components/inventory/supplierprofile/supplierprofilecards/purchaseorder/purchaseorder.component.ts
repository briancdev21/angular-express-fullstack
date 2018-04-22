import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-purchaseorder',
  templateUrl: './purchaseorder.component.html',
  styleUrls: [
    './purchaseorder.component.css'
  ]
})

export class PurchaseOrderComponent implements OnInit {

  @Input() cards;

  constructor() {
  }

  ngOnInit() {
    this.cards.orderList.map( o => o.orderDate = moment(o.orderDate).format('MMMM DD, YYYY') );
  }
}
