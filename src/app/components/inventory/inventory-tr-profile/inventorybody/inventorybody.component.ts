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
export class InventoryBodyComponent {

  @Input() set trData(_trdata) {
    this.tr_mock = new TransferModel();
    this.tr_mock = _trdata;
    if (_trdata !== undefined) {
      this.tr_mock.toLocation = _trdata.toLocation;
      this.toLocation = _trdata.toLocation;
      this.tr_mock.fromLocation = _trdata.fromLocation;
      this.fromLocation = _trdata.fromLocation;
      this.tr_mock.internalMemo = _trdata.internalMemo;
      this.transferdate = _trdata.createdAt;
      this.tr_id = `TR-${this.tr_mock.id}`;
      if (this.tr_mock.id !== undefined) {
        this.sharedService.getTransferProducts(this.tr_mock.id).subscribe( productRes => {
          this.productDetails = productRes.results;
          this.productDetails.forEach(productDetail => {
            productDetail.discount = productDetail.discount.value;
          });
        });
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
  toLocation: any;
  fromLocation: any;
  showButtons = false;
  showSendPOModal = false;
  showCancelPOModal = false;
  showErrors = false;
  errors = {
    locationToChanged: false,
    locationFromChanged: false,
  };

  constructor(private sharedService: SharedService, private router: Router) {
    this.createdDate = new Date().toISOString();

    this.sharedService.getLocations().subscribe(locationRes => {
      this.locations = locationRes.results;
    });
  }

  onMemoChanged(event) {
    if (event) {
      this.tr_mock.internalMemo = event;
      this.updateTR();
    }
  }

  onSelectLocation(event) {
    console.log('event data;', event);
    if (event.fromLocation !== 'default') {
      this.tr_mock.fromLocation = parseInt(event.fromLocation, 10);
    }
    if (event.toLocation !== 'default') {
      this.tr_mock.toLocation = parseInt(event.toLocation, 10);
    }
    console.log('mock:', this.tr_mock);
    this.updateTR();
  }

  onCancel() {
    this.showCancelPOModal = true;
  }

  deletePO() {
    this.sharedService.deleteTransfer(this.tr_mock.id).subscribe(() => {
      this.router.navigate(['./inventory/stock-control']);
    });
  }

  onSave() {
    console.log('mock:', this.tr_mock);
    if (this.tr_mock.fromLocation !== undefined &&
      this.tr_mock.toLocation !== undefined
    ) {
      this.showSendPOModal = true;
    }
  }

  savePO() {
    this.tr_mock.status = 'TRANSFERRED';
    this.sharedService.updateTransfer(this.tr_mock.id, this.tr_mock).subscribe(() => {
      this.router.navigate(['./inventory/stock-control']);
    });
  }

  updateTR() {
    this.sharedService.updateTransfer(this.tr_mock.id, this.tr_mock).subscribe(() => {
    });
  }
}
