import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FilterService } from '../filter.service';
import * as moment from 'moment';
import { EstimatesService } from '../../../../services/estimates.service';
import { EstimateModel } from '../../../../models/estimate.model';

@Component({
  selector: 'app-addestimate',
  templateUrl: './addestimate.component.html',
  styleUrls: [
    './addestimate.component.css',
  ]
})

export class AddEstimateComponent implements OnInit {

  menuCollapsed = true;
  status = '';
  newEstimate = {};
  today = moment().format('YYYY-MM-DD');
  public createdEstimate;

  constructor( private estimatesService: EstimatesService, private route: ActivatedRoute ) {
    this.newEstimate = {
      'currencyId': 1,
      'contactId': 1,
      'pricingCategoryId': 1,
      'classificationId': 1,
      'categoryId': 1,
      'termId': 1,
      'emails': [
        'test@gmail.com'
      ],
      'recurring': [
        'RRULE:FREQ=MONTHLY;COUNT=5;DTSTART=20120201T023000Z'
      ],
      'reminder': [
        ''
      ],
      'shippingAddress': {
        'address': '',
        'city': '',
        'province': 'ON',
        'postalCode': '',
        'country': 'CA'
      },
      'billingAddress': {
        'address': '',
        'city': '',
        'province': 'ON',
        'postalCode': '',
        'country': 'CA'
      },
      'internalNote': '',
      'customerNote': '',
      'terms': '',
      'discount': {
        'value': 0,
        'unit': 'AMOUNT'
      },
      'expiryDate': this.today,
      'deposit': 0,
    };
    if (!this.route.snapshot.paramMap.get('id')) {
      this.estimatesService.createEstimate(this.newEstimate).subscribe (res => {
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
