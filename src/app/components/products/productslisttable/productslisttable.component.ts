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
  }

  redirectTo(id) {
    this.router.navigate(['../profile/' + id]);
  }

  selectedFilterEventHandler(filteredList) {
  }

  getScoreColor(score) {
    return score >= 65 ? 'green' : score >= 35 ? 'orange' : 'red';
  }

  getDateColor(value) {
    return value === 'Follow-up' ? 'orange' : value === 'Lost' ? 'orange' : 'green';
  }

  openProductModal(index) {
    this.clickSettingCount ++;
    // switch (this.clickSettingCount % 3) {
    //   case 0: this.productModalInfoCollapsed[index] = false;
    //   break;
    //   case 1: this.productModalInfoCollapsed[index] = true;
    //   break;
    //   default: this.productModalInfoCollapsed[index] = true;
    //   break;
    // }
    this.productModalInfoCollapsed[index] = true;
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

  sortRatingArray(field) {
    const cmp = this;
    cmp.sortScoreClicked = ! cmp.sortScoreClicked;
    if (!cmp.sortScoreClicked) {
      this.productsListInfo.sort( function(name1, name2) {
        if ( Number(name1[field]) < Number(name2[field]) ) {
          return -1;
        } else if ( Number(name1[field]) > Number(name2[field])) {
          return 1;
        } else {
          return 0;
        }
      });
    } else {
      this.productsListInfo.reverse();
    }
  }

  sortDealsArray(field) {
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


  addNewTimelineItem() {
    const date = new Date();
    const today = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

    const nitem = {
      title: this.activity.title,
      content: this.activity.content,
      icon: 'fa fa-home',
      timelineBtnColor: 'green-btn',
      buttontitle: 'More Info',
      date: today,
      buttonClickEventHandlerName: 'getMoreInfo',
      subject: this.activity.subject,
      product: this.activity.product
    };

    switch (nitem.title) {
      case 'Notes':
        nitem.icon = 'fa-file-text-o';
        break;
      case 'Email':
        nitem.icon = 'fa fa-envelope-o';
      break;
      case 'Call':
        nitem.icon = 'fa fa-phone';
      break;
      default:
        nitem.icon = 'fa fa-home';
        break;
    }
  }

  cloneRow(product, index) {
    this.clonedRowIndex = index;
    this.clonedRowProduct = product;
    this.productModalInfoCollapsed[index] = false;
    this.showProductModalInfo = false;
    this.showCloneConfirmModal = true;
  }

  deleteRow(index) {
    this.deletedRowIndex = index;
    this.productModalInfoCollapsed[index] = false;
    this.showProductModalInfo = false;
    this.showDeleteConfirmModal = true;
  }

  confirmClone() {
    this.productsListInfo.splice(this.clonedRowIndex, 0, this.clonedRowProduct);
  }

  confirmDelete() {
    this.productsListInfo.splice(this.deletedRowIndex, 1);
  }

  clickOutsideInfo(i) {
    this.productModalInfoCollapsed[i] = false;
    this.showProductModalInfo = false;
    this.phoneClicked = false;
    this.emailClicked = false;
  }

  phoneClick(product) {
    this.phoneClicked = true;
    this.emailClicked = false;
    this.expandedInfoModal = false;
    this.formatedPhone = this.formatPhoneNumber(product.phone);
  }

  emailClick() {
    this.phoneClicked = false;
    this.emailClicked = true;
    this.expandedInfoModal = false;
  }

  mapClick(task) {}

  expandProductModal(index) {
    this.phoneClicked = false;
    this.emailClicked = false;
    this.clickSettingCount ++;
    if (this.clickSettingCount % 2 === 1) {
      this.expandedInfoModal = false;
    } else {
      this.expandedInfoModal = true;
    }
  }

  formatPhoneNumber(s) {
    const s2 = ('' + s).replace(/\D/g, '');
    const m = s2.match(/^(\d{3})(\d{3})(\d{4})$/);
    return (!m) ? null : '(' + m[1] + ') ' + m[2] + '-' + m[3];
  }
}

