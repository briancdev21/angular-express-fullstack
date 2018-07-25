import { Component, OnInit } from '@angular/core';
import { CommonComponent } from '../../common/common.component';
import { SharedService } from '../../../services/shared.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-receiveinventorydetail',
  templateUrl: './receiveinventorydetail.component.html',
  styleUrls: [
    './receiveinventorydetail.component.css'
  ],
  entryComponents: [
    CommonComponent
  ],
})
export class ReceiveInventoryDetailComponent implements OnInit {
  menuCollapsed = true;
  searchKeyword: any;
  purcahseOrderId: any;

  constructor( private sharedService: SharedService, private activeRoute: ActivatedRoute, private router: Router ) {
    // get collaborators
    const routeParams = this.activeRoute.snapshot.params;
    this.purcahseOrderId = routeParams.id;
    this.getPurchaseOrderList();
  }

  productsInfo = [];
  brandList = [];
  supplierList = [];
  updatedProductInfo = [];
  searchKeyList = [];

  public documents: Array<Object> = [
    {
      documentName: 'Nu Life Proposal',
      documentDate: 'January 2, 2017'
    }
  ];
  public upcomingModal: object = {
    week: 'WEDNESDAY',
    date: 'NOVEMBER 1, 2017',
    start: '9:30 AM',
    end: '11:00 AM',
    duration: '1 hr, 30 min'
  };

  activity: {
    title: string;
    subject: string;
    contact: string;
    content: string;
  };


  ngOnInit() {
  }

  getPurchaseOrderList() {
    this.sharedService.getBrands().subscribe(res => {
      this.brandList = res.results;
      this.sharedService.getSuppliers().subscribe(res => {
        this.supplierList = res.results;
        this.sharedService.getPurchaseOrderProducts(this.purcahseOrderId).subscribe(res => {
          res.results.forEach(product => {

            if (this.brandList.filter(brand => brand.id === product.brandId).pop() !== undefined) {
              product.brand = this.brandList.filter(brand => brand.id === product.brandId).pop().name;
            }
            if (this.supplierList.filter(supplier => supplier.id === product.supplierId).pop() !== undefined) {
              product.supplier = this.supplierList.filter(supplier => supplier.id === product.supplierId).pop().name;
            }
          });
          this.productsInfo = res.results;
        });
      });
    });
  }

  toggleMenubar(data: boolean) {
    this.menuCollapsed  = data;
  }

  searchKeywordChanged() {
    const keyword = this.searchKeyword;

    this.sharedService.getPurchaseOrderProducts(this.purcahseOrderId).subscribe(res => {
      const filteredProducts = [];
      res.results.forEach(product => {
        if (product.sku.indexOf(keyword) !== -1 ||
          product.name.indexOf(keyword) !== -1 ||
          product.model.indexOf(keyword) !== -1
        ) {
          if (this.brandList.filter(brand => brand.id === product.brandId).pop() !== undefined) {
            product.brand = this.brandList.filter(brand => brand.id === product.brandId).pop().name;
          }
          if (this.supplierList.filter(supplier => supplier.id === product.supplierId).pop() !== undefined) {
            product.supplier = this.supplierList.filter(supplier => supplier.id === product.supplierId).pop().name;
          }
          filteredProducts.push(product);
        }
      });
      this.productsInfo = filteredProducts;
      console.log('product info:', this.productsInfo);
    });
  }

  productInfoUpdated(event) {
    this.productsInfo = event;
    console.log('updated product info:', this.productsInfo);
  }
  
  onSave() {
    this.productsInfo.forEach(product => {
      this.sharedService.updatePurchaseOrderProduct(product.purchaseOrderId, product.id, product).subscribe();
    });
    this.router.navigate(['inventory/stock-control/received-inventory']);
  }

  onCancel() {
    this.router.navigate(['inventory/stock-control/received-inventory']);
  }
}