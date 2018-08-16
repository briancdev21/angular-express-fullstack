import { Component, OnInit, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../../../services/inventory/products.service';
import { SharedService } from '../../../../services/shared.service';
import * as moment from 'moment';
import { ProductProfileService } from './productprofile.service';

@Component({
  selector: 'app-productprofile',
  templateUrl: './productprofile.component.html',
  styleUrls: [
    './productprofile.component.css'
  ],
  entryComponents: [
  ]
})
export class ProductProfileComponent implements OnInit {

  menuCollapsed = true;
  productsInfoAll: any;
  productInfoIndex: any;
  dateSelectorList = [
    'Today',
    'Yesterday',
    'This Week',
    'Last Week',
    'This Month',
    'Last Month',
    'This Year',
    'Last Year',
    'This Quarter',
    'Last Quarter'
  ];

  productPathInfo = ['Product', 'Home Controller 800'];
  public chartSetData: any;
   /**
    * Each item will have title,content,complete flag and icon
    * which will be displayed on the side. Icon is in html
    */

  public cardsInfo =
    {
      variantInventory: {
        status: 'Place Order',
        underReOrder: 0,
        reOrder: 1,
        onOrder: 2
      },
      projects: {
        time: 'This Month',
        reserved: 5,
        onOrder: 2,
        delivered: 0
      }
    };

  public productInfo: any;

  public productPricingCategories = [];
  public productVariants = [];
  public productAccessories = [];
  public productAlternatives = [];

  currentContact: any;
  savingContact: any;
  showAddProductModal = false;
  brandsList = [];

  dataRetrieved = false;
  constructor(private router: Router, private route: ActivatedRoute, private productsService: ProductsService,
    private sharedService: SharedService, private productProfileService: ProductProfileService) {
    this.productInfoIndex = this.route.snapshot.paramMap.get('id');
    this.retrieveVariantsData();

    this.productProfileService.editModalClosed.subscribe(res => {
      if (res) {
        this.retrieveVariantsData();
      }
    });

    this.productProfileService.productDetailsUpdate.subscribe(res => {
      if (res) {
        this.retrieveVariantsData();
      }
    });
  }

  retrieveVariantsData() {
    this.sharedService.getBrands().subscribe(res => {
      this.brandsList = res.results;

      this.productsService.getIndividualProduct(this.productInfoIndex).subscribe(response => {
        console.log('individual product: ', response);

        this.productInfo = response.data;
        this.productInfo['brandName'] = this.getBrandNameFromId(response.data.brandId);

        // get variant info
        this.productsService.getVariantsList(this.productInfoIndex).subscribe(data => {
          this.productVariants = data.results;
        });

        this.chartSetData = [
          {
            title: 'Unit Cycle Time',
            percentage: this.productInfo.unitCycleTime,
          },
          {
            title: 'Average Lead Time',
            percentage: this.productInfo.averageLeadTime,
          },
          {
            title: 'Average Unit Cost',
            percentage: this.productInfo.averageUnitCost,
          },
          {
            title: 'QTY Project Ratio',
            percentage: this.productInfo.qtyProjectRatio * 100,
          }
        ];

      });
    });
  }

  ngOnInit() {
  }

  toggleMenubar(data: boolean) {
    this.menuCollapsed  = data;
  }

  onChangedUserInfo(event) {
    console.log(event);
  }

  openEditProductModal() {
    this.showAddProductModal = true;
  }

  closeEditModal(event) {
    this.showAddProductModal = false;
  }

  getBrandNameFromId(id) {
    const selectedBrand = this.brandsList.filter(b => b.id === id)[0];
    return selectedBrand.name;
  }

  redirectToProducts() {
    this.router.navigate([`./inventory/products`]);
  }
}
