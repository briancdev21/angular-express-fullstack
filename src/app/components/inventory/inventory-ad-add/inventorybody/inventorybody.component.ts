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
export class InventoryBodyComponent {
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


  @Input() set adData(_addata) {
    this.ad_mock = new AdjustmentModel();
    this.ad_mock = _addata;
    if (_addata) {
      this.ad_id = `AD-${this.ad_mock.id}`;
    }
  }
  saveBtnClicked = false;
  locations: string[] = [];
  productDetails = [];
  internalMemo = undefined;
  ad_id = '';
  ad_mock: AdjustmentModel;
  transferdate: any;

  constructor(private sharedService: SharedService, private router: Router) {
    this.transferdate = new Date().toISOString();
    this.sharedService.getLocations().subscribe(locationRes => {
      this.locations = locationRes.results;
    });
  }

  ngOnDestroy() {
    if (this.saveBtnClicked) {
      console.log('ng destroy called');
    }
  }
  onSelectLocation(event) {
    this.ad_mock.adjustedLocation = parseInt(event, 10);
    console.log('mock:', this.ad_mock);
  }

  onMemoChanged(event) {
    this.ad_mock.internalMemo = event;
  }

  onCancel() {
    this.sharedService.deleteInventoryAdjustment(this.ad_mock.id).subscribe(() => {
      this.router.navigate(['./inventory/stock-control']);
    });
  }

  onSave() {
    console.log('mock:', this.ad_mock);
    this.saveBtnClicked = true;
    // tslint:disable-next-line:curly
    if (this.ad_mock.internalMemo !== null && this.ad_mock.adjustedLocation !== null) {
      this.sharedService.updateInventoryAdjustment(this.ad_mock.id, this.ad_mock).subscribe(() => {
        this.router.navigate(['./inventory/stock-control']);
      });
    }
  }

}
