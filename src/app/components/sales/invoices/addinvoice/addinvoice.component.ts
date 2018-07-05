import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { InvoicesService } from '../../../../services/invoices.service';
import { FilterService } from '../filter.service';
import * as moment from 'moment';
import { EstimatesService } from '../../../../services/estimates.service';
import { EstimateModel } from '../../../../models/estimate.model';

@Component({
  selector: 'app-addinvoice',
  templateUrl: './addinvoice.component.html',
  styleUrls: [
    './addinvoice.component.css',
  ]
})

export class AddInvoiceComponent implements OnInit {

  menuCollapsed = true;
  status = '';
  newInvoice = {};
  today = moment().format('YYYY-MM-DD');
  public createdInvoice;

  constructor( private invoicesService: InvoicesService, private router: Router, private route: ActivatedRoute ) {

  }

  ngOnInit() {

  }

  toggleMenubar(data: boolean) {
    this.menuCollapsed  = data;
  }

}
