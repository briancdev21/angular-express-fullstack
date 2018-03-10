import { Component, Input, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { FilterService } from '../filter.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-productslisttable',
  templateUrl: './productslisttable.component.html',
  styleUrls: [
    './productslisttable.component.css',
  ],
  providers: [FilterService],
})


export class ProductsListTableComponent implements OnInit {

  @Input() productsListInfo;
  addLogModalCollapsed = true;
  showAddLogModal = false;
  showProductModalInfo = false;
  productModalInfoCollapsed = [];
  sortClicked = true;
  clicked = false;
  sortScoreClicked = true;
  showModal: boolean = false;
  switchIcon: boolean = false;
  showCloneConfirmModal = false;
  showDeleteConfirmModal = false;
  clonedRowProduct: any;
  clonedRowIndex: number;
  deletedRowIndex: number;
  sortProductStatusArr: any;
  clickSettingCount = 0;
  expandedInfoModal = false;
  phoneClicked = false;
  emailClicked = false;
  mapClicked = false;
  formatedPhone = '';

  activity: {
    title: string;
    subject: string;
    product: string;
    content: string;
  };

  upcomingModal: object = {
    week: 'WEDNESDAY',
    date: 'NOVEMBER 1, 2017',
    start: '9:30 AM',
    end: '11:00 AM',
    duration: '1 hr, 30 min'
  };
  constructor( private filterService: FilterService, private router: Router ) {
  }

  ngOnInit() {
    this.productsListInfo.map(p => {
      p.status = this.getStatus(p.stock, p.reorderPoint);
    });
  }

  getStockColor(stock, reorderPoint) {
    if (stock < reorderPoint) {
      return 'red';
    } else if (stock < reorderPoint + 3) {
      return 'orange';
    } else {
      return 'green';
    }
  }

  getStatus(stock, reorderPoint) {
    if (stock === undefined) {
      return 'Active';
    } else {
      if (stock < 0) {
        return 'No Stock!';
      } else if (stock < reorderPoint) {
        return 'Below re-order point';
      } else if (stock < reorderPoint + 3) {
        return 'Place order';
      } else {
        return 'Active';
      }
    }
  }

  redirectTo(id) {
    this.router.navigate(['../product/' + id]);
  }

  sortArray(field) {
    const cmp = this;
    cmp.sortScoreClicked = ! cmp.sortScoreClicked;
    if (!cmp.sortScoreClicked) {
      this.productsListInfo.sort( function(name1, name2) {
        if ( name1[field] < name2[field] ) {
          return -1;
        } else if ( name1[field] > name2[field]) {
          return 1;
        } else {
          return 0;
        }
      });
    } else {
      this.productsListInfo.reverse();
    }
  }


  // SortProductStatus() {
  //   const cmp = this;
  //   cmp.sortScoreClicked = ! cmp.sortScoreClicked;
  //   if (!cmp.sortScoreClicked) {
  //     this.sortProductStatusArr = this.productsListInfo.filter(product => product.status === 'New');
  //     this.sortProductStatusArr.push(this.productsListInfo.filter(product => product.status === 'Follow-up'));
  //     this.sortProductStatusArr.push(this.productsListInfo.filter(product => product.status === 'Seen'));
  //     this.sortProductStatusArr.push(this.productsListInfo.filter(product => product.status === 'Demo'));
  //     this.sortProductStatusArr.push(this.productsListInfo.filter(product => product.status === 'Negotiation'));
  //     this.sortProductStatusArr.push(this.productsListInfo.filter(product => product.status === 'Won'));
  //     this.sortProductStatusArr.push(this.productsListInfo.filter(product => product.status === 'Lost'));
  //     this.productsListInfo = _.flatten(this.sortProductStatusArr);
  //   } else {
  //     this.productsListInfo.reverse();
  //   }
  // }

}

