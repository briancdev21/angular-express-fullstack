import { Component, Input, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { FilterService } from '../filter.service';
import { SharedService } from '../../../../services/shared.service';
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
  brandsList: any;
  productTypesList: any;
  constructor( private filterService: FilterService, private router: Router, private sharedService: SharedService ) {
    this.sharedService.getBrands().subscribe(res => {
      this.brandsList = res.results;
      console.log('brandslist: ', res);
    });

    this.sharedService.getProductTypes().subscribe(res => {
      this.productTypesList = res.results;
    });
  }

  ngOnInit() {
    // this.productsListInfo.map(p => {
    //   p.status = this.getStatus(p.stock, p.reorderPoint);
    // });
  }

  getStatusColor(status) {
    if (status === 'ACTIVE') {
      return 'green';
    } else if (status === 'PLACE_ORDER' || status === 'NO_STOCK') {
      return 'orange';
    } else {
      return 'red';
    }
  }

  getBrandName(id) {
    const selectedBrand = this.brandsList.filter(b => b.id === id)[0];
    return selectedBrand.name;
  }

  getProductTypeName(id) {
    const selectedProductType = this.productTypesList.filter( p => p.id === id)[0];
    return selectedProductType.name;
  }

  redirectTo(id) {
    this.router.navigate(['../inventory/product-profile', {id: id}]);
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

