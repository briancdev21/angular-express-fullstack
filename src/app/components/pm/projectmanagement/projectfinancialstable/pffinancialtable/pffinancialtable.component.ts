import { Component, Input, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { FilterService } from '../filter.service';
import { SharedService } from '../../../../../services/shared.service';
import * as _ from 'lodash';
import * as moment from 'moment';

@Component({
  selector: 'app-pffinancialtable',
  templateUrl: './pffinancialtable.component.html',
  styleUrls: [
    './pffinancialtable.component.css',
  ],
  providers: [FilterService]
})


export class PfFinancialTableComponent implements OnInit {

  @Input() purchaseOrdersList;
  @Input() invoicesList;
  @Input() workOrdersList;
  @Input() tableDataAll;
  sortClicked = true;

  constructor( private filterService: FilterService,  private sharedService: SharedService, private router: Router ) {

  }

  ngOnInit() {
  }

  getFormatedDate(date) {
    return moment(date).format('MMMM DD, YYYY');
  }

  sortArray(field) {
    const cmp = this;
    cmp.sortClicked = ! cmp.sortClicked;
    if (!cmp.sortClicked) {
      this.tableDataAll.sort( function(name1, name2) {
        if ( Math.abs(name1[field]) < Math.abs(name2[field])) {
          return -1;
        } else if ( Math.abs(name1[field]) > Math.abs(name2[field])) {
          return 1;
        } else {
          return 0;
        }
      });
    } else {
      this.tableDataAll.reverse();
    }
  }

  sortArrayWithString(field) {
    const cmp = this;
    cmp.sortClicked = ! cmp.sortClicked;
    if (!cmp.sortClicked) {
      this.tableDataAll.sort( function(name1, name2) {
        return name1[field].localeCompare(name2[field]);
      });
    } else {
      this.tableDataAll.reverse();
    }
  }

  sortCreateDateArray(field) {
    const cmp = this;
    cmp.sortClicked = ! cmp.sortClicked;
    if (!cmp.sortClicked) {
      this.tableDataAll.sort( function(name1, name2) {
        if ( Date.parse(name1[field]) < Date.parse(name2[field]) ) {
          return -1;
        } else if ( Date.parse(name1[field]) > Date.parse(name2[field])) {
          return 1;
        } else {
          return 0;
        }
      });
    } else {
      this.tableDataAll.reverse();
    }
  }

  navigateTo(item) {
    if (item.type === 'Invoice') {
      this.router.navigate([`./invoice-profile/${item.id}`]);
    } else if (item.type === 'Work Order') {
      this.router.navigate([`./collaboration/order-profile`, {id: item.id}]);
    } else if (item.type === 'Purchase Order') {
      this.router.navigate([`./inventory/stock-control/purchase-order/${item.id}`]);
    }
  }

}

