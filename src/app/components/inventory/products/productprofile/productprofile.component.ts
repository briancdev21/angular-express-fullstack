import { Component, OnInit, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../../../services/inventory/products.service';
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
  contactInfoIndex: any;
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
    'id': 1,
    'brandId': 0,
    'productTypeId': 0,
    'supplierId': 0,
    'currencyId': 0,
    'keywordIds': [
      1
    ],
    'model': 'Control 4',
    'name': 'C4-HC800',
    'description': 'product description',
    'inventoryType': 'STOCKABLE',
    'status': 'PLACE_ORDER',
    'unitOfMeasure': {
      'quantity': 0,
      'unit': 'PER_UNIT'
    },
    'expiration': {
      'duration': 0,
      'unit': 'HOURS'
    },
    'leadTime': {
      'duration': 0,
      'unit': 'HOURS'
    },
    'quantity': 0,
    'variantCount': 0,
    'pictureURI': 'assets/images/barrow.png',
    'createdAt': '2018-05-15',
    'updatedAt': '2018-05-15'
  };

  public productPricingCategories = [
    {
      'id': 0,
      'productId': 1,
      'category': 'Friend & Family',
      'margin': 0,
      'price': 0,
      'updatedAt': '2018-05-15'
    },
    {
      'id': 1,
      'productId': 0,
      'category': 'Royalty Program',
      'margin': 0,
      'price': 0,
      'updatedAt': '2018-05-15'
    },
    {
      'id': 0,
      'productId': 0,
      'category': 'Retail',
      'margin': 0,
      'price': 0,
      'updatedAt': '2018-05-15'
    },
    {
      'id': 0,
      'productId': 0,
      'category': 'Builders Program',
      'margin': 0,
      'price': 0,
      'updatedAt': '2018-05-15'
    },
    {
      'id': 0,
      'productId': 0,
      'category': 'Wholesale',
      'margin': 0,
      'price': 0,
      'updatedAt': '2018-05-15'
    },
    {
      'id': 0,
      'productId': 0,
      'category': 'Cost',
      'margin': 0,
      'price': 0,
      'updatedAt': '2018-05-15'
    },
  ];

  public productVariants = [
    {
      'sku': 8802013,
      'productId': 1,
      'upc': '846321358163123456613',
      'name': 'White / Icon',
      'cost': 800,
      'supplierCode': 'C4-Hc800-WI',
      'priceAdjustment': 0,
      'quantity': 2,
      'createdAt': '2018-05-15',
      'updatedAt': '2018-05-15',
      'reOrder': 0,
      'po': 0,
      'reserved': 2
    },
    {
      'sku': 8802014,
      'productId': 1,
      'upc': '84632135816312345633',
      'name': 'Black / Icon',
      'cost': 800,
      'supplierCode': 'C4-HC800-BI',
      'priceAdjustment': 0,
      'quantity': 0,
      'createdAt': '2018-05-15',
      'updatedAt': '2018-05-15',
      'reOrder': 1,
      'po': 1,
      'reserved': 0
    },
    {
      'sku': 8802015,
      'productId': 1,
      'upc': '846321358163123457897',
      'name': 'White / No Icon',
      'cost': 800,
      'supplierCode': 'C4-HC800-WNI',
      'priceAdjustment': 20,
      'quantity': 2,
      'createdAt': '2018-05-15',
      'updatedAt': '2018-05-15',
      'reOrder': 0,
      'po': 1,
      'reserved': 2
    },
    {
      'sku': 8802016,
      'productId': 1,
      'upc': '846321358163123453214',
      'name': 'Black / No Icon',
      'cost': 800,
      'supplierCode': 'C4-HC800-WNI',
      'priceAdjustment': 20,
      'quantity': 1,
      'createdAt': '2018-05-15',
      'updatedAt': '2018-05-15',
      'reOrder': 0,
      'po': 0,
      'reserved': 1
    },
  ];

  public productAccessories = [
    {
      sku: 880200000,
      productName: 'SPA Team Installation',
      modelNumber: 'NU-8802',
      brand: 'Nu Automations',
      qty: 14.22,
      price: 1407.38,
      options: 'Automatically'
    },
    {
      sku: 880200001,
      productName: '2 Year Warranty',
      modelNumber: 'NU-WARRANTY-2Y',
      brand: 'Nu Automations',
      qty: 1,
      price: 299,
      options: 'Optional'
    },
  ];

  public productAlternatives = [
    {
      sku: 8000000001,
      productName: 'SPA Team',
      modelNumber: 'NU-8800',
      brand: 'Nu Auto',
      qty: 1,
      price: 200
    }
  ];

  currentContact: any;
  savingContact: any;
  showAddProductModal = false;

  dataRetrieved = false;
  constructor(private router: Router, private route: ActivatedRoute, private productsService: ProductsService) {
    this.contactInfoIndex = this.route.snapshot.paramMap.get('id');
    this.productsService.getIndividualProduct(this.contactInfoIndex).subscribe(res => {
      console.log('product data: ', res.data);

      // Update cards info
      // this.cards = res.data.score;

      // Update donut chart info
      this.chartSetData[0]['percentage'] = res.data.accountRating;
      this.chartSetData[1]['percentage'] = res.data.loyaltyRating;
      this.chartSetData[2]['percentage'] = res.data.dealsRatio;
      this.chartSetData[3]['percentage'] = res.data.serviceRatio;
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
}
