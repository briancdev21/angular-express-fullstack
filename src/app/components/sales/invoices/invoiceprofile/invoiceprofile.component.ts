import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { InvoicesService } from '../../../../services/invoices.service';
import { FilterService } from '../filter.service';
import * as moment from 'moment';
import { EstimatesService } from '../../../../services/estimates.service';
import { EstimateModel } from '../../../../models/estimate.model';

@Component({
  selector: 'app-invoiceprofile',
  templateUrl: './invoiceprofile.component.html',
  styleUrls: [
    './invoiceprofile.component.css',
  ]
})

export class InvoiceProfileComponent implements OnInit {

  menuCollapsed = true;
  status = '';
  newInvoice = {};
  newEstimate = {};
  today = moment().format('YYYY-MM-DD');

  constructor( private invoicesService: InvoicesService, private router: Router, private route: ActivatedRoute ) {

  }

  ngOnInit() {

  }

  toggleMenubar(data: boolean) {
    this.menuCollapsed  = data;
  }

}
