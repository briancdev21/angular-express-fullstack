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

  constructor( private filterService: FilterService,  private sharedService: SharedService ) {

  }

  ngOnInit() {
  }

  getFormatedDate(date) {
    return moment(date).format('MMMM DD, YYYY');
  }

}

