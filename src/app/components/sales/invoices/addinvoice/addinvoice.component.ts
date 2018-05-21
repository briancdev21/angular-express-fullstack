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
    this.newInvoice = {
      'currencyId': 1,
      'contactId': 1,
      'pricingCategoryId': 1,
      'classificationId': 1,
      'categoryId': 1,
      'termId': 1,
      'emails': [
        'test@test.com'
      ],
      'startDate': this.today,
      'acceptOnlinePayment': true,
      'chargeLateFee': true,
      'lateFee': {
        'value': 0,
        'unit': 'AMOUNT'
      },
      'recurring': [
        'RRULE:FREQ=MONTHLY;COUNT=1;DTSTART=20180201T023000Z'
      ],
      'reminder': [
        'Reminder'
      ],
      'shippingAddress': {
        'address': '',
        'city': '',
        'province': '',
        'postalCode': '',
        'country': ''
      },
      'billingAddress': {
        'address': '',
        'city': '',
        'province': '',
        'postalCode': '',
        'country': ''
      },
      'internalNote': '',
      'customerNote': '',
      'terms': '',
      'discount': {
        'value': 0,
        'unit': 'AMOUNT'
      }
    };

    if (!this.route.snapshot.paramMap.get('id')) {
      this.invoicesService.createInvoice(this.newInvoice).subscribe (res => {
        this.createdInvoice = res.data;
      });
    }
  }

  ngOnInit() {

  }

  toggleMenubar(data: boolean) {
    this.menuCollapsed  = data;
  }

}
