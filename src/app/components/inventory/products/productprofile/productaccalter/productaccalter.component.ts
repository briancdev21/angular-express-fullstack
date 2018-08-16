import { Component, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SharedService } from '../../../../../services/shared.service';
import { ProductsService } from '../../../../../services/inventory/products.service';
import { ProductProfileService } from '../productprofile.service';

@Component({
  selector: 'app-productaccalter',
  templateUrl: './productaccalter.component.html',
  styleUrls: [
    './productaccalter.component.css'
  ],
  entryComponents: [
  ]
})

export class ProductAccAlterComponent {
  productAccessories: any;
  productAlternatives: any;
  productInfoIndex: any;
  pricingCategoriesListInfo = [];
  productsList = [];
  brandsList = [];
  constructor( private sharedService: SharedService, private productsService: ProductsService, private route: ActivatedRoute,
    private productProfileService: ProductProfileService) {
    this.sharedService.getBrands().subscribe(res => {
      this.brandsList = res.results;
    });

    this.productInfoIndex = this.route.snapshot.paramMap.get('id');

    this.productsService.getProductsList().subscribe(data => {
      this.productsList = data.results;
      this.productsService.getProductAlternativesList(this.productInfoIndex).subscribe(res => {
        this.productAlternatives = res.results;
        console.log('alternatives: ', res);
      });
      this.productsService.getProductAccessoriesList(this.productInfoIndex).subscribe(res => {
        this.productAccessories = res.results;
        console.log('acce: ', res);
      });
    });

    this.productProfileService.editModalClosed.subscribe(data => {
      if (data) {
        this.productsService.getProductAlternativesList(this.productInfoIndex).subscribe(res => {
          this.productAlternatives = res.results;
          console.log('alternatives: ', res);
        });
        this.productsService.getProductAccessoriesList(this.productInfoIndex).subscribe(res => {
          this.productAccessories = res.results;
          console.log('acce: ', res);
        });
      }
    });
  }

  getProductName(id) {
    const selectedProduct = this.productsList.filter(p => p.id === id)[0];
    return selectedProduct.name;
  }

  getModelNumber(id) {
    const selectedProduct = this.productsList.filter(p => p.id === id)[0];
    return selectedProduct.model;
  }

  getBrandId(id) {
    const selectedProduct = this.productsList.filter(p => p.id === id)[0];
    return this.getBrandNameFromId(selectedProduct.brandId);
  }

  getBrandNameFromId(id) {
    const selectedBrand = this.brandsList.filter(b => b.id === id)[0];
    return selectedBrand.name;
  }
  sortArray(sortField) {
  }
}
