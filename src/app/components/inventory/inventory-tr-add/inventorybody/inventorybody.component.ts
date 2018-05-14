import { Component, OnInit, Input } from '@angular/core';
import { ProductDetailInfo } from '../../../../models/ProductDetailInfo.model';
import { TransferModel } from '../../../../models/transfer.model';
import { SharedService } from '../../../../services/shared.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inventorybody',
  templateUrl: './inventorybody.component.html',
  styleUrls: ['./inventorybody.component.css']
})
export default class InventoryBodyComponent {

  @Input() set trData(_trdata) {
    this.tr_mock = new TransferModel();
    this.tr_mock = _trdata;
    if (_trdata !== undefined) {
      console.log('trd data:', _trdata);
      this.tr_mock.toLocation = undefined;
      this.tr_mock.fromLocation = undefined;
      if (_trdata) {
        this.tr_id = `TR-${this.tr_mock.id}`;
      }
    }
  }

  locations: string[] = [];
  productDetails = [];
  internalMemo = undefined;
  tr_id = '';
  tr_mock: TransferModel;
  createdDate: any;
  transferdate: any;

  constructor(private sharedService: SharedService, private router: Router) {
    this.createdDate = new Date().toISOString();
    this.transferdate = new Date().toISOString();

    this.sharedService.getLocations().subscribe(locationRes => {
      this.locations = locationRes.results;
    });
  }

  onMemoChanged(event) {
    this.tr_mock.internalMemo = event;
  }

  onSelectLocation(event) {
    this.tr_mock.fromLocation = parseInt(event.fromLocation, 10);
    this.tr_mock.toLocation = parseInt(event.toLocation, 10);
    console.log('mock:', this.tr_mock);
  }

  onCancel() {
    this.sharedService.deleteTransfer(this.tr_mock.id).subscribe(() => {
      this.router.navigate(['./inventory/stock-control']);
    });
  }

  onSave() {
    console.log('mock:', this.tr_mock);
    // tslint:disable-next-line:curly
    if (this.tr_mock.fromLocation !== null &&
      this.tr_mock.toLocation !== null &&
      this.tr_mock.internalMemo !== null
    )
    this.sharedService.updateTransfer(this.tr_mock.id, this.tr_mock).subscribe(() => {
      this.router.navigate(['./inventory/stock-control']);
    });
  }
}
