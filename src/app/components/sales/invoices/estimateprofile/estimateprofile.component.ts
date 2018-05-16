import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { InvoicesService } from '../../../../services/invoices.service';
import { FilterService } from '../filter.service';
import * as moment from 'moment';
import { EstimatesService } from '../../../../services/estimates.service';
import { EstimateModel } from '../../../../models/estimate.model';

@Component({
  selector: 'app-estimateprofile',
  templateUrl: './estimateprofile.component.html',
  styleUrls: [
    './estimateprofile.component.css',
  ]
})

export class EstimateProfileComponent implements OnInit {

  menuCollapsed = true;
  status = '';
  newEstimate = {};
  today = moment().format('YYYY-MM-DD');
  public createdEstimate;

  constructor( private estimatesService: EstimatesService, private router: Router, private route: ActivatedRoute ) {

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
      this.estimatesService.createEstimate(this.newEstimate).subscribe (res => {
        console.log('routing to addinvoice', res);
        this.createdEstimate = res.data;
      });
    }
  }

  ngOnInit() {

  }

  toggleMenubar(data: boolean) {
    this.menuCollapsed  = data;
  }

}
