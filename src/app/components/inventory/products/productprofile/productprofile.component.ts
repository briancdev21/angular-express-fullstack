import { Component, OnInit, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../../../services/inventory/products.service';
import { SharedService } from '../../../../services/shared.service';
import * as moment from 'moment';

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
  public chartSetData: Array<Object> = [
    {
      title: 'Unit Cycle Time',
      percentage: 10,
    },
    {
      title: 'Average Lead Time',
      percentage: 0,
    },
    {
      title: 'Average Unit Cost',
      percentage: 0,
    },
    {
      title: 'QTY Project Ratio',
      percentage: 0,
    }
  ];
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

  public productInfo = {
    // 'id': 1,
    // 'brandId': 0,
    // 'productTypeId': 0,
    // 'supplierId': 0,
    // 'currencyId': 0,
    // 'keywordIds': [
    //   1
    // ],
    // 'model': 'Control 4',
    // 'name': 'C4-HC800',
    // 'description': 'product description',
    // 'inventoryType': 'STOCKABLE',
    // 'status': 'PLACE_ORDER',
    // 'unitOfMeasure': {
    //   'quantity': 0,
    //   'unit': 'PER_UNIT'
    // },
    // 'expiration': {
    //   'duration': 0,
    //   'unit': 'HOURS'
    // },
    // 'leadTime': {
    //   'duration': 0,
    //   'unit': 'HOURS'
    // },
    // 'quantity': 0,
    // 'variantCount': 0,
    // 'pictureURI': 'assets/images/barrow.png',
    // 'createdAt': '2018-05-15',
    // 'updatedAt': '2018-05-15'
  };

  public productPricingCategories = [
  ];

  public productVariants = [
  ];

  public productAccessories = [
  ];

  public productAlternatives = [
  ];

  currentContact: any;
  savingContact: any;
  showAddProductModal = false;
  brandsList = [];

  dataRetrieved = false;
  constructor(private router: Router, private route: ActivatedRoute, private productsService: ProductsService,
    private sharedService: SharedService) {
    this.productInfoIndex = this.route.snapshot.paramMap.get('id');

    this.sharedService.getBrands().subscribe(res => {
      this.brandsList = res.results;

      this.productsService.getIndividualProduct(this.productInfoIndex).subscribe(response => {
        console.log('product data: ', response.data);

        // Update cards info
        // this.cards = res.data.score;

        // Update donut chart info
        // this.chartSetData[0]['percentage'] = res.data.accountRating;
        // this.chartSetData[1]['percentage'] = res.data.loyaltyRating;
        // this.chartSetData[2]['percentage'] = res.data.dealsRatio;
        // this.chartSetData[3]['percentage'] = res.data.serviceRatio;

        this.productInfo = response.data;
        this.productInfo['brandName'] = this.getBrandNameFromId(response.data.brandId);

        // get variant info
        this.productsService.getVariantsList(this.productInfoIndex).subscribe(data => {
          console.log('variants: ', data);
          this.productVariants = data.results;
        });
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
    console.log('sleetedbrand: ', this.brandsList);
    const selectedBrand = this.brandsList.filter(b => b.id === id)[0];
    console.log('sleetedbrand: ', selectedBrand);
    return selectedBrand.name;
  }
}
