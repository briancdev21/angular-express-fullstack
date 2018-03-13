import { Component, Input, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { FilterService } from '../filter.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-invoiceslisttable',
  templateUrl: './invoiceslisttable.component.html',
  styleUrls: [
    './invoiceslisttable.component.css',
  ],
  providers: [FilterService],
})


export class InvoicesListTableComponent implements OnInit {

  @Input() invoicesListInfo;
  addLogModalCollapsed = true;
  showAddLogModal = false;
  showInvoiceModalInfo = false;
  invoiceModalInfoCollapsed = [];
  sortClicked = true;
  clicked = false;
  sortScoreClicked = true;
  showModal: boolean = false;
  switchIcon: boolean = false;
  showCloneConfirmModal = false;
  showDeleteConfirmModal = false;
  clonedRowInvoice: any;
  clonedRowIndex: number;
  deletedRowIndex: number;
  sortInvoiceStatusArr: any;
  clickSettingCount = 0;
  expandedInfoModal = false;
  phoneClicked = false;
  emailClicked = false;
  mapClicked = false;
  formatedPhone = '';

  activity: {
    title: string;
    subject: string;
    invoice: string;
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
    this.invoicesListInfo.map(p => {
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
        return 'No stock!';
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
    this.router.navigate(['../invoice/' + id]);
  }

  sortArray(field) {
    const cmp = this;
    cmp.sortScoreClicked = ! cmp.sortScoreClicked;
    if (!cmp.sortScoreClicked) {
      this.invoicesListInfo.sort( function(name1, name2) {
        if ( name1[field] < name2[field] ) {
          return -1;
        } else if ( name1[field] > name2[field]) {
          return 1;
        } else {
          return 0;
        }
      });
    } else {
      this.invoicesListInfo.reverse();
    }
  }


  // SortInvoiceStatus() {
  //   const cmp = this;
  //   cmp.sortScoreClicked = ! cmp.sortScoreClicked;
  //   if (!cmp.sortScoreClicked) {
  //     this.sortInvoiceStatusArr = this.invoicesListInfo.filter(invoice => invoice.status === 'New');
  //     this.sortInvoiceStatusArr.push(this.invoicesListInfo.filter(invoice => invoice.status === 'Follow-up'));
  //     this.sortInvoiceStatusArr.push(this.invoicesListInfo.filter(invoice => invoice.status === 'Seen'));
  //     this.sortInvoiceStatusArr.push(this.invoicesListInfo.filter(invoice => invoice.status === 'Demo'));
  //     this.sortInvoiceStatusArr.push(this.invoicesListInfo.filter(invoice => invoice.status === 'Negotiation'));
  //     this.sortInvoiceStatusArr.push(this.invoicesListInfo.filter(invoice => invoice.status === 'Won'));
  //     this.sortInvoiceStatusArr.push(this.invoicesListInfo.filter(invoice => invoice.status === 'Lost'));
  //     this.invoicesListInfo = _.flatten(this.sortInvoiceStatusArr);
  //   } else {
  //     this.invoicesListInfo.reverse();
  //   }
  // }

}

