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
    // this.ad_mock = new AdjustmentModel();
    this.ad_mock = _addata;
    if (_addata) {
      this.ad_id = `AD-${this.ad_mock.id}`;
      this.fromLocation = this.ad_mock.adjustedLocationId;
      this.ad_mock.adjustedLocation = this.ad_mock.adjustedLocationId;
    }
  }
  saveBtnClicked = false;
  locations: string[] = [];
  fromLocation: number;
  productDetails = [];
  internalMemo = undefined;
  ad_id = '';
  ad_mock: any;
  transferdate: any;
  showSendPOModal = false;
  showCancelPOModal = false;
  showErrors = false;
  errors = {
    locationChanged: false,
    memoChanged: false,
  };

  constructor(private sharedService: SharedService, private router: Router) {
    this.transferdate = new Date().toISOString();
    this.sharedService.getLocations().subscribe(locationRes => {
      this.locations = locationRes.results;
    });
  }

  ngOnDestroy() {
    console.log('ng destroy called');
  }

  onSelectLocation(event) {
    this.errors.locationChanged = true;
    this.ad_mock.adjustedLocation = event;
    this.updateAD();
  }

  onMemoChanged(event) {
    // console.log('event memo changed');
    if (event) {
      this.errors.memoChanged = true;
      this.ad_mock.internalMemo = event;
      this.updateAD();
    }
  }

  onCancel() {
    this.showCancelPOModal = true;
  }

  onDelete () {
    this.deletePO();
  }

  deletePO() {
    this.sharedService.deleteInventoryAdjustment(this.ad_mock.id).subscribe(() => {
      this.router.navigate(['./inventory/stock-control']);
    });
  }
  onSave() {
    console.log('mock:', this.ad_mock);
    this.showErrors = true;
    if (this.ad_mock.adjustedLocation !== undefined) {
      this.ad_mock.status = 'ADJUSTED';
      this.sharedService.updateInventoryAdjustment(this.ad_mock.id, this.ad_mock).subscribe(() => {
        this.router.navigate(['./inventory/stock-control']);
      });
    }
  }
  savePO() {
  }
  updateAD() {
    this.sharedService.updateInventoryAdjustment(this.ad_mock.id, this.ad_mock).subscribe(() => {
    });
  }
}
