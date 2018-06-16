import { Component, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SharedService } from '../../../../../services/shared.service';
import { ProductsService } from '../../../../../services/inventory/products.service';

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
  constructor( private sharedService: SharedService, private productsService: ProductsService, private route: ActivatedRoute) {
    this.productInfoIndex = this.route.snapshot.paramMap.get('id');
    this.productsService.getProductPricingsList(this.productInfoIndex).subscribe(res => {
      this.pricingCategoriesListInfo = res.results;
    });
  }
}
