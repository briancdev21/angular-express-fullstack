import { Component, Input, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import * as _ from 'lodash';
import { HorizontalBarComponent } from '../../../common/horizontalbar/horizontalbar.component';

@Component({
  selector: 'app-receiveinventory-purchaseorderlisttable',
  templateUrl: './purchaseorderlisttable.component.html',
  styleUrls: [
    './purchaseorderlisttable.component.css',
  ],
})


export class PurchaseOrderListTableComponent implements OnInit {

  @Input() purchaseOrdersInfo;
  public barInfo: any;
  sortClicked = true;
  clicked = false;
  sortScoreClicked = true;
  dateNow = new Date();
  aweekLater = new Date();
  constructor( private router: Router ) {
  }

  ngOnInit() {
    this.purchaseOrdersInfo.map(i => i.barInfo = {
      title: i.completion + '%',
      completeness: i.completion
    });
    // get a week later date
    this.aweekLater.setDate(this.aweekLater.getDate() + 7);
  }

  getStatus() {
  }

  redirectTo(index) {
    console.log('redirect url', this.purchaseOrdersInfo[index]);
    switch (this.purchaseOrdersInfo[index].purchaseOrderNumber.slice(0, 2)) {
      case 'PO': {
        this.router.navigate(['/inventory/stock-control/purchaseorder/' + this.purchaseOrdersInfo[index].projectNumber]);
        break;
      }
      case 'TR': {
        this.router.navigate(['/inventory/stock-control/transfer/' + this.purchaseOrdersInfo[index].projectNumber]);
        break;
      }
      case 'AD': {
        this.router.navigate(['/inventory/stock-control/adjustment/' + this.purchaseOrdersInfo[index].projectNumber]);
        break;
      }
    }
  }

  sortArray(field) {
    const cmp = this;
    cmp.sortScoreClicked = ! cmp.sortScoreClicked;
    if (!cmp.sortScoreClicked) {
      this.purchaseOrdersInfo.sort( function(name1, name2) {
        if ( name1[field] < name2[field] ) {
          return -1;
        } else if ( name1[field] > name2[field]) {
          return 1;
        } else {
          return 0;
        }
      });
    } else {
      this.purchaseOrdersInfo.reverse();
    }
  }

  sortDateArray(field) {
    const cmp = this;
    cmp.sortScoreClicked = ! cmp.sortScoreClicked;
    if (!cmp.sortScoreClicked) {
      this.purchaseOrdersInfo.sort( function(name1, name2) {
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
      this.purchaseOrdersInfo.reverse();
    }
  }

  getDateColor(order) {
    if (order.dueDate !== '') {
      if (order.status === 'Delivered' && (this.dateNow < new Date(order.dueDate))) {
        return 'green';
      } else if (new Date(order.dueDate) > new Date(this.aweekLater)) {
        return 'black';
      } else if (new Date(order.dueDate) > this.dateNow) {
        return 'orange';
      } else if (order.status !== 'Fulfilled' && (new Date(order.dueDate) < this.dateNow)) {
        return 'red';
      }
    }
  }
}

