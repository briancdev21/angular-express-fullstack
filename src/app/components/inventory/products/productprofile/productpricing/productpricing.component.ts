import { Component, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SharedService } from '../../../../../services/shared.service';
import { ProductsService } from '../../../../../services/inventory/products.service';
import { ProductProfileService } from '../productprofile.service';
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

  productInfoIndex: any;
  pricingCategoriesListInfo = [];
  constructor( private sharedService: SharedService, private productsService: ProductsService, private route: ActivatedRoute,
    private productProfileService: ProductProfileService) {
    this.productInfoIndex = this.route.snapshot.paramMap.get('id');
    this.retrievePricingData();

    this.productProfileService.productPricingCategoryUpdate.subscribe(res => {
      if (res) {
        this.retrievePricingData();
      }
    });
  }

  retrievePricingData() {
    this.productsService.getProductPricingsList(this.productInfoIndex).subscribe(res => {
      this.pricingCategoriesListInfo = res.results;
    });
  }
}
