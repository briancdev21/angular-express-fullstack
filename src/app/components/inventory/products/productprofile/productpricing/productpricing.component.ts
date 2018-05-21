import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-productpricing',
  templateUrl: './productpricing.component.html',
  styleUrls: [
    './productpricing.component.css'
  ],
  entryComponents: [
  ]
})

export class ProductPricingComponent {

  private pricingType = ['Friend & Family', 'Royalty Program', 'Retail', 'Builders Program', 'Wholesale', 'Cost'];
  private pricingData = {
    friendMargin: undefined,
    friendPrice: undefined,
    royaltyPrice: undefined,
    royaltyMargin: undefined,
    builderPrice: undefined,
    buildersMargin: undefined,
    wholesalePrice: undefined,
    wholesaleMargin: undefined,
    retailPrice: undefined,
    retailMargin: undefined,
    costPrice: undefined,
    costMargin: undefined,
  };
  constructor() {

  }
}
