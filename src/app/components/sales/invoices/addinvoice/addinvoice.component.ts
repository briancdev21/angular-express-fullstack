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
  newEstimate = {};
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
        'RRULE:FREQ=MONTHLY;COUNT=5;DTSTART=20120201T023000Z'
      ],
      'reminder': [
        'Reminder'
      ],
      'shippingAddress': {
        'address': 'Enter Shipping Address',
        'city': 'Enter City',
        'province': 'Enter Province',
        'postalCode': 'Enter Postal Code',
        'country': 'Enter Country'
      },
      'billingAddress': {
        'address': 'Enter Billing Address',
        'city': 'Enter City',
        'province': 'Enter Province',
        'postalCode': 'Enter Postal Code',
        'country': 'Enter Country'
      },
      'internalNote': 'string',
      'customerNote': 'string',
      'terms': 'string',
      'discount': {
        'value': 0,
        'unit': 'AMOUNT'
      }
    };

    this.newEstimate = {
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
      'recurring': [
        'RRULE:FREQ=MONTHLY;COUNT=5;DTSTART=20120201T023000Z'
      ],
      'reminder': [
        'Reminder'
      ],
      'shippingAddress': {
        'address': 'Enter Shipping Address',
        'city': 'Enter City',
        'province': 'Enter Province',
        'postalCode': 'Enter Postal Code',
        'country': 'Enter Country'
      },
      'billingAddress': {
        'address': 'Enter Billing Address',
        'city': 'Enter City',
        'province': 'Enter Province',
        'postalCode': 'Enter Postal Code',
        'country': 'Enter Country'
      },
      'internalNote': 'string',
      'customerNote': 'string',
      'terms': 'string',
      'discount': {
        'value': 0,
        'unit': 'AMOUNT'
      },
      'expiryDate': this.today,
    };
    if (!this.route.snapshot.paramMap.get('id')) {
      console.log('routing to addinvoice0');
      this.invoicesService.createInvoice(this.newInvoice).subscribe (res => {
        console.log('routing to addinvoice', res);
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
