import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-shippingaddress',
  templateUrl: './shippingaddress.component.html',
  styleUrls: ['./shippingaddress.component.css']
})
export class ShippingAddressComponent {
  @Input() set customerAddress(contactUserAddress: any) {
    this._customerAddress = contactUserAddress;
    console.log('_customerAddress', this._customerAddress);
  }
  @Input() shippingAddress;

  _customerAddress: any = {};

  originshippingaddress = {
    address: '',
    city: '',
    province: '',
    country: '',
    postalCode: ''
  };

  onSwitchChanged(status: boolean) {
    if (status) {
      this.shippingAddress = this._customerAddress;
    } else {
      this.shippingAddress = this.originshippingaddress;
    }
  }
}
