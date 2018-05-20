import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-shippingaddress',
  templateUrl: './shippingaddress.component.html',
  styleUrls: ['./shippingaddress.component.css']
})
export class ShippingAddressComponent implements OnInit {
  @Input() set customerAddress(contactUserAddress: any) {
    this._customerAddress = contactUserAddress;
    console.log('_customerAddress', this._customerAddress);
  }
  @Input() shippingAddress;
  @Output() updateAddress = new EventEmitter;


  _customerAddress: any = {};

  originshippingaddress = {
    address: '',
    city: '',
    province: '',
    country: '',
    postalCode: ''
  };
  changedAddress: any;

  ngOnInit() {
    this.changedAddress = this.originshippingaddress;
  }

  onSwitchChanged(status: boolean) {
    if (status) {
      this.shippingAddress = this._customerAddress;
      this.updateAddress.emit({'data': this.shippingAddress});
    } else {
      this.shippingAddress = this.originshippingaddress;
      this.updateAddress.emit({'data': this.shippingAddress});
    }
  }

  onChangeAddress(event) {
    this.changedAddress = {
      address: this.shippingAddress.address,
      city: this.shippingAddress.city,
      province: this.shippingAddress.province,
      country: this.shippingAddress.country,
      postalCode: this.shippingAddress.postalCode
    };
    this.updateAddress.emit({'data': this.changedAddress});
  }
}
