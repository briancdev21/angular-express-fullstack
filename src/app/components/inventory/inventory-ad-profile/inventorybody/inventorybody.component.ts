import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ProductDetailInfo } from '../../../../models/ProductDetailInfo.model';
import { SharedService } from '../../../../services/shared.service';
import { Router } from '@angular/router';
import { AdjustmentModel } from '../../../../models/adjustment.model';
@Component({
  selector: 'app-inventorybody',
  templateUrl: './inventorybody.component.html',
  styleUrls: ['./inventorybody.component.css']
})
export class InventoryBodyComponent implements OnDestroy {
  userList = ['John', 'Smith', 'jackie'];

  projects = ['task1', 'task2', 'task3'];
  labelText = 'Use customer address';
  shippingAddress = {
    address: '',
    street: '',
    city: '',
    country: '',
    postcode: ''
  };
  customerAddress =  {
    address: '301,1615 10th Ave SW',
    street: 'Calgary',
    city: 'Alberta',
    country: 'Canada',
    postcode: 'T3C 0J7'
  };
  showButtons = false;

  @Input() set adData(_addata) {
    if (_addata !== undefined) {
      this.ad_mock = _addata;
      this.ad_id = `AD-${this.ad_mock.id}`;
      this.transferdate = _addata.createdAt;
      this.adjustedLocation = _addata.adjustedLocationId;
      this.ad_mock.adjustedLocation = _addata.adjustedLocationId;
      this.internalMemo = _addata.internalMemo;
      this.sharedService.getInventoryAdjustmentProducts(this.ad_mock.id).subscribe( productRes => {
        this.productDetails = productRes.results;
        this.productDetails.forEach(productDetail => {
          productDetail.readonly = true;
          productDetail.discount = productDetail.discount !== undefined ? productDetail.discount.value : undefined;
        });
      });
    }
  }
  saveBtnClicked = false;
  locations: string[] = [];
  productDetails = [];
  internalMemo = undefined;
  ad_id = '';
  ad_mock: AdjustmentModel;
  transferdate: any;
  showSendPOModal = false;
  showCancelPOModal = false;
  showErrors = false;
  errors = {
    locationChanged: false,
    memoChanged: false,
  };
  adjustedLocation: any;

  constructor(private sharedService: SharedService, private router: Router) {
    this.transferdate = new Date().toISOString();
    this.ad_mock = new AdjustmentModel();
    console.log('this admock', this.ad_mock);
    this.ad_mock.status = 'OPEN';
    this.sharedService.getLocations().subscribe(locationRes => {
      this.locations = locationRes.results;
    });
  }

  ngOnDestroy() {
    console.log('ng destroy called');
  }

  onSelectLocation(event) {
    this.errors.locationChanged = true;
    this.ad_mock.adjustedLocation = parseInt(event, 10);
    console.log('mock:', this.ad_mock);
    this.updateAD();
  }

  onMemoChanged(event) {
    if (event) {
      this.errors.memoChanged = true;
      this.ad_mock.internalMemo = event;
      this.updateAD();
    }
  }

  onCancel() {
    this.showCancelPOModal = true;
  }

  deletePO() {
    this.sharedService.deleteInventoryAdjustment(this.ad_mock.id).subscribe(() => {
      this.router.navigate(['./inventory/stock-control']);
    });
  }

  onSave() {
    console.log('mock:', this.ad_mock);
    this.showErrors = true;
    if (this.ad_mock.status === 'OPEN') {
      this.ad_mock.status = 'ADJUSTED';
      this.sharedService.updateInventoryAdjustment(this.ad_mock.id, this.ad_mock).subscribe(() => {
        this.router.navigate(['./inventory/stock-control']);
      });
    } else {
      this.router.navigate(['./inventory/stock-control']);
    }
  }

  savePO() {
  }

  updateAD() {
    if (this.ad_mock.status === 'OPEN') {
      this.sharedService.updateInventoryAdjustment(this.ad_mock.id, this.ad_mock).subscribe(() => {
      });
    }
  }

}
