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
  sortClicked = true;
  clicked = false;
  sortScoreClicked = true;

  constructor( private filterService: FilterService, private router: Router ) {
  }

  ngOnInit() {
    this.invoicesListInfo.map(i => i.overdueDays = this.calcOverDueDays(i.dueDate, i.status));
  }

  getStatus() {
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

  calcOverDueDays(due, status) {
    const today = new Date();
    const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    const dueDate = new Date(due);
    const diffDays = Math.round(Math.abs((today.getTime() - dueDate.getTime()) / (oneDay)));
    if (status === 'Paid' || status === 'Estimate') {
      return 0;
    }
    if (diffDays < 0) {
      return 0;
    } else {
      return diffDays;
    }
  }

  sortCreateDateArray(field) {
    const cmp = this;
    cmp.sortScoreClicked = ! cmp.sortScoreClicked;
    if (!cmp.sortScoreClicked) {
      this.invoicesListInfo.sort( function(name1, name2) {
        if ( Date.parse(name1[field]) < Date.parse(name2[field]) ) {
          return -1;
        } else if ( Date.parse(name1[field]) > Date.parse(name2[field])) {
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

